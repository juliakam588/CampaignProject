package com.campaign.service;

import com.campaign.dto.CampaignRequest;
import com.campaign.dto.CampaignResponse;
import com.campaign.entity.CampaignEntity;
import com.campaign.exception.ResourceNotFoundException;
import com.campaign.mapper.CampaignMapper;
import com.campaign.repository.CampaignRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final CampaignMapper campaignMapper;
    private final AccountService accountService;

    @Value("${app.campaign.min-bid-amount}")
    private BigDecimal minBidAmount;

    public List<CampaignResponse> getAllCampaigns() {
        return campaignRepository.findAll()
                .stream()
                .map(campaignMapper::mapToResponse)
                .toList();
    }

    public CampaignResponse getCampaignById(Long id) {
        CampaignEntity campaign = getCampaignEntity(id);
        return campaignMapper.mapToResponse(campaign);
    }

    @Transactional
    public CampaignResponse createCampaign(CampaignRequest request) {
        validateBidAmount(request.getBidAmount());
        accountService.validateSufficientFunds(request.getCampaignFund());

        CampaignEntity campaign = buildCampaignEntity(request);
        CampaignEntity savedCampaign = campaignRepository.save(campaign);

        accountService.deductFunds(request.getCampaignFund());

        return campaignMapper.mapToResponse(savedCampaign);
    }

    @Transactional
    public CampaignResponse updateCampaign(Long id, CampaignRequest request) {
        validateBidAmount(request.getBidAmount());

        CampaignEntity existingCampaign = getCampaignEntity(id);
        updateAccountBalanceForCampaignFundChange(existingCampaign, request.getCampaignFund());

        existingCampaign.setName(request.getName());
        existingCampaign.setKeywords(request.getKeywords());
        existingCampaign.setBidAmount(request.getBidAmount());
        existingCampaign.setCampaignFund(request.getCampaignFund());
        existingCampaign.setStatus(request.getStatus());
        existingCampaign.setTown(request.getTown());
        existingCampaign.setRadius(request.getRadius());

        CampaignEntity updatedCampaign = campaignRepository.save(existingCampaign);

        return campaignMapper.mapToResponse(updatedCampaign);
    }

    @Transactional
    public void deleteCampaign(Long id) {
        CampaignEntity campaign = getCampaignEntity(id);

        accountService.addFunds(campaign.getCampaignFund());
        campaignRepository.delete(campaign);
    }

    private void updateAccountBalanceForCampaignFundChange(CampaignEntity existingCampaign, BigDecimal newFund) {
        BigDecimal oldFund = existingCampaign.getCampaignFund();
        BigDecimal difference = newFund.subtract(oldFund);

        if (difference.compareTo(BigDecimal.ZERO) > 0) {
            accountService.deductFunds(difference);
        } else if (difference.compareTo(BigDecimal.ZERO) < 0) {
            accountService.addFunds(difference.abs());
        }
    }

    private CampaignEntity getCampaignEntity(Long id) {
        return campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with id: " + id));
    }

    private void validateBidAmount(BigDecimal bidAmount) {
        if (bidAmount.compareTo(minBidAmount) < 0) {
            throw new IllegalArgumentException("Bid amount must be at least " + minBidAmount);
        }
    }

    private CampaignEntity buildCampaignEntity(CampaignRequest request) {
        CampaignEntity campaign = new CampaignEntity();
        campaign.setName(request.getName());
        campaign.setKeywords(request.getKeywords());
        campaign.setBidAmount(request.getBidAmount());
        campaign.setCampaignFund(request.getCampaignFund());
        campaign.setStatus(request.getStatus());
        campaign.setTown(request.getTown());
        campaign.setRadius(request.getRadius());
        return campaign;
    }
}
package com.campaign.controller;

import com.campaign.dto.CampaignRequest;
import com.campaign.dto.CampaignResponse;
import com.campaign.service.CampaignService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CampaignController {

    private final CampaignService campaignService;

    @GetMapping
    public List<CampaignResponse> getAllCampaigns() {
        return campaignService.getAllCampaigns();
    }

    @GetMapping("/{id}")
    public CampaignResponse getCampaignById(@PathVariable Long id) {
        return campaignService.getCampaignById(id);
    }

    @PostMapping
    public CampaignResponse createCampaign(@Valid @RequestBody CampaignRequest request) {
        return campaignService.createCampaign(request);
    }

    @PutMapping("/{id}")
    public CampaignResponse updateCampaign(@PathVariable Long id,
                                           @Valid @RequestBody CampaignRequest request) {
        return campaignService.updateCampaign(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteCampaign(@PathVariable Long id) {
        campaignService.deleteCampaign(id);
    }
}
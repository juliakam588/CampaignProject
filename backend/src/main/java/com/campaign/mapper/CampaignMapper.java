package com.campaign.mapper;

import com.campaign.dto.CampaignResponse;
import com.campaign.entity.CampaignEntity;
import org.springframework.stereotype.Component;

@Component
public class CampaignMapper {

    public CampaignResponse mapToResponse(CampaignEntity entity) {
        return CampaignResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .keywords(entity.getKeywords())
                .bidAmount(entity.getBidAmount())
                .campaignFund(entity.getCampaignFund())
                .status(entity.getStatus())
                .town(entity.getTown())
                .radius(entity.getRadius())
                .build();
    }
}

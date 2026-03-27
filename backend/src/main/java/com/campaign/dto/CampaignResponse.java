package com.campaign.dto;

import com.campaign.entity.CampaignStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Set;

@Data
@Builder
public class CampaignResponse {
    private Long id;
    private String name;
    private Set<String> keywords;
    private BigDecimal bidAmount;
    private BigDecimal campaignFund;
    private CampaignStatus status;
    private String town;
    private Integer radius;
}
package com.campaign.dto;

import com.campaign.entity.CampaignStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Set;

@Data
public class CampaignRequest {

    @NotBlank()
    private String name;

    @NotEmpty()
    private Set<String> keywords;

    @NotNull()
    @DecimalMin(value = "0.01")
    private BigDecimal bidAmount;

    @NotNull()
    @DecimalMin(value = "0.01")
    private BigDecimal campaignFund;

    @NotNull()
    private CampaignStatus status;

    @NotBlank()
    private String town;

    @NotNull()
    @Positive()
    private Integer radius;
}
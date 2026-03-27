package com.campaign.repository;

import com.campaign.entity.CampaignEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepository extends JpaRepository<CampaignEntity, Long> {
}
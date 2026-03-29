import { apiClient } from "../lib/api-client";

function mapCampaignResponse(campaign) {
  return {
    id: campaign.id,
    campaignName: campaign.name,
    keywords: campaign.keywords ?? [],
    bidAmount: campaign.bidAmount,
    campaignFund: campaign.campaignFund,
    status: campaign.status,
    town: campaign.town,
    radius: campaign.radius,
  };
}

function mapCampaignRequest(campaign) {
  return {
    name: campaign.campaignName,
    keywords: campaign.keywords,
    bidAmount: campaign.bidAmount,
    campaignFund: campaign.campaignFund,
    status: campaign.status,
    town: campaign.town,
    radius: campaign.radius,
  };
}

export async function getCampaigns() {
  const response = await apiClient.get("/campaigns");
  return response.data.map(mapCampaignResponse);
}

export async function createCampaign(campaign) {
  const response = await apiClient.post("/campaigns", mapCampaignRequest(campaign));
  return mapCampaignResponse(response.data);
}

export async function updateCampaign(id, campaign) {
  const response = await apiClient.put(`/campaigns/${id}`, mapCampaignRequest(campaign));
  return mapCampaignResponse(response.data);
}

export async function deleteCampaign(id) {
  await apiClient.delete(`/campaigns/${id}`);
}

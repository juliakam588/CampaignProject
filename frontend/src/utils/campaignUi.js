import { campaignFormDefaults } from "../constants/campaignFormDefaults";

export function extractErrorMessage(error) {
  const details = error?.response?.data?.details;
  if (Array.isArray(details) && details.length > 0) {
    return details.join(" | ");
  }

  const message = error?.response?.data?.message;
  if (message) {
    return message;
  }

  return "An unexpected error occurred";
}

export function normalizeCampaignToForm(campaign) {
  if (!campaign) {
    return campaignFormDefaults;
  }

  return {
    id: campaign.id,
    campaignName: campaign.campaignName ?? "",
    keywords: campaign.keywords ?? [],
    bidAmount: String(campaign.bidAmount ?? ""),
    campaignFund: String(campaign.campaignFund ?? ""),
    status: campaign.status ?? "ON",
    town: campaign.town ?? "",
    radius: String(campaign.radius ?? ""),
  };
}

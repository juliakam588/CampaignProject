export function toNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

export function normalizeKeywords(values) {
  const unique = new Set();

  values.forEach((item) => {
    const keyword = String(item).trim();
    if (keyword) {
      unique.add(keyword);
    }
  });

  return Array.from(unique);
}

export function validateCampaignForm(values, minBidAmount) {
  const nextErrors = {};
  const minBid = Number(minBidAmount);

  if (!values.campaignName?.trim()) {
    nextErrors.campaignName = "Campaign name is required";
  }

  if (!values.keywords || values.keywords.length === 0) {
    nextErrors.keywords = "Select at least one keyword";
  }

  const bidAmount = toNumber(values.bidAmount);
  if (bidAmount === null) {
    nextErrors.bidAmount = "Bid amount is required";
  } else if (bidAmount < minBid) {
    nextErrors.bidAmount = `Minimum value is ${minBid.toFixed(2)}`;
  }

  const campaignFund = toNumber(values.campaignFund);
  if (campaignFund === null) {
    nextErrors.campaignFund = "Campaign fund is required";
  } else if (campaignFund < 0.01) {
    nextErrors.campaignFund = "Campaign fund must be >= 0.01";
  }

  if (!values.status) {
    nextErrors.status = "Status is required";
  }

  if (!values.town) {
    nextErrors.town = "Town is required";
  }

  const radius = toNumber(values.radius);
  if (radius === null) {
    nextErrors.radius = "Radius is required";
  } else if (radius <= 0) {
    nextErrors.radius = "Radius must be greater than 0";
  }

  return nextErrors;
}

export function toCampaignSubmitPayload(formValues) {
  return {
    ...formValues,
    campaignName: formValues.campaignName.trim(),
    bidAmount: toNumber(formValues.bidAmount),
    campaignFund: toNumber(formValues.campaignFund),
    radius: Number(formValues.radius),
  };
}

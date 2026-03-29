import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { normalizeKeywords } from "../../utils/campaignForm";

function CampaignFormFields({
  formValues,
  errors,
  keywordOptions,
  townOptions,
  minBidAmount,
  onFieldChange,
}) {
  return (
    <>
      <TextField
        label="Campaign Name"
        value={formValues.campaignName}
        onChange={(event) => onFieldChange("campaignName", event.target.value)}
        error={Boolean(errors.campaignName)}
        helperText={errors.campaignName}
        required
        fullWidth
      />

      <Autocomplete
        multiple
        freeSolo
        options={keywordOptions}
        value={formValues.keywords}
        onChange={(_, value) => onFieldChange("keywords", normalizeKeywords(value))}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Keywords"
            placeholder="Type a keyword and press Enter"
            required
            error={Boolean(errors.keywords)}
            helperText={errors.keywords || "Type a keyword and press Enter to add it"}
          />
        )}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Bid Amount"
          type="number"
          value={formValues.bidAmount}
          onChange={(event) => onFieldChange("bidAmount", event.target.value)}
          slotProps={{ htmlInput: { step: "0.01", min: minBidAmount } }}
          error={Boolean(errors.bidAmount)}
          helperText={errors.bidAmount}
          required
          fullWidth
        />

        <TextField
          label="Campaign Fund"
          type="number"
          value={formValues.campaignFund}
          onChange={(event) => onFieldChange("campaignFund", event.target.value)}
          slotProps={{ htmlInput: { step: "0.01", min: 0.01 } }}
          error={Boolean(errors.campaignFund)}
          helperText={errors.campaignFund}
          required
          fullWidth
        />
      </div>

      <FormControl error={Boolean(errors.status)}>
        <FormLabel>Status</FormLabel>
        <RadioGroup
          row
          value={formValues.status}
          onChange={(event) => onFieldChange("status", event.target.value)}
        >
          <FormControlLabel value="ON" control={<Radio />} label="ON" />
          <FormControlLabel value="OFF" control={<Radio />} label="OFF" />
        </RadioGroup>
        {errors.status ? (
          <Typography variant="caption" color="error">
            {errors.status}
          </Typography>
        ) : null}
      </FormControl>

      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          select
          label="Town"
          value={formValues.town}
          onChange={(event) => onFieldChange("town", event.target.value)}
          error={Boolean(errors.town)}
          helperText={errors.town}
          required
          fullWidth
        >
          {townOptions.map((townOption) => (
            <MenuItem key={townOption} value={townOption}>
              {townOption}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Radius (km)"
          type="number"
          value={formValues.radius}
          onChange={(event) => onFieldChange("radius", event.target.value)}
          slotProps={{ htmlInput: { step: "1", min: 1 } }}
          error={Boolean(errors.radius)}
          helperText={errors.radius}
          required
          fullWidth
        />
      </div>
    </>
  );
}

export default CampaignFormFields;

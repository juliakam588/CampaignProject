import { useState } from 'react';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { campaignFormDefaults } from '../../constants/campaignFormDefaults';
import { toCampaignSubmitPayload, validateCampaignForm } from '../../utils/campaignForm';
import CampaignFormFields from './CampaignFormFields';

function CampaignForm({ mode, initialValues, keywordOptions, townOptions, minBidAmount, onSubmit, onCancel, isSubmitting }) {
    const [formValues, setFormValues] = useState(initialValues || campaignFormDefaults);
    const [errors, setErrors] = useState({});

    const formTitle = mode === 'edit' ? 'Edit campaign' : 'Create campaign';

    function updateField(field, value) {
        setFormValues(previous => {
            const nextValues = { ...previous, [field]: value };

            setErrors(previousErrors => {
                if (!previousErrors[field]) {
                    return previousErrors;
                }

                const nextValidation = validateCampaignForm(nextValues, minBidAmount);
                const nextErrors = { ...previousErrors };

                if (nextValidation[field]) {
                    nextErrors[field] = nextValidation[field];
                } else {
                    delete nextErrors[field];
                }

                return nextErrors;
            });

            return nextValues;
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validateCampaignForm(formValues, minBidAmount);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const isSuccess = await onSubmit(toCampaignSubmitPayload(formValues));

        if (isSuccess && mode === 'create') {
            setFormValues(campaignFormDefaults);
            setErrors({});
        }
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {formTitle}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Stack spacing={2}>
                        <CampaignFormFields formValues={formValues} errors={errors} keywordOptions={keywordOptions} townOptions={townOptions} minBidAmount={minBidAmount} onFieldChange={updateField} />

                        <div className="flex flex-wrap gap-3">
                            <Button type="submit" variant="contained" disabled={isSubmitting}>
                                {mode === 'edit' ? 'Save changes' : 'Create campaign'}
                            </Button>

                            {mode === 'edit' ? (
                                <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>
                                    Cancel edit
                                </Button>
                            ) : null}
                        </div>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
}

export default CampaignForm;

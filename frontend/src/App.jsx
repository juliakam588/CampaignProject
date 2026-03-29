import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import MainLayout from "./components/layout/MainLayout";
import BalanceCard from "./components/account/BalanceCard";
import CampaignForm from "./components/campaigns/CampaignForm";
import CampaignTable from "./components/campaigns/CampaignTable";
import DeleteCampaignDialog from "./components/campaigns/DeleteCampaignDialog";
import {
    MIN_BID_AMOUNT,
    initialCampaignData,
    initialUiState,
} from "./constants/campaignAppDefaults";
import {
    createCampaign,
    deleteCampaign,
    getCampaigns,
    updateCampaign,
} from "./services/campaignService";
import { getAccountBalance } from "./services/accountService";
import { getKeywordOptions, getTownOptions } from "./services/dictionaryService";
import { extractErrorMessage, normalizeCampaignToForm } from "./utils/campaignUi";

function App() {
    const [campaignData, setCampaignData] = useState(initialCampaignData);
    const [uiState, setUiState] = useState(initialUiState);
    const [feedback, setFeedback] = useState({ open: false, severity: "success", message: "" });

    const formMode = uiState.editCampaign ? "edit" : "create";
    const formInitialValues = normalizeCampaignToForm(uiState.editCampaign);
    const formKey = `${formMode}-${uiState.editCampaign?.id ?? "new"}`;

    function showFeedback(severity, message) {
        setFeedback({ open: true, severity, message });
    }

    async function refreshCampaignsAndBalance() {
        const [campaignList, currentBalance] = await Promise.all([getCampaigns(), getAccountBalance()]);
        setCampaignData((previous) => ({
            ...previous,
            campaigns: campaignList,
            balance: currentBalance,
        }));
    }

    useEffect(() => {
        async function loadInitialData() {
            setUiState((previous) => ({ ...previous, isInitialLoading: true }));
            try {
                const [keywords, towns] = await Promise.all([getKeywordOptions(), getTownOptions()]);
                setCampaignData((previous) => ({
                    ...previous,
                    keywordOptions: keywords,
                    townOptions: towns,
                }));
                await refreshCampaignsAndBalance();
            } catch (error) {
                showFeedback("error", extractErrorMessage(error));
            } finally {
                setUiState((previous) => ({ ...previous, isInitialLoading: false }));
            }
        }

        loadInitialData();
    }, []);

    async function handleFormSubmit(values) {
        setUiState((previous) => ({ ...previous, isSubmitting: true }));
        try {
            if (formMode === "edit" && uiState.editCampaign?.id) {
                await updateCampaign(uiState.editCampaign.id, values);
            } else {
                await createCampaign(values);
            }

            await refreshCampaignsAndBalance();
            setUiState((previous) => ({ ...previous, editCampaign: null }));
            showFeedback("success", formMode === "edit" ? "Campaign updated" : "Campaign created");
            return true;
        } catch (error) {
            showFeedback("error", extractErrorMessage(error));
            return false;
        } finally {
            setUiState((previous) => ({ ...previous, isSubmitting: false }));
        }
    }

    async function handleConfirmDelete() {
        if (!uiState.campaignToDelete?.id) {
            return;
        }

        setUiState((previous) => ({ ...previous, isDeleting: true }));
        try {
            await deleteCampaign(uiState.campaignToDelete.id);
            await refreshCampaignsAndBalance();
            setUiState((previous) => ({ ...previous, campaignToDelete: null }));
            showFeedback("success", "Campaign deleted");
        } catch (error) {
            showFeedback("error", extractErrorMessage(error));
        } finally {
            setUiState((previous) => ({ ...previous, isDeleting: false }));
        }
    }

    return (
        <MainLayout>
            <div className="grid gap-6">
                <BalanceCard balance={campaignData.balance} />

                <CampaignForm
                    key={formKey}
                    mode={formMode}
                    initialValues={formInitialValues}
                    keywordOptions={campaignData.keywordOptions}
                    townOptions={campaignData.townOptions}
                    minBidAmount={MIN_BID_AMOUNT}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setUiState((previous) => ({ ...previous, editCampaign: null }))}
                    isSubmitting={uiState.isSubmitting}
                />

                <CampaignTable
                    campaigns={campaignData.campaigns}
                    onEdit={(campaign) => setUiState((previous) => ({ ...previous, editCampaign: campaign }))}
                    onDelete={(campaign) =>
                        setUiState((previous) => ({ ...previous, campaignToDelete: campaign }))
                    }
                    isLoading={uiState.isInitialLoading}
                />

                <DeleteCampaignDialog
                    open={Boolean(uiState.campaignToDelete)}
                    campaign={uiState.campaignToDelete}
                    isDeleting={uiState.isDeleting}
                    onCancel={() =>
                        setUiState((previous) => ({ ...previous, campaignToDelete: null }))
                    }
                    onConfirm={handleConfirmDelete}
                />

                <Snackbar
                    open={feedback.open}
                    autoHideDuration={4000}
                    onClose={() => setFeedback((previous) => ({ ...previous, open: false }))}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Alert
                        severity={feedback.severity}
                        variant="filled"
                        onClose={() => setFeedback((previous) => ({ ...previous, open: false }))}
                    >
                        {feedback.message}
                    </Alert>
                </Snackbar>
            </div>
        </MainLayout>
    );
}

export default App;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function DeleteCampaignDialog({ open, campaign, isDeleting, onCancel, onConfirm }) {
  return (
    <Dialog open={open} onClose={isDeleting ? undefined : onCancel}>
      <DialogTitle>Delete campaign</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete campaign: <strong>{campaign?.campaignName}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={isDeleting}>
          Cancel
        </Button>
        <Button color="error" variant="contained" onClick={onConfirm} disabled={isDeleting}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteCampaignDialog;

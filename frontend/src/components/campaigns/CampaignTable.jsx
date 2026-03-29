import {
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function CampaignTable({ campaigns, onEdit, onDelete, isLoading }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Campaign list
        </Typography>

        {isLoading ? (
          <Typography color="text.secondary">Loading campaigns...</Typography>
        ) : campaigns.length === 0 ? (
          <Typography color="text.secondary">No campaigns found.</Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Keywords</TableCell>
                <TableCell>Bid</TableCell>
                <TableCell>Fund</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Town</TableCell>
                <TableCell>Radius</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id} hover>
                  <TableCell>{campaign.campaignName}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      {campaign.keywords.map((keyword) => (
                        <Chip key={`${campaign.id}-${keyword}`} label={keyword} size="small" />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>{Number(campaign.bidAmount).toFixed(2)}</TableCell>
                  <TableCell>{Number(campaign.campaignFund).toFixed(2)}</TableCell>
                  <TableCell>{campaign.status}</TableCell>
                  <TableCell>{campaign.town}</TableCell>
                  <TableCell>{campaign.radius} km</TableCell>
                  <TableCell align="right">
                    <div className="flex justify-end gap-2">
                      <Button size="small" variant="outlined" onClick={() => onEdit(campaign)}>
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() => onDelete(campaign)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default CampaignTable;

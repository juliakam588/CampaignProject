import { Card, CardContent, Typography } from "@mui/material";

function BalanceCard({ balance }) {
  const numericBalance = Number(balance ?? 0);

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Emerald account balance
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          {numericBalance.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BalanceCard;

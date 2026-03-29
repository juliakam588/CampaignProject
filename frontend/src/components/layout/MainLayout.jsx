import { Container, Typography } from "@mui/material";

function MainLayout({ children }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b_0%,_#0b1120_45%,_#020617_100%)] py-8">
      <Container maxWidth="lg">
        <header className="mb-6">
          <Typography variant="h4" component="h1" fontWeight={700}>
            Campaign Manager
          </Typography>
        </header>

        {children}
      </Container>
    </main>
  );
}

export default MainLayout;

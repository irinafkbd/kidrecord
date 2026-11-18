import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { InfoCard } from "@/components/ui/info-card";
import { PrimaryButton } from "@/components/ui/primary-button";
import { APP_TAGLINE } from "@/constants/app";
import type { ScreenContent } from "@/constants/screens";
import { AppFrame } from "@/layouts/app-frame";

type ScreenProps = {
  content: ScreenContent;
};

export function Screen({ content }: ScreenProps) {
  return (
    <AppFrame>
      <Box component="header" sx={{ minWidth: 0 }}>
        <Typography
          component="h1"
          sx={{
            color: "text.primary",
            fontSize: { xs: 22, sm: 23 },
            fontWeight: 700,
            lineHeight: "28px",
            mb: "14px",
            overflowWrap: "anywhere",
          }}
        >
          {content.title}
        </Typography>
        <Typography
          component="p"
          sx={{
            color: "text.secondary",
            fontSize: 11,
            fontWeight: 400,
            lineHeight: "13px",
            m: 0,
          }}
        >
          {APP_TAGLINE}
        </Typography>
      </Box>
      {content.cards.map((card) => (
        <InfoCard key={card.title} card={card} />
      ))}
      <PrimaryButton label={content.actionLabel} href={content.actionHref} />
    </AppFrame>
  );
}

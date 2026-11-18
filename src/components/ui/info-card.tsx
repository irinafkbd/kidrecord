import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type { InfoCardContent } from "@/constants/screens";

type InfoCardProps = {
  card: InfoCardContent;
};

export function InfoCard({ card }: InfoCardProps) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "background.paper",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "9px",
        minWidth: 0,
        p: "15px",
        width: "100%",
      }}
    >
      <Typography
        component="h2"
        sx={{
          color: "text.primary",
          fontSize: 15,
          fontWeight: 600,
          lineHeight: "18px",
          overflowWrap: "anywhere",
        }}
      >
        {card.title}
      </Typography>
      {card.lines.map((line) =>
        line.href ? (
          <Typography
            key={`${line.text}-${line.href}`}
            component={Link}
            href={line.href}
            sx={{
              color: "text.secondary",
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "18px",
              minHeight: 32,
              overflowWrap: "anywhere",
              textDecoration: "none",
              "&:hover": { color: "text.primary" },
              "&:focus-visible": {
                borderRadius: "6px",
                outline: "2px solid #26352f",
                outlineOffset: 2,
              },
            }}
          >
            {line.text}
          </Typography>
        ) : (
          <Typography
            key={line.text}
            component="p"
            sx={{
              color: "text.secondary",
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "18px",
              m: 0,
              overflowWrap: "anywhere",
            }}
          >
            {line.text}
          </Typography>
        ),
      )}
    </Box>
  );
}

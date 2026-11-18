import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { APP_BRAND } from "@/constants/app";

type AppFrameProps = {
  children: ReactNode;
};

export function AppFrame({ children }: AppFrameProps) {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "center",
        minHeight: "100dvh",
        overflowX: "clip",
        px: { xs: 1, sm: 3, md: 4 },
        py: { xs: 1, sm: 4 },
      }}
    >
      <Box
        component="main"
        sx={{
          bgcolor: "background.default",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: { xs: "16px", sm: "22px" },
          display: "flex",
          flexDirection: "column",
          gap: { xs: "12px", sm: "14px" },
          height: "fit-content",
          maxWidth: { xs: "100%", sm: 440, md: 560 },
          minWidth: 0,
          px: { xs: "12px", sm: "16px" },
          py: { xs: "14px", sm: "18px" },
          width: "100%",
        }}
      >
        <Typography
          component="p"
          sx={{
            color: "primary.main",
            fontSize: 10,
            fontWeight: 600,
            lineHeight: "12px",
            m: 0,
          }}
        >
          {APP_BRAND}
        </Typography>
        {children}
        <BottomNav />
      </Box>
    </Box>
  );
}

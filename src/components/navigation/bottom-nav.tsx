"use client";

import Box from "@mui/material/Box";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants/navigation";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <Box
      component="nav"
      aria-label="Разделы приложения"
      sx={{
        bgcolor: "background.paper",
        borderRadius: "14px",
        display: "flex",
        gap: "4px",
        minWidth: 0,
        px: { xs: "6px", sm: "10px" },
        width: "100%",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;

        return (
          <Box
            key={item.href}
            component={Link}
            href={item.href}
            aria-current={active ? "page" : undefined}
            sx={{
              alignItems: "center",
              color: active ? "primary.main" : "text.secondary",
              display: "flex",
              flex: "1 1 0",
              fontSize: { xs: 12, sm: 10 },
              fontWeight: 500,
              justifyContent: "center",
              lineHeight: "14px",
              minHeight: 44,
              minWidth: 0,
              px: "2px",
              textAlign: "center",
              textDecoration: "none",
              "&:hover": {
                color: active ? "#628a76" : "text.primary",
              },
              "&:focus-visible": {
                borderRadius: "8px",
                outline: "2px solid #26352f",
                outlineOffset: -2,
              },
            }}
          >
            {item.label}
          </Box>
        );
      })}
    </Box>
  );
}

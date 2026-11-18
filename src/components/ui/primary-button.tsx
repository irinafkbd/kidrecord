"use client";

import Button from "@mui/material/Button";
import Link from "next/link";

type PrimaryButtonProps = {
  label: string;
  href?: string;
};

export function PrimaryButton({ label, href }: PrimaryButtonProps) {
  return (
    <Button
      component={href ? Link : "button"}
      href={href}
      type={href ? undefined : "button"}
      variant="contained"
      disableElevation
      fullWidth
      sx={{
        bgcolor: "primary.main",
        borderRadius: "12px",
        color: "primary.contrastText",
        fontSize: 13,
        fontWeight: 600,
        lineHeight: "16px",
        minHeight: 44,
        px: 2,
        whiteSpace: "normal",
        "&:hover": {
          bgcolor: "#628a76",
        },
        "&:active": {
          bgcolor: "#567a68",
        },
        "&.Mui-focusVisible": {
          outline: "2px solid #26352f",
          outlineOffset: -2,
        },
      }}
    >
      {label}
    </Button>
  );
}

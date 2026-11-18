import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#729b86",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#26352f",
      secondary: "#75827b",
    },
    background: {
      default: "#f6f8f5",
      paper: "#ffffff",
    },
    divider: "#dde5df",
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "var(--font-inter), Inter, Helvetica, Arial, sans-serif",
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

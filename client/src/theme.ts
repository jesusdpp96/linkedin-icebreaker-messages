import { createTheme, ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#0345de",
    },
    secondary: {
      main: "#ffffff",
    },
  },
};

export const theme = createTheme(themeOptions);

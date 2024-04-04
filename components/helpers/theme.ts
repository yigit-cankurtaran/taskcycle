import { DarkTheme } from "@react-navigation/native";

export const theme = {
  ...DarkTheme,
  // this doesn't seem to be doing anything??
  colors: {
    ...DarkTheme.colors,
    primary: "#00aaff",
    background: "#222",
    card: "#333",
    text: "#fff",
    border: "#333",
    buttonColor: "#00aaff",
    // these colors look horrible
  },

  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
  },
// TODO:  everything's gonna revolve around this, change this, make it better
};
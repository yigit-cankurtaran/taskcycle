import { DarkTheme } from "@react-navigation/native";

export const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#00aaff",
    background: "#222",
    card: "#333",
    text: "#fff",
    border: "#333",
    buttonColor: "#00aaff",
  },

  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
  },
// TODO:  everything's gonna revolve around this, change this, make it better
};
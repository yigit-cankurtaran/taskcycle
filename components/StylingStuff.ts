// styles.js

// Color palette
export const colors = {
    primary: "#3498db",
    secondary: "#2ecc71",
    background: "#424549",
    text: "#c1cedb",
  };
  
  // Typography styles
  export const typography = {
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    body: {
      fontSize: 16,
      color: colors.text,
    },
  };
  
  // Spacing values
  export const spacing = {
    small: 8,
    medium: 16,
    large: 24,
  };
  
  // Border and shadow styles
  export const borders = {
    radius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  };
  
  export const shadows = {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  };
  
  export const button = {
    primary: {
      backgroundColor: colors.secondary,
      borderRadius: borders.radius,
      padding: spacing.medium,
    },
    secondary: {
      backgroundColor: colors.primary,
      borderRadius: borders.radius,
      padding: spacing.medium,
    },
  };
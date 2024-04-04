import { Button, ButtonProps } from "react-native-paper";
import { theme } from "./theme";

interface MyButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export default function MyButton({ children, ...props }: MyButtonProps) {
  return (
    <Button
      buttonColor={theme.colors.primary}
      textColor={theme.colors.text}
      contentStyle={{ alignSelf: "center" }}
      style={{ width: 100 }}
      {...props}
      //   this passes all the props to the Button component
    >
      {children}
      {/* whatever we put between the opening and closing tags */}
      {/* which is button name */}
    </Button>
  );
}

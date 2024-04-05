import { Button, ButtonProps, Text } from "react-native-paper";
import { theme } from "./theme";

interface MyButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export default function MyButton({ children, style, ...props }: MyButtonProps) {
  return (
    <Button
      buttonColor={theme.colors.buttonColor}
      textColor={theme.colors.text}
      style={[{ width: 100, borderRadius: 10 }, style]}
      // style is so that we can pass in custom styles
      // for example, in the Timer screen i add another style
      contentStyle={{ alignSelf: "center" }}
      {...props}
      //   this passes all the props to the Button component
    >
      <Text numberOfLines={1} ellipsizeMode="tail">
        {children}
      </Text>
      {/* whatever we put between the opening and closing tags */}
      {/* which is button name */}
    </Button>
  );
}

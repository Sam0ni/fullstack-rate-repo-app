import { Pressable, Text } from "react-native";

const AppBarTab = ({ textStyle, children }) => {
  return (
    <Pressable>
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
};

export default AppBarTab;

import { Pressable, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colorsProject from "../utils/colors";

const PrimaryButton = ({
  dimensions,
  children,
  handlePress,
  handleLongPress,
}) => {
  return (
    <LinearGradient
      colors={["#8961FF", "#A0E5F2"]}
      style={[
        styles.container,
        {
          width: dimensions,
          height: dimensions,
          overflow: "hidden",
        },
      ]}
    >
      <Pressable
        onLongPress={handleLongPress}
        onPress={handlePress}
        style={({ pressed }) =>
          pressed ? [styles.button, styles.pressed] : styles.button
        }
        android_ripple={{ color: "rgba(160,229,242,0.2)", borderless: false }}
      >
        {children}
      </Pressable>
    </LinearGradient>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: colorsProject.borderContainer,
    borderWidth: 1,
    borderRadius: 100,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 6,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: "100%",
    height: "100%",
  },
  pressed: {
    opacity: 0.7,
  },
});

import { StyleSheet, View } from "react-native";
import colorsProject from "../utils/colors";
import { LinearGradient } from "expo-linear-gradient";

const ContainerPurple = ({ heightValue, children }) => {
  return (
    <LinearGradient
      colors={["#B69EFC", "#8A62FF"]}
      style={[styles.container, { height: heightValue }]}
    >
      {children}
    </LinearGradient>
  );
};

export default ContainerPurple;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: colorsProject.borderContainer,
    borderWidth: 1.3,
    borderRadius: 20,
    width: 300,
    marginBottom: 10,
    marginTop: 2,
    elevation: 5,
  },
});

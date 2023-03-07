import { Pressable, StyleSheet, View } from "react-native";
import PrimaryButton from "./primaryButton";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { BudgetContext } from "./context";

const Footer = ({ setModalVisible, setIsHomeScreen }) => {
  const budgetCtx = useContext(BudgetContext);
  //Function HARD reset
  const handleHardReset = () => {
    budgetCtx.hardReset();
  };

  const handlePressAdd = () => {
    setModalVisible(true);
    setIsHomeScreen(true);
  };

  const handlePressSettings = () => {
    setIsHomeScreen(false);
  };

  const handlePressHome = () => {
    setIsHomeScreen(true);
  };

  return (
    <View style={styles.containerButton}>
      <PrimaryButton dimensions={66} handlePress={handlePressHome}>
        <Ionicons
          name="home-outline"
          size={30}
          color={"black"}
          style={styles.iconAdd}
        />
      </PrimaryButton>
      <PrimaryButton dimensions={106} handlePress={handlePressAdd}>
        <Ionicons
          name="md-add"
          size={75}
          color={"black"}
          style={styles.iconAdd}
        />
      </PrimaryButton>
      <PrimaryButton
        dimensions={66}
        handlePress={handlePressSettings}
        handleLongPress={handleHardReset}
      >
        <Ionicons
          name="settings-outline"
          size={30}
          color={"black"}
          style={styles.iconAdd}
        />
      </PrimaryButton>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  iconAdd: {
    opacity: 0.8,
  },
});

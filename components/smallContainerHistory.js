import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BudgetContext } from "./context";
import { useContext } from "react";

const ContainerHistory = ({ category, price, product, weekCategory, id }) => {
  const budgetCtx = useContext(BudgetContext);

  const handleRemove = () => {
    budgetCtx.removeOneHistory(id, weekCategory, price);
  };

  return (
    <LinearGradient colors={["#EFF2C2", "#FECCF2"]} style={styles.containerAll}>
      <Pressable style={styles.containerBackground} onLongPress={handleRemove}>
        <View style={styles.containerIcon}>
          <MaterialIcons
            name={category}
            size={16}
            color={"black"}
            style={styles.icon}
          />
        </View>
        <Text style={styles.weeklyTextItem}>{product}</Text>
        <Text style={styles.weeklyTextPrice}>{price}$</Text>
      </Pressable>
    </LinearGradient>
  );
};

export default ContainerHistory;

const styles = StyleSheet.create({
  containerAll: {
    width: "100%",
    borderRadius: 50,
    elevation: 7,
    marginVertical: 4,
    alignItems: "center",
    height: 35,
  },
  containerBackground: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 35,
    borderRadius: 7,
    paddingHorizontal: 8,
    marginVertical: 3,
    width: "90%",
  },
  containerIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderRadius: 7,
  },
  icon: {
    opacity: 0.5,
  },
  weeklyTextItem: {
    fontFamily: "poppins-regular",
    letterSpacing: 3,
    fontSize: 10,
    marginHorizontal: 10,
    color: "rgba(98, 68, 187, 0.90)",
  },
  weeklyTextPrice: {
    fontFamily: "poppins-bold",
    letterSpacing: 3,
    fontSize: 14,
    elevation: 4,
    marginHorizontal: 10,
    color: "rgba(98, 68, 187, 0.90)",
  },
});

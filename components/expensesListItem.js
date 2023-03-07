import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ExpensesListItem = ({
  date,
  payment,
  product,
  id,
  monthlyExpenses,
  addMonthly,
  removeMonthly,
}) => {
  const handleDelete = () => {
    removeMonthly(id, payment);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.textDate}>{date}</Text>
        <Text style={styles.textProduct}>{product}</Text>
        <Text style={styles.textPayment}>{payment}$</Text>
      </View>
      <Pressable style={styles.containerDelete} onPress={handleDelete}>
        <MaterialIcons name="delete" size={28} />
      </Pressable>
    </View>
  );
};

export default ExpensesListItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
  },
  containerText: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  textDate: {
    color: "#EFF4C3",
    fontWeight: "bold",
    opacity: 0.7,
  },
  textProduct: {
    flex: 1,
    color: "#EFF4C3",
    fontWeight: "bold",
    textAlign: "center",
  },
  textPayment: {
    color: "#A5E3F2",
    fontWeight: "bold",
  },
  containerDelete: {
    flexDirection: "row",
    marginLeft: 10,
  },
});

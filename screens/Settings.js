import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Button,
  ScrollView,
} from "react-native";
import ContainerPurple from "../components/containerPurple";
import { useFonts } from "expo-font";
import { useContext, useEffect, useState } from "react";
import ModalSettings from "../components/modalSettings";
import ExpensesListItem from "../components/expensesListItem";
import { BudgetContext } from "../components/context";
import ModalRemaining from "../components/modalRemaining";

const Settings = () => {
  const [isModal, setIsModal] = useState(false);
  const [isModalRemaining, setIsModalRemaining] = useState(false);

  const [listExpenses, setListExpenses] = useState([]);

  const budgetCtx = useContext(BudgetContext);

  const [fontsLoaded] = useFonts({
    "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "poppins-regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  //Function to reset
  const handleClear = () => {
    budgetCtx.setWeekly(budgetCtx.weeklyCategoriesTotal);
    budgetCtx.clearHistory();
  };
  //Function ADD Expenses
  const handleAdd = () => {
    setIsModal(true);
  };

  const handleRemaining = () => {
    setIsModalRemaining(true);
  };

  if (!fontsLoaded) {
    return <Text>Loading....</Text>;
    // return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <ContainerPurple heightValue={"95%"}>
        <View style={styles.containerIncome}>
          <Text style={styles.titleContainer}>Monthly Income</Text>
          <View style={styles.containerSalary}>
            <TextInput
              style={styles.inputSalary}
              keyboardType="number-pad"
              maxLength={4}
              value={budgetCtx.income === 0 ? "" : budgetCtx.income}
              placeholder="0000"
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                budgetCtx.setIncome(numericValue);
              }}
            />
          </View>
        </View>
        <View style={styles.containerExpenses}>
          <Text style={styles.titleContainer}>Monthly Expenses</Text>
          <ScrollView style={styles.scrollView}>
            {budgetCtx.monthlyExpenses.map((item) => {
              return (
                <ExpensesListItem
                  key={item.id}
                  id={item.id}
                  date={item.date}
                  payment={item.payment}
                  product={item.product}
                  monthlyExpenses={budgetCtx.monthlyExpenses}
                  addMonthly={budgetCtx.addMonthly}
                  removeMonthly={budgetCtx.removeMonthly}
                />
              );
            })}
          </ScrollView>
          <View style={styles.outerContainerButton}>
            <View style={styles.containerButtonAdd}>
              <Button onPress={handleAdd} title="Add" color="#C1ACFF" />
            </View>
            <View style={styles.containerButtonWeekly}>
              <Button onPress={handleRemaining} title="Week" color="#C1ACFF" />
            </View>
            <View style={styles.containerButtonClear}>
              <Button
                onPress={handleClear}
                title="Reset"
                color="rgba(217,98,142,1)"
              />
            </View>
          </View>
        </View>
      </ContainerPurple>
      <ModalSettings
        setIsModal={setIsModal}
        isModal={isModal}
        setListExpenses={setListExpenses}
      />
      <ModalRemaining
        setIsModalRemaining={setIsModalRemaining}
        isModalRemaining={isModalRemaining}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    fontFamily: "poppins-bold",
    textAlign: "center",
    fontSize: 20,
    opacity: 0.7,
  },
  textInput: {
    fontFamily: "poppins-regular",
  },
  inputSalary: {
    borderBottomWidth: 1,
    width: "25%",
    borderBottomColor: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    color: "#EFF4C3",
  },
  containerIncome: {
    height: 70,
    width: "85%",
  },
  containerSalary: {
    alignItems: "center",
  },
  containerExpenses: {
    justifyContent: "space-between",
    padding: 10,
    width: "85%",
    height: "80%",
    borderRadius: 20,
  },
  outerContainerButton: {
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  containerButtonAdd: {
    flex: 1,
  },
  containerButtonWeekly: {
    flex: 1,
  },
  containerButtonClear: {
    flex: 1,
  },
  scrollView: {
    borderWidth: 3,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    borderColor: "#C1ACFF",
  },
});

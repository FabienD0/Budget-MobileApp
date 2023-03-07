import { useFonts } from "expo-font";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ContainerPurple from "../components/containerPurple";
import SmallContainer from "../components/smallContainerWeeklyRemaining";
import ContainerHistory from "../components/smallContainerHistory";
import { BudgetContext } from "../components/context";
import { useContext, useState } from "react";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [fontsLoaded] = useFonts({
    "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "poppins-regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const budgetCtx = useContext(BudgetContext);

  let widthGrocery = Math.round(
    (budgetCtx.weeklyCategories.grocery /
      budgetCtx.weeklyCategoriesTotal.grocery) *
      100
  );

  let widthGas = Math.round(
    (budgetCtx.weeklyCategories.gas / budgetCtx.weeklyCategoriesTotal.gas) * 100
  );
  let widthOthers = Math.round(
    (budgetCtx.weeklyCategories.others /
      budgetCtx.weeklyCategoriesTotal.others) *
      100
  );

  const renderHistory = (itemData) => {
    const item = itemData.item;
    const historyItemProps = {
      category: item.category,
      price: item.price,
      product: item.product,
      weekCategory: item.weeklyCategory,
      id: item.id,
    };
    return <ContainerHistory {...historyItemProps} />;
  };

  if (!fontsLoaded) {
    return <Text>Loading....</Text>;
    // return <AppLoading />;
  }

  return (
    <View style={[styles.container, { blurRadius: "15" }]}>
      <Text style={styles.titleContainer}>Monthly Expenses</Text>
      <ContainerPurple heightValue={100}>
        <Text style={styles.monthlyExpensesNumber}>{budgetCtx.expenses}$</Text>
      </ContainerPurple>
      <Text style={styles.titleContainer}>Weekly Remaining</Text>
      <ContainerPurple heightValue={140}>
        <View style={styles.overallContainer}>
          <View style={styles.containerDivision}>
            <SmallContainer
              backgroundColor={"rgba(167, 226, 242, 0.4)"}
              width={
                budgetCtx.weeklyCategories.grocery > 0
                  ? `${widthGrocery}%`
                  : "0%"
              }
              category={"Grocery"}
              iconName={"local-grocery-store"}
            />
            <Text style={styles.divisionPrice}>
              {budgetCtx.weeklyCategories.grocery}$
            </Text>
          </View>
          <View style={styles.containerDivision}>
            <SmallContainer
              backgroundColor={"rgba(254, 204, 241, 0.4)"}
              width={budgetCtx.weeklyCategories.gas > 0 ? `${widthGas}%` : "0%"}
              category={"Gas"}
              iconName={"local-gas-station"}
            />
            <Text style={styles.divisionPrice}>
              {budgetCtx.weeklyCategories.gas}$
            </Text>
          </View>
          <View style={styles.containerDivision}>
            <SmallContainer
              backgroundColor={"rgba(240, 244, 194, 0.57)"}
              width={
                budgetCtx.weeklyCategories.others > 0 ? `${widthOthers}%` : "0%"
              }
              category={"Others"}
              iconName={"attach-money"}
            />
            <Text style={styles.divisionPrice}>
              {budgetCtx.weeklyCategories.others}$
            </Text>
          </View>
        </View>
      </ContainerPurple>
      <Text style={styles.titleContainer}>History</Text>
      <ContainerPurple heightValue={"38%"}>
        <View style={styles.containerListHistory}>
          <FlatList
            data={budgetCtx.itemsHistory}
            keyExtractor={(item) => item.id}
            renderItem={renderHistory}
            style={styles.listHistory}
          />
        </View>
      </ContainerPurple>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    fontFamily: "poppins-bold",
    textAlign: "center",
    fontSize: 14,
    opacity: 0.8,
  },
  monthlyExpensesNumber: {
    fontFamily: "poppins-bold",
    fontSize: 38,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    color: "#EFF4C3",
  },
  overallContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerDivision: {
    flexDirection: "row",
    alignItems: "center",
  },
  divisionPrice: {
    fontFamily: "poppins-bold",
    color: "#D3D7F4",
    fontSize: 16,
    width: 45,
    textAlign: "center",
  },
  containerListHistory: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: "100%",
  },
});

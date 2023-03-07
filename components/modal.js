import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { BudgetContext } from "./context";
import uuid from "react-native-uuid";

const ModalAddItem = ({ modalVisible, setModalVisible }) => {
  const [itemCategory, setItemCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [weeklyCategory, setWeeklyCategory] = useState("");
  const [isError, setIsError] = useState(false);

  const budgetCtx = useContext(BudgetContext);

  //Reset States function
  const resetState = () => {
    setProductDescription("");
    setProductPrice(0);
    setItemCategory("");
    setIsError(false);
    setWeeklyCategory("");
    setModalVisible(!modalVisible);
  };

  //Close Modal Function
  const handleClose = () => {
    resetState();
  };

  //Add Modal Function
  const handleAdd = () => {
    if (
      itemCategory.length === 0 ||
      productDescription.length === 0 ||
      productPrice === 0
    ) {
      setIsError(true);
    } else {
      budgetCtx.addHistory({
        id: uuid.v4(),
        weeklyCategory: weeklyCategory,
        category: itemCategory,
        product: productDescription,
        price: productPrice,
      });

      let remainMinus =
        budgetCtx.weeklyCategories[weeklyCategory] - productPrice;
      budgetCtx.weeklyRemain(weeklyCategory, remainMinus);

      resetState();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <LinearGradient
          colors={["#B69EFC", "#8A62FF"]}
          style={styles.modalView}
        >
          <View style={styles.containerAllIcon}>
            <Pressable
              style={
                itemCategory === "local-grocery-store"
                  ? [styles.containerIcon, styles.iconSelected]
                  : styles.containerIcon
              }
              onPress={() => {
                setItemCategory("local-grocery-store");
                setWeeklyCategory("grocery");
              }}
            >
              <MaterialIcons
                name="local-grocery-store"
                size={42}
                color={"black"}
              />
            </Pressable>
            <Pressable
              style={
                itemCategory === "local-gas-station"
                  ? [styles.containerIcon, styles.iconSelected]
                  : styles.containerIcon
              }
              onPress={() => {
                setItemCategory("local-gas-station");
                setWeeklyCategory("gas");
              }}
            >
              <MaterialIcons
                name="local-gas-station"
                size={42}
                color={"black"}
              />
            </Pressable>
            <Pressable
              style={
                itemCategory === "attach-money"
                  ? [styles.containerIcon, styles.iconSelected]
                  : styles.containerIcon
              }
              onPress={() => {
                setItemCategory("attach-money");
                setWeeklyCategory("others");
              }}
            >
              <MaterialIcons name="attach-money" size={42} color={"black"} />
            </Pressable>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Product"
            onChangeText={(text) => setProductDescription(text)}
          />
          <View style={styles.containerInputPrice}>
            <TextInput
              style={styles.textInput}
              placeholder="Price"
              keyboardType="number-pad"
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                if (text !== numericValue) {
                  Alert.alert(
                    "Numeric values only",
                    "Accept only numbers as input",
                    [{ text: "OK" }]
                  );
                }
                setProductPrice(numericValue);
              }}
              maxLength={3}
            />
            <MaterialIcons
              name="attach-money"
              size={22}
              color={"white"}
              style={styles.moneyIconInput}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.outerButtonClose}>
              <Pressable
                style={({ pressed }) =>
                  pressed
                    ? [styles.button, styles.buttonAdd, styles.pressed]
                    : [styles.button, styles.buttonAdd]
                }
                android_ripple={{ color: "#aaffb0", borderless: false }}
                onPress={handleAdd}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
            <View style={styles.outerButtonClose}>
              <Pressable
                style={({ pressed }) =>
                  pressed
                    ? [styles.button, styles.buttonClose, styles.pressed]
                    : [styles.button, styles.buttonClose]
                }
                onPress={handleClose}
                android_ripple={{ color: "#de88a8", borderless: false }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
          {isError && (
            <Text style={styles.error}>Must fill in all of the fields</Text>
          )}
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default ModalAddItem;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    justifyContent: "space-between",
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    height: 300,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  containerAllIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  containerIcon: {
    backgroundColor: "rgba(255, 228, 249, 0.7)",
    borderRadius: 8,
    padding: 4,
    opacity: 0.5,
  },
  iconSelected: {
    // borderWidth: 1,
    // borderColor: "rgb(0,198,14)",
    opacity: 1,
  },
  textInput: {
    width: "100%",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 228, 249, 1)",
    borderRadius: 10,
    color: "rgba(255, 228, 249, 1)",
    fontWeight: "bold",
  },
  containerInputPrice: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  moneyIconInput: {
    position: "absolute",
    right: -25,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
    width: 80,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonAdd: {
    backgroundColor: "rgb(0,198,14)",
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "rgba(217,98,142,1)",
    elevation: 5,
  },
  outerButtonClose: {
    borderRadius: 20,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.75,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    color: "rgba(255, 228, 249, 1)",
  },
  error: {
    position: "absolute",
    color: "#f29ead",
    bottom: 5,
  },
});

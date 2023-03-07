import { useContext, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { BudgetContext } from "./context";

const ModalRemaining = ({ setIsModalRemaining, isModalRemaining }) => {
  const budgetCtx = useContext(BudgetContext);

  const [grocery, setGrocery] = useState("");
  const [gas, setGas] = useState("");

  const handleClose = () => {
    setGrocery("");
    setGas("");
    setIsModalRemaining(false);
  };

  const handleAdd = () => {
    if (grocery.length === 0 || gas.length === 0) {
      setGrocery("");
      setGas("");
      setIsModalRemaining(false);
    } else {
      const weekly = {
        grocery: grocery,
        gas: gas,
        others: Math.floor(
          (budgetCtx.income - budgetCtx.expenses - gas * 4 - grocery * 4) / 4
        ),
      };
      budgetCtx.setWeekly(weekly);
      budgetCtx.setWeeklyTotal(weekly);
      setGrocery("");
      setGas("");
      setIsModalRemaining(false);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalRemaining}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.containerInput}>
              <View style={styles.inputContainer}>
                <Text style={styles.modalText}>Grocery</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={3}
                  value={grocery}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9]/g, "");
                    if (text !== numericValue) {
                      Alert.alert(
                        "Numeric values only",
                        "Accept only numbers as input",
                        [{ text: "OK" }]
                      );
                    }
                    setGrocery(numericValue);
                  }}
                />
                <MaterialIcons
                  name="attach-money"
                  size={14}
                  color={"black"}
                  style={styles.moneyIconInput}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.modalText}>Gas</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={3}
                  value={gas}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9]/g, "");
                    if (text !== numericValue) {
                      Alert.alert(
                        "Numeric values only",
                        "Accept only numbers as input",
                        [{ text: "OK" }]
                      );
                    }
                    setGas(numericValue);
                  }}
                />
                <MaterialIcons
                  name="attach-money"
                  size={14}
                  color={"black"}
                  style={styles.moneyIconInput}
                />
              </View>
              {/* <View style={styles.inputContainer}>
                <Text style={styles.modalText}>Others</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={3}
                  value={others}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9]/g, "");
                    if (text !== numericValue) {
                      Alert.alert(
                        "Numeric values only",
                        "Accept only numbers as input",
                        [{ text: "OK" }]
                      );
                    }
                    setOthers(numericValue);
                  }}
                />
                <MaterialIcons
                  name="attach-money"
                  size={14}
                  color={"black"}
                  style={styles.moneyIconInput}
                />
              </View> */}
            </View>
            <View style={styles.containerButton}>
              <Pressable style={[styles.button]} onPress={handleAdd}>
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleClose}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    justifyContent: "space-between",
    width: 300,
    height: 150,
    backgroundColor: "#E6DDFF",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerInput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,
  },
  input: {
    textAlign: "center",
    borderBottomWidth: 1,
    width: "50%",
  },
  containerButton: {
    flexDirection: "row",
  },
  button: {
    width: 80,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "rgba(0,198,14,0.8)",
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: "rgba(217,98,142,1)",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  moneyIconInput: {
    position: "absolute",
    right: 12,
    bottom: 25,
  },
});

export default ModalRemaining;

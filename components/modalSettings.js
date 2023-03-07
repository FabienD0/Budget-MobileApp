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

const ModalSettings = ({ setIsModal, isModal }) => {
  const [date, setDate] = useState("");
  const [product, setProduct] = useState("");
  const [payment, setPayment] = useState("");

  const budgetCtx = useContext(BudgetContext);

  const handleClose = () => {
    setProduct("");
    setPayment("");
    setIsModal(false);
  };

  const handleAdd = () => {
    if (product.length === 0 || payment.length === 0) {
      setIsModal(false);
      setProduct("");
      setPayment("");
      setDate("");
    } else {
      const expense = {
        id: uuid.v4(),
        date: date,
        product: product,
        payment: payment,
      };
      budgetCtx.addMonthly(expense);
      setIsModal(false);
      setProduct("");
      setPayment("");
      setDate("");
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={isModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.containerInput}>
              <View style={styles.inputContainer}>
                <Text style={styles.modalText}>Date</Text>
                <TextInput
                  style={styles.inputDate}
                  keyboardType="number-pad"
                  maxLength={2}
                  value={date}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9]/g, "");
                    if (text !== numericValue) {
                      Alert.alert(
                        "Numeric values only",
                        "Accept only numbers as input",
                        [{ text: "OK" }]
                      );
                    }
                    setDate(numericValue);
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.modalText}>Product</Text>
                <TextInput
                  style={styles.inputProduct}
                  value={product}
                  onChangeText={(text) => setProduct(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.modalText}>Payment</Text>
                <TextInput
                  style={styles.inputPayment}
                  keyboardType="number-pad"
                  maxLength={4}
                  value={payment}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9]/g, "");
                    if (text !== numericValue) {
                      Alert.alert(
                        "Numeric values only",
                        "Accept only numbers as input",
                        [{ text: "OK" }]
                      );
                    }
                    setPayment(numericValue);
                  }}
                />
                <MaterialIcons
                  name="attach-money"
                  size={14}
                  color={"black"}
                  style={styles.moneyIconInput}
                />
              </View>
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
  inputDate: {
    textAlign: "center",
    borderBottomWidth: 1,
    width: "30%",
  },
  inputProduct: {
    textAlign: "center",
    borderBottomWidth: 1,
    width: "100%",
  },
  inputPayment: {
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

export default ModalSettings;

import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";
import colorsProject from "./utils/colors";
import Home from "./screens/Home";
import Footer from "./components/footer";
import BudgetContextProvider from "./components/context";
import AppLoading from "expo-app-loading";
import { useState } from "react";
import ModalAddItem from "./components/modal";
import { BlurView } from "expo-blur";
import Settings from "./screens/Settings";

export default function App() {
  const [fontsLoaded] = useFonts({
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [isHomeScreen, setIsHomeScreen] = useState(true);

  if (!fontsLoaded) {
    // return <AppLoading />;
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <StatusBar style="auto" />
      <BudgetContextProvider>
        <ModalAddItem
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />

        <ImageBackground
          source={require("./assets/images/background.jpg")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <SafeAreaView style={styles.container}>
            <Text style={styles.headerTitle}>
              BUD<Text style={styles.spanHeaderTitle}>G</Text>ET
            </Text>
            {isHomeScreen && <Home />}
            {!isHomeScreen && <Settings />}
            <Footer
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
              setIsHomeScreen={setIsHomeScreen}
            />
          </SafeAreaView>
          {modalVisible && (
            <BlurView intensity={70} tint="light" style={styles.absolute} />
          )}
        </ImageBackground>
      </BudgetContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  backgroundImage: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  headerTitle: {
    fontSize: 44,
    letterSpacing: 8,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontFamily: "poppins-bold",
    textAlign: "center",
    opacity: 0.8,
  },
  spanHeaderTitle: {
    color: colorsProject.pink,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

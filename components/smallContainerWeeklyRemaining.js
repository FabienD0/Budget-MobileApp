import { StyleSheet, View, Text } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const SmallContainer = ({ backgroundColor, width, category, iconName }) => {
  return (
    <View style={styles.containerAll}>
      <View
        style={[
          styles.containerBackground,
          { backgroundColor: backgroundColor, width: width },
        ]}
      >
        <View
          style={[styles.containerIcon, { backgroundColor: backgroundColor }]}
        >
          <MaterialIcons
            name={iconName}
            size={16}
            color={"black"}
            style={styles.icon}
          />
        </View>
      </View>
      <Text style={styles.weeklyTextDivision}>{category}</Text>
    </View>
  );
};

export default SmallContainer;

const styles = StyleSheet.create({
  containerAll: {
    width: 230,
    marginRight: 7,
    flexDirection: "row",
    alignItems: "center",
  },
  containerBackground: {
    flexDirection: "row",
    alignItems: "center",
    height: 35,
    borderRadius: 7,
    paddingHorizontal: 8,
    marginVertical: 3,
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
  weeklyTextDivision: {
    position: "absolute",
    left: 45,
    fontFamily: "poppins-regular",
    letterSpacing: 3,
    fontSize: 10,
    marginHorizontal: 10,
    color: "rgba(98, 68, 187, 0.90)",
  },
});

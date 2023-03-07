import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const usePersistedState = (key, defaultValue) => {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((value) => {
        if (value !== null) {
          setState(JSON.parse(value));
        }
      })
      .catch((error) => {
        console.error("Error retrieving data from AsyncStorage:", error);
      });
  }, [key]);

  useEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(state)).catch((error) => {
      console.error("Error saving data to AsyncStorage:", error);
    });
  }, [key, state]);

  return [state, setState];
  7;
};

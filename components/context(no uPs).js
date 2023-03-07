import { createContext, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";

export const BudgetContext = createContext({
  itemsHistory: [],
  weeklyRemain: (id, value) => {},
  weeklyCategories: {},
  addMonthly: (id) => {},
  monthlyExpenses: [],
  removeMonthly: (id) => {},
  setWeekly: (id) => {},
  setWeeklyTotal: (id) => {},
  weeklyCategoriesTotal: {},
  clearHistory: () => {},
  removeOneHistory: (id, category, value) => {},
});

const BudgetContextProvider = ({ children }) => {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [weeklyCategories, setWeeklyCategories] = useState({
    grocery: 0,
    gas: 0,
    others: 0,
  });
  const [weeklyCategoriesTotal, setWeeklyCategoriesTotal] = useState({});
  const [itemsHistory, setItemsHistory] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    monthlyExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [monthlyExpenses]);

  const addHistory = (id) => {
    setItemsHistory((currentHistory) => [...currentHistory, id]);
  };

  const removeOneHistory = (id, weekCategory, value) => {
    const oldValue = weeklyCategories[weekCategory];
    const filterExpenses = itemsHistory.filter((item) => item.id !== id);
    setItemsHistory(filterExpenses);
    setWeeklyCategories((currentWeekly) => ({
      ...currentWeekly,
      [weekCategory]: parseInt(value) + parseInt(oldValue),
    }));
  };

  const weeklyRemain = (id, value) => {
    setWeeklyCategories((currentWeekly) => ({ ...currentWeekly, [id]: value }));
  };

  const addMonthly = (id) => {
    setMonthlyExpenses((currentMonthly) => [...currentMonthly, id]);
    setExpenses(expenses + parseInt(id.payment));
  };

  const removeMonthly = (id, payment) => {
    const filterExpenses = monthlyExpenses.filter((item) => item.id !== id);
    setMonthlyExpenses(filterExpenses);
    setExpenses(expenses - parseInt(payment));
  };

  const setWeekly = (id) => {
    setWeeklyCategories(id);
  };

  const setWeeklyTotal = (id) => {
    setWeeklyCategoriesTotal(id);
  };

  const clearHistory = () => {
    setItemsHistory([]);
  };

  const value = {
    itemsHistory: itemsHistory,
    addHistory: addHistory,
    weeklyRemain: weeklyRemain,
    weeklyCategories: weeklyCategories,
    addMonthly: addMonthly,
    monthlyExpenses: monthlyExpenses,
    removeMonthly: removeMonthly,
    setIncome: setIncome,
    income: income,
    expenses: expenses,
    setWeekly: setWeekly,
    setWeeklyTotal: setWeeklyTotal,
    weeklyCategoriesTotal: weeklyCategoriesTotal,
    clearHistory: clearHistory,
    removeOneHistory: removeOneHistory,
  };

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};

export default BudgetContextProvider;

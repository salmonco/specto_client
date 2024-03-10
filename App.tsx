import * as React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store";
import AppInner from "./AppInner";
import { useFonts } from "expo-font";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
  },
};

function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme}>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;

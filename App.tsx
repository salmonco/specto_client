import * as React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store";
import AppInner from "./AppInner";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
  },
};

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme}>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;

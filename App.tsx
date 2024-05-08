import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store";
import AppInner from "./AppInner";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
  },
};

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // 폰트가 로드되지 않았을 때 로딩 화면을 보여줍니다.
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppInner />
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

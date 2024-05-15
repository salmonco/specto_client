import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "./src/store/reducer";
import Splash from "./src/screens/Splash";
import Auth from "./src/stackNav/Auth";
import Main from "./src/tabNav/Main";
import { useAxiosInterceptor } from "src/hooks/useAxiosInterceptor";

export type RootStackParamList = {
  Splash: undefined;
  Auth: { screen: "Login" };
  Main: undefined;
  // SpecDetail: { id: number }; // id 매개변수 추가
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  // const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => !!state.user.name);
  useAxiosInterceptor();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Main" component={Main} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

export default AppInner;

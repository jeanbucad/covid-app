import React from "react";
import Main from "./components/Main";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CountriesList from "./components/CountriesList";

const queryClient = new QueryClient();

export type Routes = {
  Main: undefined;
  CountriesList: undefined;
};

const Stack = createNativeStackNavigator<Routes>();

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="CountriesList" component={CountriesList} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import AuthContext from "./context"
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {



  return (
    <StripeProvider publishableKey="pk_test_51LSvzlSDr67aca5VWkvF5mWBipmZ7q8Vq1dXxV2czrPJ7LzWQYEmVJXVCCER6wWahzkI0Xx8en09nvre4pgcqLQe00m6XOjPxq">
      <NavigationContainer>
          <AuthContext />
      </NavigationContainer>
      </StripeProvider>
  );
}



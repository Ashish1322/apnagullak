import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import AuthContext from "./context"


export default function App() {



  return (
      <NavigationContainer>
          <AuthContext />
      </NavigationContainer>
  );
}



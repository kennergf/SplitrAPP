import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import styles from './src/styles';
import Login from './src/login';
import ListExpenses from './src/listExpenses';

// REF https://reactnative.dev/docs/navigation
// REF https://blog.logrocket.com/navigating-react-native-apps-using-react-navigation/
// REF https://reactnavigation.org/docs/drawer-navigator/
// REF https://www.brainstormcreative.co.uk/react-native-expo/how-to-set-up-expo-app-navigation-using-react-navigation/

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="List Expenses" component={ListExpenses} />
        <Drawer.Screen name="Article" component={Article} />
        <Drawer.Screen name="Login" component={Login} ></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

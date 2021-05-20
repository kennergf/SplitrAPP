import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './src/login';
import AddExpense from './src/addExpense';
import ListExpenses from './src/listExpenses';
import Summary from './src/summary';
import CloseTrip from './src/closeTrip';
import Signup from './src/signup';
import Logout from './src/logout';

// REF https://reactnative.dev/docs/navigation
// REF https://blog.logrocket.com/navigating-react-native-apps-using-react-navigation/
// REF https://reactnavigation.org/docs/drawer-navigator/
// REF https://www.brainstormcreative.co.uk/react-native-expo/how-to-set-up-expo-app-navigation-using-react-navigation/

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="AddExpense" component={AddExpense} />
        <Drawer.Screen name="List Expenses" component={ListExpenses} />
        <Drawer.Screen name="Summary" component={Summary} />
        <Drawer.Screen name="Close Trip" component={CloseTrip} />
        <Drawer.Screen name="Login" component={Login} ></Drawer.Screen>
        <Drawer.Screen name="Signup" component={Signup} ></Drawer.Screen>
        <Drawer.Screen name="Logout" component={Logout} options={self.aa}></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

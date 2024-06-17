import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PeopleScreen from '../screens/PeopleScreen';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();


  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Chats"
          component={ChatScreen}
          options={{
            tabBarStyle: { backgroundColor: "#101010" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcon
                  name="chat-bubble-outline"
                  size={30}
                  color="white"
                />
              ) : (
                <MaterialIcon
                  name="chat-bubble-outline"
                  size={30}
                  color="#989898"
                />
              ),
          }} 
          />


        <Tab.Screen name="Profile"
          component={ProfileScreen}
          options={{
            tabBarStyle: { backgroundColor: "#101010" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  name="person-outline"
                  size={30}
                  color="white"
                />
              ) : (
                <Ionicons
                  name="person-outline"
                  size={30}
                  color="#989898"
                />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Login' component={LoginScreen}
          options={{
            headerShown: false

          }} />


        <Stack.Screen
          name='Register' component={RegisterScreen}
          options={{
            headerShown: false

          }} />
      </Stack.Navigator>
    );
  };

  function MainStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='People'
          component={PeopleScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }


  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
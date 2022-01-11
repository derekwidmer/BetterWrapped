import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import SignIn from './components/signIn';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './components/homePage';
import { Provider } from 'react-redux';
import { store } from './redux/store'

const query = require('query-string')

export default function App() {

  // discovery containing endpoints used by AuthSession hook

  const Stack = createNativeStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {/* <View style={styles.container}>
          <StatusBar style="light" />
          <SignIn onPress={getCode} />
        </View> */}
          {/* <Stack.Screen name="Home" component={HomePage} /> */}
          <Stack.Screen name="Sign In" component={SignIn} />
          {/* <Stack.Screen name="Sign In">
          {props => <SignIn onPress={getCode} />}
        </Stack.Screen> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111'
  }
});

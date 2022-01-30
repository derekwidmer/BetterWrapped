import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import SignIn from './components/signIn/SignIn';
import HomePage from './components/homePage/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import * as SecureStore from 'expo-secure-store';
import { fetchTokens } from './redux/tokenSlice';

export default function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(async () => {
    const refresh_token = await SecureStore.getItemAsync('refresh_token')
    if (refresh_token) {
      fetchTokens({})
      setIsSignedIn(true)
    }
  }, [])

  const Stack = createNativeStackNavigator()
  const authFlow =
    <>
      <Stack.Screen name="Sign In" component={SignIn} />
    </>

  const appFlow =
    <>
      <Stack.Screen name="Home" component={HomePage} />
    </>

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {isSignedIn ? appFlow : authFlow}
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

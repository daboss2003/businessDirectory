import { Image, StyleSheet, TouchableOpacity, View as DefaultView } from 'react-native'
import React, { useCallback } from 'react';
import Colors from '../constants/Colors'
import { View, Text } from '../components/Themed';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";



WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={styles.overAllContainer}>
        <DefaultView style={styles.container}>
            <Image source={require('../assets/images/login.png')} style={styles.image} />
      </DefaultView>
      <DefaultView style={styles.innerContainer}>
        <Text style={styles.headerText}>
          Your Ultimate
          <Text style={{ color: Colors.primary, }}> Community Business Directory
          </Text>
          {' '}
          App
        </Text>
        <Text style={styles.text}>Find business near you and post your own business in your community
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </DefaultView>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 99,
    marginTop: 20
  },
  container: {
    alignItems: 'center'
  },
  image: {
    width: 220,
    height: 450,
    borderRadius: 20,
    borderWidth: 6,
    borderColor: '#333'
  },
  innerContainer: {
    padding: 20,
    marginTop: -20
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'OutfitBold',
    textAlign: 'center'
  },
  text: {
    fontSize: 15,
    fontFamily: 'OutfitRegular',
    textAlign: 'center',
    marginVertical: 15,
    color: Colors.gray
  },
  overAllContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontFamily: 'OutfitRegular',
    color: '#fff',
    textAlign: 'center'
  }
});
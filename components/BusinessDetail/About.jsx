import { StyleSheet, View, useColorScheme } from 'react-native'
import { Text } from '../Themed'
import React from 'react'
import Colors from '../../constants/Colors'

const About = ({ about }) => {
    const theme = useColorScheme() ?? 'light'
  return (
    <View
        style={{ ...styles.container, backgroundColor: Colors[theme].overlay}}
    >
          <Text style={styles.text}>About</Text>
          <Text style={styles.about}>{ about}</Text>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    text: {
        fontFamily: 'OutfitBold',
        fontSize: 20
    },
    about: {
        fontFamily: 'OutfitRegular',
        lineHeight: 25
    }
})
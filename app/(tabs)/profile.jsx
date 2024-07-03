import { StyleSheet } from 'react-native'
import { View, Text } from '../../components/Themed'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <UserIntro />
      <MenuList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  heading: {
    fontFamily: 'OutfitBold',
    fontSize: 35,
    marginTop: 10
  }
})
import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from '../Themed'
import { useUser } from '@clerk/clerk-expo'

const UserIntro = () => {
    const {user} = useUser()
  return (
      <View style={styles.container}>
          <Image source={{uri: user?.imageUrl}} style={styles.image} />
          <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
          <Text style={styles.email}>{user?.emailAddresses[0]?.emailAddress}</Text>
    </View>
  )
}

export default UserIntro

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    name: {
        fontFamily: 'OutfitBold',
        fontSize: 20
    },
    email: {
        fontFamily: 'OutfitRegular',
        fontSize: 16
    }
})
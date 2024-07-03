import { Image, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { Text } from '../Themed'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const Header = () => {

    const { user } = useUser()
  return (
    <View style={styles.container}>
        <View style={styles.userInfo}>
              <Image source={{ uri: user?.imageUrl || '' }} style={styles.image} /> 
              <View>
                  <Text style={{color: '#fff'}}>Welcome</Text>
                  <Text style={styles.userName}>{user?.firstName} {user?.lastName }</Text>
              </View>
          </View>
          <View style={styles.inputContainer}>
              <Ionicons name='search' color={Colors.primary}  size={24}/>
              <TextInput
                  placeholder='Search...'
                  style={styles.input}
              />
          </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    userInfo: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    userName: {
        fontSize: 19,
        fontFamily: 'OutfitMedium',
        color: '#fff'
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        marginTop: 15,
        borderRadius: 8
    },
    input: {
        fontSize: 16,
        fontFamily: 'OutfitMedium'
    }
})
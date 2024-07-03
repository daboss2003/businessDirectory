import { FlatList, Image, Share, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native'
import React from 'react'
import { Text } from '../Themed'
import Colors from '../../constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

const MenuList = () => {
    const theme = useColorScheme() ?? 'light'
    const router = useRouter()
    const {signOut} = useAuth()
    const menuList = [
        {
            id: 1,
            name: 'Add Business',
            icon: require('../../assets/images/add.png'),
            path: '/business/newBusiness'
        },
        {
            id: 2,
            name: 'My Business',
            icon: require('../../assets/images/business-and-trade.png'),
            path: '/business/userBusiness'
        },
        {
            id: 3,
            name: 'Share App',
            icon: require('../../assets/images/share_1.png'),
            path: 'share'
        },
        {
            id: 4,
            name: 'Logout',
            icon: require('../../assets/images/logout.png'),
            path: 'logout'
        }
    ]
    function navigate(item) {
        if (item.path === 'logout') {
            signOut()
            return
        }
        if (item.path === 'share') {
            Share.share({ message: 'Download the Business App' })
            return
        }
        router.push(item.path)
    }
  return (
    <View style={styles.container}>
          <FlatList
              data={menuList}
              keyExtractor={item => item.id + item.name}
              renderItem={({ item }) => (
                  <TouchableOpacity style={{ ...styles.menuContainer, backgroundColor: Colors[theme].overlay }} onPress={() => navigate(item)}>
                      <Image source={item.icon} style={styles.icon} />
                      <Text style={styles.name}>{ item.name }</Text>
                  </TouchableOpacity>
              )}
              numColumns={2}
          />
          <View style={styles.footer}>
              <Text style={styles.footerText}>Built by Daboss for React native training @2024</Text>
          </View>
    </View>
  )
}

export default MenuList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    },
    icon: {
        width: 50,
        height: 50
    },
    name: {
        fontFamily: 'OutfitMedium',
        fontSize: 16,
        flex: 1
    },
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        margin: 10,
        borderColor: Colors.primary
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    footerText: {
        fontSize: 15,
        fontFamily: 'OutfitMedium',
        color: Colors.gray
    }
})
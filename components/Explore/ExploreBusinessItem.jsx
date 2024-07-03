import { Image, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native'
import React from 'react'
import { Text } from '../Themed'
import Colors from '../../constants/Colors'
import { useRouter } from 'expo-router'

const ExploreBusinessItem = ({ business }) => {
    const theme = useColorScheme() ?? 'light'
    const router = useRouter()

    function handlePress() {
        router.push(`/businessDetail/${business.id}`)
    }
  return (
    <TouchableOpacity style={{...styles.container, backgroundColor: Colors[theme].overlay}} onPress={handlePress}>
          <Image source={{ uri: business.imageUrl }} style={styles.image} />
          <View style={styles.infoContainer}>
              <Text style={styles.name}>{business.name}</Text> 
              <Text style={styles.address}>{business.address }</Text>  
          </View>
    </TouchableOpacity>
  )
}

export default ExploreBusinessItem

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: 150,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    infoContainer: {
        padding: 10
    },
    name: {
        fontFamily: 'OutfitBold',
        fontSize: 20
    },
    address: {
        fontFamily: 'OutfitRegular',
        color: Colors.gray
    },
    container: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginTop: 15
    }
})
import { Image, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native'
import React from 'react'
import { Text } from '../Themed'
import Colors from '../../constants/Colors'
import { useRouter } from 'expo-router'

const BusinessListItem = ({ business }) => {
    const theme = useColorScheme() ?? 'light'
    const router = useRouter()

    function onPressHandler(){
        router.push(`/businessDetail/${business.id}`);
    }
    
  return (
    <TouchableOpacity style={{...styles.container, backgroundColor: Colors[theme].overlay}} onPress={onPressHandler}>
        <Image source={{ uri: business.imageUrl }} style={styles.image} />
        <View style={styles.rightContainer}>
            <Text style={styles.name}>{business.name}</Text>
            <Text style={styles.address}>{business.address}</Text>
            <View style={styles.ratingContainer}>
                <Image source={require('../../assets/images/star.png')} style={styles.star} />
                <Text style={styles.rating}>{ business.ratings}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default BusinessListItem

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        borderRadius: 15
    },
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 15,
        flexDirection: 'row',
        gap: 10
    },
    star: {
        width: 15,
        height: 15
    },
    rating: {
        fontFamily: 'OutfitRegular'
    },
    ratingContainer: {
        flexDirection: 'row',
        gap: 5
    },
    rightContainer: {
        flex: 1,
        gap: 7
    },
    name: {
        fontFamily: 'OutfitBold',
        fontSize: 20
    },
    address: {
        fontFamily: 'OutfitRegular',
        color: Colors.gray,
        fontSize: 15
    }
})
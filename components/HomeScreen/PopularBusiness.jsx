import { Image, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native'
import React from 'react'
import { Text } from '../Themed'
import Colors from '../../constants/Colors'
import { useRouter } from 'expo-router'

const PopularBusiness = ({ business }) => {
    const theme = useColorScheme() ?? "light"
    const router = useRouter()
    return (
    <TouchableOpacity onPress={() => router.push(`/businessDetail/${business.id}`)}>
      <View style={{ ...styles.container, backgroundColor: Colors[theme].overlay, }}>
          <Image source={{ uri: business.imageUrl }} style={styles.image} />
          <View style={styles.labelContainer}>
              <Text style={styles.label}>{business.name}</Text>
              <Text style={styles.smallLabel}>{ business.address}</Text>
          </View>
          <View style={styles.infoContainer}>
              <View style={styles.ratingContainer}>
                <Image source={require('../../assets/images/star.png')} style={styles.star} />
                <Text style={styles.rating}>{ business.ratings}</Text>
              </View>
              <Text style={styles.category}>{business.category }</Text>
          </View>
        </View>
    </TouchableOpacity>
  )
}

export default PopularBusiness

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 130,
        borderRadius :15
    },
    container: {
        marginLeft: 30,
        padding: 10,
        borderRadius: 15
    },
    label: {
        fontFamily: 'OutfitBold',
        fontSize: 17 
    },
    labelContainer: {
        marginTop: 7,
        gap: 5
    },
    smallLabel: {
        fontFamily: 'OutfitRegular',
        fontSize: 13,
        color: Colors.gray
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
    category: {
        fontFamily: 'OutfitRegular',
        backgroundColor: Colors.primary,
        color: '#fff',
        padding: 3,
        fontSize: 10,
        borderRadius: 5
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
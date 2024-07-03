import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text } from '../Themed'
import { findImage } from '../../constants/image'

const CategoryItem = ({ category, onPress }) => {
  
  return (
    <TouchableOpacity onPress={() => onPress(category)} style={{alignItems: 'center', marginRight: 15,}}>
        <View style={ styles.innerContainer}>
            <Image source={findImage(category.icon)} style={ styles.image} />
        </View>
        <Text style={styles.label}>{ category?.name.split(' ')[0]}</Text>
    </TouchableOpacity>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
    image: {
        width: 40, 
        height: 40
  },
  innerContainer: {
    padding: 10,
    borderRadius: 99,
    backgroundColor: 'rgba(147, 215, 237, 0.2)'
  },
  label: {
    fontSize: 12,
    fontFamily: 'OutfitMedium',
    textAlign: 'center',
    marginTop: 5
  }
})
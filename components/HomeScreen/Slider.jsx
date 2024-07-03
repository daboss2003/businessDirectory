import { FlatList, Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { fireDB } from '../../config/firebaseConfig';
import { Text } from '../Themed';

const Slider = () => {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    setSlider([]);
    const sliderCollection = query(collection(fireDB, 'Slider'));
    getDocs(sliderCollection).then(snapshot => {
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          setSlider(prev => [...prev,{ id: doc.id, ...doc.data() }]);
        })
      }
    }
    ).catch(err => console.log(err));
  }, []);
  return (
    <View style={{marginBottom: 25}}>
      <Text style={styles.sliderHeadingText}>#Special for you</Text>
      <FlatList
        data={slider}
        horizontal
        style={styles.flatList}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        )}
      />
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
  sliderHeadingText: {
    fontFamily: 'OutfitBold',
    fontSize: 20,
    paddingTop: 20,
    paddingLeft: 20,
    marginBottom: 5
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 15,
    marginRight: 15
  },
  flatList: {
    paddingLeft: 20
  }
});
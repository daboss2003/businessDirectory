import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Text } from '../Themed';
import Colors from '../../constants/Colors';
import { fireDB } from '../../config/firebaseConfig';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import PopularBusiness from './PopularBusiness';

const BusinessList = () => {
    const [business, setBusiness] = useState([]);

    useEffect(() => {
      setBusiness([])
    const businessCollection = query(collection(fireDB, 'BusinessList'), limit(10));
    getDocs(businessCollection).then(snapshot => {
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          setBusiness(prev => [...prev,{ id: doc.id, ...doc.data() }]);
        })
      }
    }
    ).catch(err => console.log(err));
  }, []);
  return (
    <View>
      <View style={styles.headingTextContainer}>
            <Text styles={styles.headingText}>
                Popular Business
            </Text>
            <Text style={styles.headingTextRight}>View All</Text>
          </View> 
          <FlatList
              data={business}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => (<PopularBusiness business={item} />)}
          />
    </View>
  )
}

export default BusinessList

const styles = StyleSheet.create({
     headingText: {
        fontSize: 20,
        fontFamily: 'OutfitBold'
    },
    headingTextContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        padding: 20,
        marginTop: 10,
        alignItems: 'center'
    },
    headingTextRight: {
        color: Colors.primary,
        fontFamily: 'OutfitMedium'
    }
})
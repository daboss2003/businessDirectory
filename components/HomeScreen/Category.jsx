import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore';
import { fireDB } from '../../config/firebaseConfig';
import CategoryItem from './CategoryItem';
import { Text } from '../Themed';
import { useRouter } from 'expo-router';

const Category = ({explore=false, onExploreCategory}) => {
    const [category, setCategory] = useState([]);
    const router = useRouter()
    useEffect(() => {
        setCategory([]);
        const sliderCollection = query(collection(fireDB, 'Category'));
        getDocs(sliderCollection).then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach((doc) => {
                    setCategory(prev => [...prev,{ id: doc.id, ...doc.data() }]);
                });
            }
        }
        ).catch(err => console.log(err));
    }, []);

    function onCategoryPress(category) {
        if (explore) {
            onExploreCategory(category.name)
        }
        else {
            router.navigate(`/businessList/${category.name}`);
        }
    }
  return (
    <View>
          {
            explore &&
            <View style={styles.headingTextContainer}>
                <Text styles={styles.headingText}>
                    Category
                </Text>
                <Text style={styles.headingTextRight}>View All</Text>
            </View>
          }
        <FlatList
              data={category}   
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatlist}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                  <CategoryItem category={item} onPress={onCategoryPress} />
              )}
        />
    </View>
  )
}

export default Category

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
    },
    flatlist: {
        marginLeft: 20
    }
})
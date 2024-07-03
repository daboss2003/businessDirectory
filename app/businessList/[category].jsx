import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { fireDB } from '../../config/firebaseConfig';
import { Text, View } from '../../components/Themed';
import BusinessListItem from '../../components/BusinessList/BusinessListItem'
import Colors from '../../constants/Colors';

const CategoryPage = () => {
    const { category } = useLocalSearchParams()
    const navigation = useNavigation()
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: category,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: Colors.primary
            }
        });
    }, []);

    useEffect(() => {
       getData()
    }, []);

    function getData() {
        setBusinessList([])
        setLoading(true)
        const categoryQuery = query(collection(fireDB, 'BusinessList'), where('category', '==', category));
        getDocs(categoryQuery).then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    setBusinessList(prev => [...prev, { id: doc.id, ...doc.data() }]);
                })
            }
        }).catch(err => console.log(err)).finally(() => setLoading(false));
    }

    if (loading) {
        return <ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} size={'large'} color={Colors.primary} />
    }

  return (
    <View style={{flex: 1}}>
        <FlatList
        data={businessList}  
        refreshing={loading}
        onRefresh={getData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (<BusinessListItem business={item} />)}
        ListEmptyComponent={<Text style={styles.emptyListText}>No Business Found</Text>}
        />
    </View>
  )
}

export default CategoryPage

const styles = StyleSheet.create({
    emptyListText: {
        fontSize: 20,
        fontFamily: 'OutfitBold',
        color: Colors.gray,
        textAlign: 'center',
        marginTop: '50%'
    }
})
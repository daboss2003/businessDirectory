import { ActivityIndicator, FlatList, StyleSheet, } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { View } from '../../components/Themed'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { fireDB } from '../../config/firebaseConfig'
import Colors from '../../constants/Colors'
import BusinessListItem from '../../components/BusinessList/BusinessListItem'
import { useNavigation } from 'expo-router'

const UserBusiness = () => {
    const { user } = useUser()
    const [businessList, setBusinessList] = useState([])
    const [loading, setLoading] = useState(false)
    const navigator = useNavigation()

    useEffect(() => {
        navigator.setOptions({
            title: 'My Business',
            headerShown: true,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: Colors.primary
            }
        });
    }, []);

    useEffect(() => {
        if (memoizedUser) {
            getData()
        }
    }, [memoizedUser]);

    const memoizedUser = useMemo(() => user, [user]);

    function getData() {
        if(!user) return
        setBusinessList([])
        setLoading(true)
        const categoryQuery = query(collection(fireDB, 'BusinessList'), where('userEmail', '==', user.emailAddresses[0].emailAddress));
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
    <View style={styles.container}>
        <FlatList
            data={businessList}
            keyExtractor={item => item.id}
            refreshing={loading}
            onRefresh={getData}
            renderItem={({item}) => (<BusinessListItem business={item} />)}
        />
    </View>
  )
}

export default UserBusiness

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20
  }
})
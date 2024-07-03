import { StyleSheet, View as DefaultView, TextInput } from 'react-native'
import { View, Text } from '../../components/Themed'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import Category from '../../components/HomeScreen/Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { fireDB } from '../../config/firebaseConfig'
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList'

export default function Explore() {

  const [business, setBusiness] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getBusinessByCategory('Education')
  }, []);

  async function getBusinessByCategory(category) {
    setBusiness([])
    setLoading(true)
    const businessCollection = query(collection(fireDB, 'BusinessList'), where('category', '==', category));
    const snapShot = await getDocs(businessCollection);
    if (!snapShot.empty) {
      snapShot.forEach((data) => {
        setBusiness(prev => [...prev, { id: data.id, ...data.data() }]);
      });
    }
    setLoading(false)
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore More</Text>
      <DefaultView style={styles.inputContainer}>
          <Ionicons name='search' color={Colors.primary} size={24} />
          <TextInput
              placeholder='Search...'
              style={styles.input}
          />
      </DefaultView>
      <Category explore={true} onExploreCategory={getBusinessByCategory} />
      <ExploreBusinessList business={business} loading={loading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontFamily: 'OutfitBold',
    fontSize: 30
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    marginTop: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray
  },
    input: {
      fontSize: 16,
      fontFamily: 'OutfitMedium'
    }
})
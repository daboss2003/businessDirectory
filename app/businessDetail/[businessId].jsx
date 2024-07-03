import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { View } from '../../components/Themed'
import { doc, getDoc } from 'firebase/firestore'
import { fireDB } from '../../config/firebaseConfig'
import Colors from '../../constants/Colors'
import Intro from '../../components/BusinessDetail/Intro'
import ActionButtons from '../../components/BusinessDetail/ActionButtons'
import About from '../../components/BusinessDetail/About'
import Review from '../../components/BusinessDetail/Review'

const BusinessPage = () => {
    const { businessId } = useLocalSearchParams()
    const [businessDetail, setBusinessDetail] = useState({})
    const [loading, setLoading] = useState(false)
     
    useEffect(() => {
        setLoading(true)
        const businessQuery = doc(fireDB, 'BusinessList', businessId)
        getDoc(businessQuery).then(snapshot => {
            if (snapshot.exists()) {
                setBusinessDetail({ id: snapshot.id, ...snapshot.data() })
            }
        }).catch(err => console.log(err)).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} size={'large'} color={Colors.primary} />
    }
  return (
    <View style={{flex: 1}}>
        <ScrollView>
            <Intro
            name={businessDetail.name}
            image={businessDetail.imageUrl}
            address={businessDetail.address}
            userEmail={businessDetail.userEmail}
            businessId={businessDetail.id}
        />
          <ActionButtons
            address={businessDetail.address}
            website={businessDetail.website}
            contact={businessDetail.contact}
            name={businessDetail.name}
          />
          <About
            about={businessDetail.about}
            />
            <Review
                  reviews={businessDetail.reviews}
                  Id={businessDetail.id}
                  ratings={businessDetail.ratings}
            />
        </ScrollView>
    </View>
  )
}

export default BusinessPage

const styles = StyleSheet.create({})
import { Alert, Image, StyleSheet, ToastAndroid, View, useColorScheme } from 'react-native'
import React from 'react'
import {Text} from '../Themed'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Colors from '../../constants/Colors'
import { useUser } from '@clerk/clerk-expo'
import { deleteDoc, doc } from 'firebase/firestore'
import { fireDB } from '../../config/firebaseConfig'

const Intro = ({ image, name, address, userEmail, businessId}) => {
    const router = useRouter()
    const theme = useColorScheme() ?? 'light'
    const { user } = useUser()
    
    function confirmDeleteBusiness() {
        Alert.alert('Confirmation', 'Do you realy want to delete this business?',
            [
                {
                    text: 'Yes',
                    onPress: deleteBusiness,
                    style: 'destructive'
                },
                {
                    text: 'No',
                    style: 'cancel'
                }
            ]
        );
    }

    async function deleteBusiness() {
        await deleteDoc(doc(fireDB, 'BusinessList', businessId))
        router.back()
        ToastAndroid.showWithGravity('Business Deleted!', 5, ToastAndroid.TOP)
    }
  return (
    <View>
        <View style={styles.iconContainer}>
            <Ionicons name='arrow-back-circle' color={'#fff'} size={30} onPress={router.back} />
            <Ionicons name='heart-outline' color={'#fff'} size={30} />
        </View>
        <Image source={{ uri: image }} style={styles.image} />
          <View style={{ ...styles.textContainer, backgroundColor: Colors[theme].overlay}}>
              <View style={styles.deleteIconContainer}>
                  <Text style={styles.name}>{name}</Text>
                  {
                      userEmail === user?.emailAddresses[0].emailAddress
                      &&
                      <Ionicons name='trash' size={24} color={'red'} onPress={confirmDeleteBusiness} />
                  }
              </View>
            <Text style={styles.address}>{ address }</Text>
        </View>
    </View>
  )
}

export default Intro

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 340
    },
    iconContainer: {
        position: 'absolute',
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20
    },
    name: {
        fontSize: 25,
        fontFamily: 'OutfitBold',
    },
    address: {
        fontSize: 16,
        fontFamily: 'OutfitRegular'
    },
    textContainer: {
        padding: 20,
        marginTop: -20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    deleteIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    }
})
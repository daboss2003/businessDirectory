import { Image, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View as DefaultView, ToastAndroid, ActivityIndicator, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Text} from '../../components/Themed'
import { useNavigation } from 'expo-router'
import Colors from '../../constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, getDocs, setDoc, query, doc } from 'firebase/firestore';
import {fireDB, storage} from '../../config/firebaseConfig'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage'
import { useUser } from '@clerk/clerk-expo'

const {width, height} = Dimensions.get('window')
const newBusiness = () => {
  const navigator = useNavigation()
  const [imageUri, setImageUri] = useState(null)
  const theme = useColorScheme() ?? 'light';
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [website, setWebsite] = useState('')
  const [contact, setContact] = useState('')
  const [about, setAbout] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    setCategoryList([])
    const categoryListCollection = query(collection(fireDB, 'Category'));
    getDocs(categoryListCollection).then(snapshot => {
      if (!snapshot.empty) {
        snapshot.forEach(doc => {
          const label = doc.data().name
          const value = doc.data().name
          setCategoryList(prev => [...prev, { label, value }]);
        })
      }
    }).catch(err => console.log(err))
  },[])

  useEffect(() => {
    navigator.setOptions({
      title: 'New Business',
      headerShown: true,
      headerTintColor: '#fff',
      headerStyle: {
          backgroundColor: Colors.primary
      }
    })
  }, []);

  async function pickImage() {
     let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  async function uploadData() {
    if (imageUri === null || category === '' || name === '' || website === '' || about === '' || address === '' || contact === '') {
      ToastAndroid.showWithGravity('Fill all forms completly', 5, ToastAndroid.TOP);
      return
    }
    else {
      try {
        setLoading(true)
        const filename = Date.now().toString() + '.jpg';
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const imageRef = ref(storage, 'businessDirectory/' + filename)
        await uploadBytes(imageRef, blob)
        const url = await getDownloadURL(imageRef)
        console.log(url)
        const newBusiness = {
          name,
          address,
          about,
          website,
          imageUrl: url,
          category,
          username: user.firstName + ' ' + user.lastName,
          contact,
          userEmail: user.emailAddresses[0].emailAddress,
          userImage: user.imageUrl
        }
        await setDoc(doc(collection(fireDB, 'BusinessList'), Date.now().toString()), newBusiness)
        ToastAndroid.showWithGravity('Business created Successfully', 5, ToastAndroid.TOP);
        setAbout('')
        setAddress('')
        setContact('')
        setWebsite('')
        setName('')
        setImageUri(null)

      }
      catch (err) {
        console.log(err)
      }
      finally {
        setLoading(false)
      }
    }
  }

  return (
   
    <KeyboardAvoidingView style={{ ...styles.container, backgroundColor: Colors[theme].background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {
        loading &&
        <DefaultView style={styles.loader}>
            <ActivityIndicator color={Colors.primary} size={'large'} />
        </DefaultView>
      }
      <Text style={styles.title}>Add New Business</Text>
      <Text style={styles.direction}>Fill all details in order to add your business</Text>
      <TouchableOpacity onPress={pickImage } style={{marginTop: 20, width: 120}}>
        <Image source={imageUri === null ? require('../../assets/images/placeholder.png') : { uri: imageUri }} style={{ ...styles.image, borderRadius: imageUri === null ? 0 : 50 }} />
      </TouchableOpacity>
      <DefaultView>
        <TextInput
          placeholder='Name'
          placeholderTextColor={Colors[theme].text}
          style={{ ...styles.input, backgroundColor: Colors[theme].overlay, color: Colors[theme].text }}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder='Address'
         placeholderTextColor={Colors[theme].text}
          style={{ ...styles.input, backgroundColor: Colors[theme].overlay, color: Colors[theme].text }}
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          placeholder='Contact'
         placeholderTextColor={Colors[theme].text}
          style={{ ...styles.input, backgroundColor: Colors[theme].overlay, color: Colors[theme].text }}
          value={contact}
          onChangeText={setContact}
        />
        <TextInput
          placeholder='Website' 
         placeholderTextColor={Colors[theme].text}
          style={{ ...styles.input, backgroundColor: Colors[theme].overlay, color: Colors[theme].text }}
          value={website}
          onChangeText={setWebsite}
        />
        <TextInput
          placeholder='About'
          placeholderTextColor={Colors[theme].text}
          style={{ ...styles.input, backgroundColor: Colors[theme].overlay, color: Colors[theme].text,  textAlignVertical: 'top' }}
          value={about}
          onChangeText={setAbout}
          multiline
          numberOfLines={5}
        />
        <DefaultView style={styles.input}>
          <RNPickerSelect
          onValueChange={(value) => setCategory(value)}
            items={categoryList}
              placeholder={{ label: 'Education', value: 'Education' }}
              style={
                {
                  placeholder: { color: Colors[theme].text },
                  inputAndroid: { color: Colors[theme].text },
                  chevron: {backgroundColor: Colors[theme].text}
                }
              }
        />
        </DefaultView>
      </DefaultView>
      <TouchableOpacity style={styles.button} onPress={uploadData} disabled={loading}>
        <Text style={styles.buttonText}>Add New Business</Text>
        </TouchableOpacity>
      </ScrollView>
   </KeyboardAvoidingView>
 
  )
}

export default newBusiness

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontFamily: 'OutfitBold',
    fontSize: 25
  },
  direction: {
    fontFamily: 'OutfitRegular',
    color: Colors.gray
  },
  image: {
    width: 100,
    height: 100
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    fontSize: 17,
    marginTop: 10,
    fontStyle: 'OutfitRegular'
  },
  button: {
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginTop :20
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontFamily : 'OutfitMedium'
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 50
  }
})
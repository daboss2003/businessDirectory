import { FlatList, Image, StyleSheet, TextInput, ToastAndroid, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Text } from '../Themed';
import Colors from '../../constants/Colors';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { fireDB } from '../../config/firebaseConfig';
import { useUser } from '@clerk/clerk-expo';

const Review = ({ reviews, Id, ratings }) => {
    const [rating, setRating] = useState(0);
    const theme = useColorScheme() ?? 'light'
    const [input, setInput] = useState('');
    const {user} = useUser()

    async function submitReview() {
        const docRef = doc(fireDB, 'BusinessList', Id)
        await updateDoc(docRef, {
            reviews: arrayUnion({
                rating: rating,
                comment: input,
                userName: user?.firstName + user?.lastName,
                userImage: user?.imageUrl,
                userEmail: user?.emailAddresses[0]?.emailAddress
            }),
            ratings: ratings || 0 + rating,
        });
        ToastAndroid.showWithGravity('Comment Added Successfully !', 10, ToastAndroid.TOP);
        setInput('')
    }
    return (
        <View
            style={{ ...styles.container, backgroundColor: Colors[theme].overlay}}
        >
            <Text style={styles.text}>Reviews</Text>
            <StarRating
                rating={rating}
                onChange={setRating}
                style={{ paddingVertical: 10 }}
                starSize={24}
            /> 
            <TextInput
                placeholder='Write your comment'
                pointerEvents={Colors[theme].text}
                style={{ ...styles.inputStyle, color: Colors[theme].text }}
                numberOfLines={4}
                value={input}
                onChangeText={setInput}
            /> 
            <TouchableOpacity
                style={styles.button}
                disabled={input.length < 5}
                onPress={submitReview}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <FlatList
                data={reviews}
                keyExtractor={item => item.comment + new Date().toString()}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <Image source={{ uri: item.userImage }} style={styles.image} />
                        <View style={styles.textCommentContainer}>
                            <Text style={styles.username}>{item.userName}</Text>
                            <StarRatingDisplay rating={item.ratings} starSize={24} style={{alignItems: 'flex-start'}} />
                            <Text>{ item.comment}</Text>
                       </View>
                    </View>
                )}
            />
      </View>
    
  )
}

export default Review

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    text: {
        fontFamily: 'OutfitBold',
        fontSize: 20
    },
    inputStyle: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        borderColor: Colors.gray,
        textAlignVertical: 'top'
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 6,
        marginTop: 10
    },
    buttonText: {
        fontFamily: 'OutfitRegular',
        color: '#fff',
        textAlign: 'center'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 15,
        marginTop: 10
    },
    textCommentContainer: {
        gap: 5,
        alignItems: 'center'
    },
    username: {
        fontFamily: 'OutfitMedium'
    }
})
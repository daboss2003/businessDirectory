import { FlatList, Image, Linking, Share, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native'
import React from 'react';
import { Text } from '../Themed';
import Colors from '../../constants/Colors';

const ActionButtons = ({ contact, address, website, name }) => {
    const theme = useColorScheme() ?? 'light'
    const actions = [
        {
            id: 1,
            name: 'Call',
            icon: require('../../assets/images/call.png'),
            url: 'tel:' + contact
        },
        {
            id: 2,
            name: 'Location',
            icon: require('../../assets/images/pin.png'),
            url: 'https://www.google.com/maps/search/?api=1&query=' + address
        },
        {
            id: 3,
            name: 'Web',
            icon: require('../../assets/images/web.png'),
            url: website
        },
        {
            id: 4,
            name: 'Share',
            icon: require('../../assets/images/share.png'),
            url: website
        },
    ];

    function openMyUrl(item) {
        if (item.name === 'Share') {
            Share.share(
                {
                    message: name + "\n Address:" + address + "\n Find more details on Business Directory App by Daboss" ,
                    
                }
            )
        }
        else {
            Linking.openURL(item.url)
        }
    }
  return (
    <View
        style={{ backgroundColor:Colors[theme].overlay }}
    >
        <FlatList
              data={actions}
              keyExtractor={item => item.id}
              numColumns={4}
              scrollEnabled={false}
              columnWrapperStyle={{justifyContent :'space-between', padding: 15}}
              renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => openMyUrl(item)}>
                      <Image source={item.icon} style={styles.icons} />
                      <Text style={styles.name}>{ item.name}</Text>
                  </TouchableOpacity>
              )}
        />
    </View>
  )
}

export default ActionButtons

const styles = StyleSheet.create({
    icons: {
        width: 50,
        height: 50
    },
    name: {
        fontFamily: 'OutfitMedium',
        textAlign: 'center',
        marginTop: 3
    }
})
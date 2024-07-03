import { ActivityIndicator, Dimensions, FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { Text } from '../Themed'
import ExploreBusinessItem from './ExploreBusinessItem'

const {height} = Dimensions.get('window')

const ExploreBusinessList = ({ business, loading }) => {
    
    if (loading) {
    return <ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} size={'large'} color={Colors.primary} />
  }
  return (
    <View style={{flex: 1}}>
          <FlatList
              data={business}
              keyExtractor={item => item.id}
              style={styles.flatList}
              renderItem={({ item }) => (<ExploreBusinessItem business={item} />)}
              ListEmptyComponent={<Text style={styles.emptyListText}>No Business Found</Text>}
          />
    </View>
  )
}

export default ExploreBusinessList

const styles = StyleSheet.create({
    emptyListText: {
        fontSize: 20,
        fontFamily: 'OutfitBold',
        color: Colors.gray,
        textAlign: 'center',
        marginTop: '50%'
  },
  flatList: {
    paddingBottom: height / 2
  }
})
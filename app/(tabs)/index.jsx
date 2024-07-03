import { View } from '../../components/Themed'
import React from 'react'
import Header from '../../components/HomeScreen/Header';
import Slider from '../../components/HomeScreen/Slider'
import Category from '../../components/HomeScreen/Category';
import BusinessList from '../../components/HomeScreen/BusinessList';
import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function home() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style='dark' />
      <ScrollView>
        <Header />
        <Slider />
        <Category />
        <BusinessList />
        <View style={{ paddingBottom: 100}}></View>
      </ScrollView>
    </View>
  )
}
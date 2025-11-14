import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeEBookInsideCom from '../../Components/HomeEBookInsideCom'
import Colors from '../../Constants/Colors';

const HomeEBookInside = ({route}) => {
  const { data } = route?.params;
  return (
    <View style={{flex:1,backgroundColor:Colors.White}}>
      <HomeEBookInsideCom data={data}/>
    </View>
  )
}

export default HomeEBookInside

const styles = StyleSheet.create({})
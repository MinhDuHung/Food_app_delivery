import { StyleSheet, ScrollView, TextInput, Image, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { CUS_ORANGE } from '../assets/colors'
import Catagories from '../components/Catagories'
import Popular from '../components/Popular'
import Recommended from '../components/Recommended'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {  useSelector } from 'react-redux'

const Home = ({ openBottomSheet, navigation, setScreen }) => {

  const [currentCatagory, setCurrentCatagory] = useState('Fast food')
  const user = useSelector((state) => state.userReducer);
  return (
    <View
      style={{ flex: 10 }}
    >
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menu}
          onPress={() => navigation.openDrawer()}>
          <Image source={require('../assets/icons/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Home</Text>
        <Image source={require('../assets/images/profile.png')}
          style={styles.menu} />
      </View>

      {/* body */}
      <View style={styles.body}>
        <ScrollView>

          {/* search part */}
          <TouchableOpacity
            onPress={() => setScreen('search')}
            style={styles.search}
          >
            <Text>search food</Text>
          </TouchableOpacity>
          <Entypo
            name='magnifying-glass' style={styles.searchIcon} size={30} color={'black'} />
          <Ionicons
            onPress={() => {
              openBottomSheet()
            }}
            name='filter' size={25} color={'black'} style={styles.filterIcon}
          />


          <Text style={styles.location_title}>DELIVERY TO</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <Text style={styles.location}>100 Tran Duy Hung, Ha Noi, Viet Nam</Text>
            <Entypo name='chevron-down' size={30} color={CUS_ORANGE} />
          </View>

          <View style={{ height: 50, marginTop: 10, marginBottom: 20 }}>
            <Catagories currentCatagory={currentCatagory} setCurrentCatagory={setCurrentCatagory} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 15 }}>
            <Text style={styles.location}>Popular Near You</Text>
            <Text style={styles.location_title}>Show ALL</Text>
          </View>
          <Popular currentCatagory={currentCatagory} navigation={navigation} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 15 }}>
            <Text style={styles.location}>Recommended</Text>
            <Text style={styles.location_title}>Show ALL</Text>
          </View>
          <Recommended currentCatagory={currentCatagory} navigation={navigation} />
          
        </ScrollView>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  overlay: {
    height: '100%',
    width: '100%', position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  location_title: {
    color: CUS_ORANGE,
    fontFamily: 'Poppins-Regular',
  },
  location: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
  },
  filterIcon: {
    right: 30, top: 10,
    position: 'absolute',
  },
  searchIcon: {
    position: 'absolute',
    left: 15, top: 10,
  },
  search: {
    backgroundColor: '#F5F5F8',
    borderRadius: 10, paddingHorizontal: 60,
    marginRight: 15, marginBottom: 20,
    height: 50, justifyContent:'center'
  },
  body: {
    flex: 9,
    backgroundColor: 'white', paddingTop: 10,
    paddingLeft: 15
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20, color: 'black'
  },
  menu: {
    height: 40, width: 40, borderWidth: 1,
    borderRadius: 10, justifyContent: 'center',
    alignItems: 'center', borderColor: 'gray'
  },
  header: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row', paddingHorizontal: 15
  }
})
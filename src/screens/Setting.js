import { StyleSheet, ScrollView, Text, TouchableOpacity, Image, View } from 'react-native'
import React from 'react'
import SettingOptions from '../components/SettingOptions'

const Setting = ({ navigation }) => {
  return (
    <View style={{ flex: 10, backgroundColor: 'white' }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menu}
          onPress={() => navigation.goBack()}>
          <Image style={{ height: 30, width: 30, }} source={require('../assets/icons/back.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ height: 40, width: 40, }} />
      </View>
      <View style={styles.body}>
        <SettingOptions name={'Change Password'} iconName={'lock'} />
        <SettingOptions name={'Preferences'} iconName={'list'} />
        <SettingOptions name={'Notifications'} iconName={'bell'} />
        <TouchableOpacity onPress={() => navigation.navigate('purchasingStat')}>
          <SettingOptions name={'Data use'} iconName={'bar-graph'} />
        </TouchableOpacity>
        <SettingOptions name={'Language'} iconName={'globe'} />
        <SettingOptions name={'Check Update'} iconName={'cycle'} />
        <SettingOptions name={'Contact Us'} iconName={'phone'} />
        <SettingOptions name={'Privacy Policy'} iconName={'lock'} />
        <SettingOptions name={'Terms & Conditions'} iconName={'sports-club'} />
        <SettingOptions name={'Logout'} iconName={'align-right'} />
      </View>
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  body: {
    flex: 9, marginHorizontal: '10%', width: '90%',
    backgroundColor: '#F5F5F8', alignSelf: 'center',
    borderRadius: 15, paddingHorizontal: 20,
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
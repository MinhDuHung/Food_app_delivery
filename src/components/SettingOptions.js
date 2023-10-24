import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { CUS_ORANGE } from '../assets/colors'
const SettingOptions = ({ name, iconName }) => {
    return (
        <View style={styles.container}>
            <Entypo name={iconName} size={20} color={CUS_ORANGE} />
            <Text style={styles.name}>{name}</Text>
        </View>
    )
}

export default SettingOptions

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20, borderBottomWidth: 0.5,
        height: 65, borderBottomColor: 'gray'
    },
    name: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14, color: 'black',
    }
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CUS_ORANGE } from '../assets/colors'
const BottomTab = ({ screen, setScreen }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setScreen('home')}
                style={[
                    styles.box,
                    { backgroundColor: screen == 'home' ? CUS_ORANGE : 'white' },
                    { width: screen == 'home' ? 140 : 30, }
                ]}
            >
                <Entypo name='home' size={20} color={screen == 'home' ? 'white' : 'gray'} />
                {
                    screen == 'home' ?
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Home</Text>
                        : <></>
                }
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setScreen('search')}
                style={[
                    styles.box,
                    { backgroundColor: screen == 'search' ? CUS_ORANGE : 'white' },
                    { width: screen == 'search' ? 140 : 30, }
                ]}
            >
                <Entypo name='magnifying-glass' size={20} color={screen == 'search' ? 'white' : 'gray'} />
                {
                    screen == 'search' ?
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Search</Text>
                        : <></>
                }
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setScreen('cart')}
                style={[
                    styles.box,
                    { backgroundColor: screen == 'cart' ? CUS_ORANGE : 'white' },
                    { width: screen == 'cart' ? 140 : 30, }
                ]}
            >
                <Entypo name='shopping-bag' size={20} color={screen == 'cart' ? 'white' : 'gray'} />
                {
                    screen == 'cart' ?
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Cart</Text>
                        : <></>
                }
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setScreen('favourite')}
                style={[
                    styles.box,
                    { backgroundColor: screen == 'favourite' ? CUS_ORANGE : 'white' },
                    { width: screen == 'favourite' ? 140 : 30, }
                ]}
            >
                <Entypo name='heart-outlined' size={20} color={screen == 'favourite' ? 'white' : 'gray'} />
                {
                    screen == 'favourite' ?
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Favourite</Text>
                        : <></>
                }
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setScreen('notification')}
                style={[
                    styles.box,
                    { backgroundColor: screen == 'notification' ? CUS_ORANGE : 'white' },
                    { width: screen == 'notification' ? 140 : 30, }
                ]}
            >
                <Entypo name='bell' size={20} color={screen == 'notification' ? 'white' : 'gray'} />
                {
                    screen == 'notification' ?
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Notification</Text>
                        : <></>
                }
            </TouchableOpacity>
        </View>
    )
}

export default BottomTab

const styles = StyleSheet.create({
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '60%', margin: 0, padding: 0,
        borderRadius: 20, flexDirection: 'row', gap: 10,
    },
    container: {
        flex:1,
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: 70, paddingHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', gap: 15
    }
})
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { CUS_ORANGE } from '../assets/colors'

const Catagories = ({ currentCatagory, setCurrentCatagory }) => {
    const catagories = [
        {
            logo: require('../assets/icons/burger.png'),
            name: 'Fast food'
        },
        {
            logo: require('../assets/icons/cherry.png'),
            name: 'Fruit Item',
        },
        {
            logo: require('../assets/icons/rice.png'),
            name: 'Drinks'
        },

    ]

    function renderItem({ item }) {
        return (
            <TouchableOpacity
                onPress={() => setCurrentCatagory(item.name)}
                style={[styles.box, { backgroundColor: currentCatagory === item.name ? CUS_ORANGE : '#F5F5F8' }]}>
                <Image source={item.logo} style={styles.logo} />
                <Text style={[styles.name, { color: currentCatagory === item.name ? 'white' : 'gray' }]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View>
            <FlatList
                data={catagories}
                keyExtractor={item => item.name}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default Catagories

const styles = StyleSheet.create({
    logo: {
        height: 50, width: 50
    },
    box: {
        height: 50, width: 150,
        borderRadius: 10, justifyContent: 'center',
        alignItems: 'center', flexDirection: 'row',
        marginRight: 10, elevation:10,
    },
    name: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15
    }
})
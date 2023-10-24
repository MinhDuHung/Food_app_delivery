import { StyleSheet, Text, TouchableOpacity, Easing, Image, Animated, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { CUS_ORANGE } from '../assets/colors'
import { findItemByCategoryApi } from '../api/itemApi'
const { width, height } = Dimensions.get('window')
import axios from 'axios';
const Popular = ({ currentCatagory, navigation }) => {
    const [data, setData] = useState([])
    const findItemByCategory = async () => {
        try {
            const response = await axios.get(findItemByCategoryApi, {
                params: {
                    category: currentCatagory.toLowerCase().replace(/\s+/g, '')
                }
            });
            setData(response.data.item)

        } catch (error) {
            console.error('Error getting items data:', error);
            throw error;
        }
    }

    useEffect(() => {
        findItemByCategory()
    }, [currentCatagory])

    const rotate = new Animated.Value(0)
    const useAnimated = () => {
        rotate.setValue(0)
        Animated.timing(rotate, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.linear
        }).start(() => useAnimated())
    }
    useEffect(() => {
        useAnimated()
    }, [])
    const rotation = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    function renderItem({ item }) {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('foodDetail', { item: item })}
                style={[styles.box]}>
                <View style={styles.headerItem}>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Image style={styles.calories} source={require('../assets/icons/calories.png')} />
                        <Text style={styles.caloriesText}>{item.calories} Calories</Text>
                    </View>

                    <Entypo name='heart' size={20} color={CUS_ORANGE} />
                </View>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <Text
                    numberOfLines={item.description.length > 30 ? 1 : 0}
                    style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>{item.price}$</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ marginBottom: 20, marginTop: 10, }}>
            {
                data.length > 0 ?
                    <FlatList
                        data={data}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                        horizontal
                    />
                    :
                    <Animated.View style={[styles.heart, { transform: [{ rotate: rotation }] }]}>
                        <AntDesign name='loading1' size={30} color={CUS_ORANGE} />
                    </Animated.View>
            }

        </View>
    )
}

export default Popular

const styles = StyleSheet.create({
    heart: {
        height: 100, width: 100, alignSelf: 'center',
        justifyContent: 'center', alignItems: 'center'
    },
    headerItem: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    calories: {
        height: 25, width: 25,
    },
    caloriesText: {
        fontSize: 12,
    },
    image: {
        width: 140,
        height: 140, borderRadius: 20,
        alignSelf: 'center',
    },
    box: {
        height: height / 3, width: width * 0.5,
        borderRadius: 10, paddingTop: 10,
        marginRight: 10, backgroundColor: '#F5F5F8',
        elevation: 5,
    },
    name: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15, color: 'black', alignSelf: 'center'
    },
    description: {
        fontFamily: 'Poppins-Italic',
        fontSize: 10, alignSelf: 'center', textAlign: 'center'
    },
    price: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20, color: 'black', alignSelf: 'center'
    }
})
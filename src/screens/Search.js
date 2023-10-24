import { StyleSheet, TouchableOpacity, Image, Text, View, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { TextInput } from 'react-native-gesture-handler'
import { CUS_ORANGE, CUS_YELLOW } from '../assets/colors'
import axios from 'axios'
import { findAllItemApi, findItemsByNameApi } from '../api/itemApi'
const { width, height } = Dimensions.get('window')
const Search = ({navigation}) => {
    const [data, setData] = useState([])

    const [input, setInput] = useState('')

    async function findItems() {
        try {
            const respone = await axios.get(findItemsByNameApi, {
                params: {
                    name: input
                }
            })
            setData(respone.data.items)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    useEffect(() => {
        findItems()
    }, [input])

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('foodDetail', { item: item })}
                style={[styles.item]}>

                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ width: '50%', paddingLeft: 10, }}>
                    <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
                    <Text
                        numberOfLines={item.description.length > 30 ? 1 : 1}
                        style={styles.description}>{item.description}
                    </Text>
                    <Text style={styles.price}>{item.price}$</Text>
                </View>
                <View style={styles.headerItem}>
                    <View style={{ flexDirection: "row", }}>
                        <Image style={styles.calories} source={require('../assets/icons/calories.png')} />
                        <Text style={styles.caloriesText}>{item.calories} Calories</Text>
                    </View>
                    <Entypo style={styles.heart} name='heart' size={20} color={CUS_ORANGE} />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput
                    onPress={() => setScreen('search')}
                    style={styles.search}
                    placeholder='Search your food or restaurant'
                    value={input}
                    onChangeText={text => setInput(text)}
                >
                </TextInput>
                <Entypo
                    name='magnifying-glass' style={styles.searchIcon} size={30} color={'black'} />
            </View>
            <View style={styles.body}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ gap: 10 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default Search


const styles = StyleSheet.create({
    item: {
        height: 80, width: width * .9,
        backgroundColor: CUS_YELLOW, borderRadius: 15,
        elevation: 3, alignItems: 'center', paddingHorizontal: 10,
        flexDirection: 'row'
    },
    body: {
        flex: 9,
    },
    header: {
        paddingTop: 20, flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    searchIcon: {
        position: 'absolute',
        left: 30, top: 30,
    },
    search: {
        backgroundColor: 'white', width: '90%',
        borderRadius: 10, paddingHorizontal: 50,
        height: 50, justifyContent: 'center'
    },
    heart: {
        marginLeft: 5
    },
    headerItem: {
    },
    calories: {
        height: 25, width: 25,
    },
    caloriesText: {
        fontSize: 12,
        color: 'white'
    },
    image: {
        width: 70,
        height: 70, borderRadius: 10,
    },
    name: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14, color: 'black',
    },
    description: {
        fontFamily: 'Poppins-Italic', maxWidth: 150,
        fontSize: 10, textAlign: 'center'
    },
    price: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14, color: 'black',
    }

})
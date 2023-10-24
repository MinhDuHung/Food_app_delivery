import { StyleSheet, Image, Dimensions, TouchableOpacity, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CUS_ORANGE } from '../assets/colors'
import { findOneRestaurantApi } from '../api/restaurant'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { addOrder } from '../redux/actions/ordersAction'

const { width, height } = Dimensions.get('window')
const FoodDetail = ({ navigation, route }) => {

    //redux thunk
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orderReducer);

    //detail data of chosen item
    const item = route.params.item

    //default value
    const [size, setSize] = useState(0)
    const [restaurant, setRestaurant] = useState()
    const sizeData = [
        '12"', '14"', '16"', '18"'
    ]
    const starData = [
        1, 2, 3, 4, 5
    ]
    const [quantity, setQuantity] = useState(1)

    function handleQuantity(number) {
        if (quantity <= 9 && number == 1) {
            setQuantity(quantity + 1)
        }

        else if (quantity > 1 && number == -1) {
            setQuantity(quantity - 1)
        }
    }

    //find restaurant by id which sell this food
    const findOneRestaurant = async () => {
        try {
            const response = await axios.get(findOneRestaurantApi, {
                params: {
                    id: item.restaurantId
                }
            });
            setRestaurant(response.data.restaurant)

        } catch (error) {
            console.error('Error getting restaurant data:', error);
            throw error;
        }
    }
    useEffect(() => {
        findOneRestaurant()
    }, [])

    //handle click buy now
    function handleBuyNow() {

        //create new obj for adding to redux
        const newOrder = {
            index: orders.orders.length + 1,
            calories: item.calories,
            category: item.category,
            description: item.description,
            id: item.id,
            image: item.image,
            name: item.name,
            price: item.price,
            rate: item.rate,
            rate_count: item.rate_count,
            restaurantId: item.restaurantId,
            quantity: quantity,
        };
        dispatch(addOrder(newOrder));
        navigation.navigate('orders')
    }


    return (
        <View style={{ flex: 10 }}>

            {/* header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.menu}
                    onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backIcon}
                        source={require('../assets/icons/back.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Details</Text>
                <TouchableOpacity style={styles.cartBox}
                    onPress={() => navigation.navigate('cart')}>
                    <Image
                        source={require('../assets/icons/cart.png')}
                        style={styles.cartIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* body */}
            <View style={styles.body}>
                <ScrollView>

                    <View style={[styles.box]}>
                        <View style={styles.headerItem}>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <Image style={styles.calories} source={require('../assets/icons/calories.png')} />
                                <Text style={styles.caloriesText}>{item.calories} Calories</Text>
                            </View>
                            <Entypo name='heart' size={20} color={CUS_ORANGE} />
                        </View>
                        <Image source={{ uri: item.image }} style={styles.image} />
                    </View>

                    <Text style={styles.name}>{item.name}</Text>

                    <Text style={styles.description}>{item.description}</Text>

                    <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: "space-between" }}>
                        <View style={styles.starBox}>
                            <Image style={{ height: 15, width: 15, }} source={require('../assets/icons/star.png')} />
                            <Text style={{ color: 'white' }}>{item.rate}</Text>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                            <MaterialCommunityIcons name='clock-time-eight-outline'
                                size={20} color={'black'}
                            />
                            <Text style={styles.text}>30 Mins</Text>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                            <MaterialCommunityIcons name='currency-usd'
                                size={20} color={'black'}
                            />
                            <Text style={styles.text}>Free Shipping</Text>
                        </View>
                    </View>
                    <View style={styles.sizeZone}>
                        <Text style={styles.sizeText}>Sizes:</Text>
                        <View style={{ flexDirection: 'row', gap: 15 }}>
                            {
                                sizeData.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => { setSize(index) }}
                                            style={[styles.size, { backgroundColor: index === size ? CUS_ORANGE : 'white' }]}
                                            key={index}>
                                            <Text style={{ color: index === size ? 'white' : 'black' }}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <TouchableOpacity style={styles.restaurant}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../assets/images/profile.png')}
                                style={styles.menu}
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={styles.res_name}>{restaurant?.name}</Text>
                                <Text style={styles.distance}>{restaurant?.distance} km from you</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {
                                starData.map((item, idx) => {
                                    return (
                                        <Entypo
                                            key={idx}
                                            name='star' size={20} color={item <= restaurant?.rate ? '#FFA230' : '#FFDAAE'} />
                                    )

                                })
                            }
                        </View>
                    </TouchableOpacity>
                </ScrollView>

            </View>

            {/* footer */}
            <View style={styles.footer}>
                <View style={styles.leftBox}>
                    <Entypo onPress={() => handleQuantity(-1)} name='minus' size={30} color={'gray'} />
                    <Text style={styles.title}>{quantity}</Text>
                    <Entypo onPress={() => handleQuantity(1)} name='plus' size={30} color={CUS_ORANGE} />
                </View>
                <TouchableOpacity
                    onPress={() => { handleBuyNow() }}
                    style={styles.rightBox}>
                    <Text style={styles.textRightBox}>Buy now</Text>
                    <Text style={styles.textRightBox}>{parseFloat(item.price * quantity).toFixed(2)}$</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default FoodDetail

const styles = StyleSheet.create({
    textRightBox: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16, color: 'white',
    },
    rightBox: {
        flexDirection: 'row', paddingHorizontal: 10,
        backgroundColor: CUS_ORANGE, borderRadius: 10,
        height: 50, width: 200, justifyContent: 'space-between',
        alignItems: "center",
    },
    leftBox: {
        flexDirection: 'row', gap: 15,
        backgroundColor: '#F5F5F8', borderRadius: 10,
        height: 50, width: 120, justifyContent: 'center',
        alignItems: "center",
    },
    res_name: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14, color: 'black'
    },
    distance: {
        fontFamily: 'Poppins-Italic',
        fontSize: 13, color: 'black'
    },
    menu: {
        height: 40, width: 40, borderWidth: 1,
        borderRadius: 10, justifyContent: 'center',
        alignItems: 'center', borderColor: 'gray',
    },
    restaurant: {
        height: 100, width: '110%', borderTopWidth: .2, borderBottomColor: 'gray',
        borderTopColor: 'gray', borderBottomWidth: .2, left: -20,
        marginTop: 20, paddingHorizontal: 20, alignItems: 'center',
        flexDirection: 'row', justifyContent: 'space-between'
    },
    sizeText: {
        height: 30, width: 100,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16, color: 'black',
    },
    sizeZone: {
        flexDirection: 'row', alignItems: 'center',
        marginTop: 20,
    },
    size: {
        height: 50, width: 50, borderRadius: 10,
        borderWidth: 0.5, borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Poppins-Italic',
        fontSize: 14, color: 'black', alignSelf: 'center'
    },
    starBox: {
        height: 30, width: 70, justifyContent: 'center',
        alignItems: 'center', gap: 10,
        flexDirection: 'row', borderRadius: 10,
        backgroundColor: CUS_ORANGE,
    },
    description: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14, marginLeft: 5
    },
    headerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    calories: {
        height: 25, width: 25
    },
    caloriesText: {
        fontSize: 12,
    },
    image: {
        width: 200,
        height: 160, borderRadius: 20,
        alignSelf: 'center',
    },
    box: {
        height: height / 3.8, width: width * 0.9, alignSelf: 'center',
        borderRadius: 10, paddingTop: 10, paddingHorizontal: 15,
        backgroundColor: '#F5F5F8',
    },
    name: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24, color: 'black', marginTop: 15, marginLeft: 5,
    },
    price: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20, color: 'black', alignSelf: 'center'
    },
    cartIcon: {
        width: 20, height: 20
    },
    backIcon: {
        width: 25, height: 25
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20, color: 'black'
    },
    cartBox: {
        height: 40, width: 40,
        borderRadius: 10, justifyContent: 'center',
        alignItems: 'center', backgroundColor: '#FDDFD5'
    },
    menu: {
        height: 40, width: 40, borderWidth: 1,
        borderRadius: 10, justifyContent: 'center',
        alignItems: 'center', borderColor: 'gray'
    },
    body: {
        flex: 7.5, backgroundColor: "white", paddingHorizontal: 15,
    },
    footer: {
        flex: 1.5, flexDirection: 'row',
        backgroundColor: 'white', justifyContent: 'space-around',
        alignItems: 'center'
    },
    header: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row', paddingHorizontal: 20
    }
})
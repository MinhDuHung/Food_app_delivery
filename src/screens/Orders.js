import { StyleSheet, Image, Alert, Modal, TouchableOpacity, Text, View, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { CUS_ORANGE } from '../assets/colors'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'
import { BlurView } from '@react-native-community/blur'
import { useDispatch, useSelector } from 'react-redux'
import { addOrder, changeQuantity, deleteAllOrders, deleteOneOrder } from '../redux/actions/ordersAction'
import { getMaxOrderIdApi, placeOrdersApi } from '../api/orders'
const { format } = require('date-fns');
import axios from 'axios';
import { notificationPlaceOrdersApi } from '../api/notification'
const Orders = ({ navigation }) => {

    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orderReducer);
    const currentUser = useSelector((state) => state.userReducer);

    const data = orders.orders

    //delete one order in redux thunk by index
    const RightActions = (orderIndex) => {
        return (
            <TouchableOpacity
                onPress={() => { dispatch(deleteOneOrder(orderIndex)) }}
                style={styles.rightActionContainer}>
                <FontAwesome name='trash-o' size={35} color={'white'} />
            </TouchableOpacity>
        );
    }

    //
    function handleQuantity(number, index, quantity) {

        //max quantity is 10
        if (quantity <= 9 && number == 1) {
            dispatch(changeQuantity(index, quantity + 1));
        }

        //min quantity is 1
        else if (quantity >= 2 && number == -1) {
            dispatch(changeQuantity(index, quantity - 1));
        }
    }

    const [total, setTotal] = useState(0)
    const [isShowModal, setIsShowModal] = useState(false)
    const [shippingFee, setShippingFee] = useState(5)

    //total of all items
    function totalFunction() {
        let x = 0;
        for (let i = 0; i < data.length; i++) {
            x += data[i].quantity * data[i].price
        }
        setTotal(x)
    }

    //reset total whenever data is changed
    useEffect(() => {
        totalFunction()
    }, [data])

    const [id, setID] = useState(0)
    //get max order id in db to + 1
    async function getID() {
        try {
            const response = await axios.get(getMaxOrderIdApi, {
                params: {
                }
            });
            setID(response.data.id)
        } catch (error) {
            console.error('Error getting orders data:', error);
            throw error;
        }
    }
    useState(() => {
        getID()
    }, [])

    //handle click place orders
    async function handlePlaceOrders() {
        const userId = currentUser.id
        let tempId = id;

        //each items in data will be distributed to order table
        for (let i = 0; i < data.length; i++) {
            const itemId = data[i].id
            const currentDate = new Date();
            const date = format(currentDate, 'yyyy-MM-dd');
            const status = 'Preparing'
            const quantity = data[i].quantity

            //id in DB ++
            tempId++;
            try {
                const response = await axios.post(placeOrdersApi, {
                    id: tempId,
                    userId,
                    itemId,
                    date,
                    status,
                    quantity
                });
                if (response.status === 201) {
                    Alert.alert('Your orders are placed successfully!')
                    setIsShowModal(false)
                    dispatch(deleteAllOrders())
                    navigation.navigate('sidebar')
                }
            } catch (error) {
                console.error('error adding order ', error);
            }
        }

        //reset id with new value
        setID(tempId);

        //push notification to user for purchasing successfully
        for (let i = 0; i < data.length; i++) {
            const content = `Your order : ${data[i].name} with final total : ${data[i].price * data[i].quantity}$ has just been placed successfully in ${date}`
            const title = 'YOUR ORDER WAS PLACED SUCCESSFULLY!'
            const currentDate = new Date();
            const date = format(currentDate, 'yyyy-MM-dd');
            const status = 'no'
            try {
                const response = await axios.post(notificationPlaceOrdersApi, {
                    userId,
                    title,
                    content,
                    status,
                    date
                });
                if (response.status === 201) {

                }
            } catch (error) {
                console.error('error adding notification ', error);
            }
        }

    }

    
    function renderItem({ item }) {
        return (
            <View style={styles.retangle}>
                <Swipeable
                    renderRightActions={() => RightActions(item.index)}
                >
                    <View style={styles.box}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>{item.price * item.quantity}</Text>
                        </View>
                        <View style={styles.leftBox}>
                            <Entypo
                                onPress={() => handleQuantity(-1, item.index, item.quantity)}
                                name='minus' size={25} color={'gray'} />
                            <Text style={styles.number}>{item.quantity}</Text>
                            <Entypo
                                onPress={() => handleQuantity(1, item.index, item.quantity)}
                                name='plus' size={25} color={CUS_ORANGE} />
                        </View>

                    </View>

                </Swipeable>
            </View>
        )
    }

    return (
        <View style={{ flex: 10, backgroundColor: 'white' }}>

            {/* header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.menu}
                    onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backIcon}
                        source={require('../assets/icons/back.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>My Orders</Text>
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
                <GestureHandlerRootView>
                    <FlatList
                        data={data}
                        keyExtractor={item => item.index.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ gap: 20 }}
                    />
                </GestureHandlerRootView>
            </View>

            {/* footer */}
            <View
                style={[styles.footer, styles.shadow]}>
                <View style={styles.subtotal}>
                    <View style={styles.child}>
                        <Text style={styles.left}>Subtotal: </Text>
                        <Text style={styles.right}>${total} </Text>
                    </View>
                    <View style={styles.child}>
                        <Text style={styles.left}>Shipping free: </Text>
                        <Text style={styles.right}>${shippingFee}</Text>
                    </View>
                </View>
                <View style={styles.child}>
                    <Text style={styles.total}>Total: </Text>
                    <Text style={styles.total}>${total + shippingFee} </Text>
                </View>
                <TouchableOpacity
                    onPress={() => setIsShowModal(true)}
                    style={styles.rightBox}>
                    <Text style={styles.textRightBox}>Place Your Orders</Text>
                </TouchableOpacity>
            </View>

            {/* modal confirm placing */}
            <Modal visible={isShowModal}
                animationType='fade'
                transparent={true}
                onRequestClose={() => setIsShowModal(!isShowModal)}
            >
                <View style={styles.modal}>
                    <View style={styles.boxModal}>
                        <Text style={styles.confirm}>Are you sure to place these orders</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', }}>
                            <TouchableOpacity
                                style={[styles.options, { backgroundColor: CUS_ORANGE }]}
                                onPress={() => { handlePlaceOrders() }}>
                                <Text style={[styles.optionsText, { color: 'white' }]}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.options, { backgroundColor: 'white' }]}
                                onPress={() => setIsShowModal(false)}>
                                <Text style={[styles.optionsText, { color: CUS_ORANGE }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    )
}

export default Orders

const styles = StyleSheet.create({
    optionsText: {
        fontSize: 18, fontFamily: 'Poppins-Black',
    },
    options: {
        height: 40, width: 120,
        justifyContent: "center", alignItems: 'center',
        borderRadius: 10
    },
    boxModal: {
        paddingHorizontal: 10, backgroundColor: 'white',
        paddingVertical: 20, gap: 15,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 20, width: '90%',
    },
    confirm: {
        color: 'red',
        fontSize: 18, fontFamily: 'Poppins-Bold',
    },
    modal: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    total: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18, color: 'black',
        marginHorizontal: 20, marginTop: 20,
        marginBottom: 40
    },
    textRightBox: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16, color: 'white',
    },
    rightBox: {
        flexDirection: 'row', paddingHorizontal: 10,
        backgroundColor: CUS_ORANGE, borderRadius: 10,
        height: 50, width: '90%', justifyContent: 'center',
        alignItems: "center",
    },
    child: {
        flexDirection: 'row', justifyContent: 'space-between',
        width: '100%',
    },
    right: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14, color: 'black'
    },
    left: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14, color: 'black'
    },
    subtotal: {
        height: '40%', width: '100%', justifyContent: 'center',
        paddingHorizontal: 20, alignItems: 'center',
        borderBottomColor: 'gray', borderBottomWidth: 0.2,
    },
    name: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14, color: 'black'
    },
    price: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15, color: CUS_ORANGE
    },
    leftBox: {
        flexDirection: 'row', gap: 15,
        backgroundColor: 'white', borderRadius: 10,
        height: 40, width: 110, justifyContent: 'center',
        alignItems: "center",
    },
    number: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20, color: 'black'
    },
    image: {
        height: 70, width: 70
    },
    retangle: {
        height: 80,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    box: {
        borderRadius: 10, flexDirection: 'row',
        height: '100%', justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#F5F5F8'
    },
    rightActionContainer: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: 80,
        backgroundColor: CUS_ORANGE
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
        flex: 5.5, backgroundColor: "white", paddingHorizontal: 15,
    },
    footer: {
        flex: 3.5, borderTopRightRadius: 30,
        width: '103%', alignSelf: 'center',
        alignItems: 'center', borderTopLeftRadius: 30,
    },
    shadow: {
        elevation: 3,
    },
    header: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row', paddingHorizontal: 20
    }
})
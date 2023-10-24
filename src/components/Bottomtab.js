import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Carts from '../screens/Carts';
import Favourite from '../screens/Favourite';
import Notifications from '../screens/Notifications';
import Entypo from 'react-native-vector-icons/Entypo'
import { CUS_ORANGE } from '../assets/colors';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const Bottomtab = () => {

    // THIS COMP IS NOT USED //
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    height: 70, paddingHorizontal: 40,
                }
            }}
        >
            <Tab.Screen
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        const width = focused ? 120 : 30
                        return (
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: !focused ? 'white' : CUS_ORANGE,
                                width: width, height: '60%', margin: 0, padding: 0,
                                borderRadius: 20, flexDirection: 'row', gap: 10
                            }}>
                                <Entypo name='home' size={20} color={focused ? 'white' : 'gray'} />
                                {
                                    focused ?
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Home</Text>
                                        : <></>
                                }

                            </View>
                        )
                    }
                }}
                name="home" component={Home} />
            <Tab.Screen
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        const width = focused ? 120 : 30
                        return (
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: !focused ? 'white' : CUS_ORANGE,
                                width: width, height: '60%',
                                borderRadius: 20, flexDirection: 'row', gap: 10
                            }}>
                                <Entypo name='magnifying-glass' size={20} color={focused ? 'white' : 'gray'} />
                                {
                                    focused ?
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Search</Text>
                                        : <></>
                                }

                            </View>
                        )
                    }
                }}
                name="search" component={Search} />
            <Tab.Screen
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        const width = focused ? 120 : 30
                        return (
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: !focused ? 'white' : CUS_ORANGE,
                                width: width, height: '60%',
                                borderRadius: 20, flexDirection: 'row', gap: 10
                            }}>
                                <Entypo name='shopping-bag' size={20} color={focused ? 'white' : 'gray'} />
                                {
                                    focused ?
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Cart</Text>
                                        : <></>
                                }

                            </View>
                        )
                    }
                }}
                name="cart" component={Carts} />
            <Tab.Screen
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        const width = focused ? 120 : 30
                        return (
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: !focused ? 'white' : CUS_ORANGE,
                                width: width, height: '60%',
                                borderRadius: 20, flexDirection: 'row', gap: 10
                            }}>
                                <Entypo name='heart-outlined' size={20} color={focused ? 'white' : 'gray'} />
                                {
                                    focused ?
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Favourite</Text>
                                        : <></>
                                }

                            </View>
                        )
                    }
                }}
                name="fav" component={Favourite} />
            <Tab.Screen
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        const width = focused ? 120 : 30
                        return (
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: !focused ? 'white' : CUS_ORANGE,
                                width: width, height: '60%',
                                borderRadius: 20, flexDirection: 'row', gap: 10
                            }}>
                                <Entypo name='bell' size={20} color={focused ? 'white' : 'gray'} />
                                {
                                    focused ?
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Notification</Text>
                                        : <></>
                                }

                            </View>
                        )
                    }
                }}
                name="notification" component={Notifications} />
        </Tab.Navigator>
    )
}

export default Bottomtab
import { StyleSheet, Image, Text, View, Dimensions, Modal, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { CUS_ORANGE } from '../assets/colors'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MainLayout from '../screens/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
const Drawer = createDrawerNavigator()
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const { width, height } = Dimensions.get('window')
const CustomDrawerItems = ({ navigation, setScreen, icon, name }) => {

    const thisName = name === 'Home' ? 'home' : (
        name === 'My wallet' ? 'wallet' : (
            name === 'Notification' ? 'notification' : (
                name === 'Favourite' ? 'favourite' : (
                    name === 'Track your order' ? 'trackMap' : (
                        name === 'Coupons' ? 'coupons' : (
                            name === 'Settings' ? 'settings' : (
                                name === 'Invite a friend' ? 'invite' : (
                                    name === 'Help center' ? 'help' :
                                        'logout'
                                )
                            )
                        )
                    )
                )
            )
        )
    )
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.closeDrawer()
                if (thisName != 'home' && thisName != 'search' && thisName != 'cart' && thisName != 'favourite' && thisName != 'notification') {
                    navigation.navigate(thisName)
                }
                else
                    setScreen(thisName)
            }}
            style={styles.drawerItem}>
            <Image source={icon} style={{ height: 25, width: 25 }} />
            <Text style={styles.drawerItemName}>{name}</Text>
        </TouchableOpacity>
    )
}

//this is items in sidebar
const CustomDrawerContent = ({ setScreen, navigation }) => {

    const user = useSelector((state) => state.userReducer);

    //show or unshow alert logout
    const [modalVisible, setModalVisible] = useState(false);
    //sign out GG
    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            navigation.navigate('signin')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{
                flex: 1, paddingTop: 10,
            }}
        >
            <View style={{
                flex: 1, paddingHorizontal: 10
            }}>
                <View style={{
                    justifyContent: 'center'
                }}>
                    <AntDesign
                        onPress={() => navigation.closeDrawer()}
                        name='closecircle' size={25} color={'white'}
                    />
                </View>
                <TouchableOpacity style={{
                    flexDirection: 'row', alignItems: 'center',
                    marginTop: 10, height: 40, gap: 10,

                }}
                    onPress={() => navigation.navigate('account')}>
                    <Image style={styles.profile}
                        source={require('../assets/images/profile.png')}
                    />
                    <View>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.view}>View your profile</Text>
                    </View>
                </TouchableOpacity>

                <View style={{ marginTop: 30, gap: 20, width: '70%' }}>
                    <CustomDrawerItems setScreen={setScreen} navigation={navigation} icon={require('../assets/icons/home.png')} name={'Home'} />
                    <CustomDrawerItems setScreen={setScreen} navigation={navigation} icon={require('../assets/icons/wallet.png')} name={'My wallet'} />
                    <CustomDrawerItems setScreen={setScreen} navigation={navigation} icon={require('../assets/icons/notification.png')} name={'Notification'} />
                    <CustomDrawerItems setScreen={setScreen} navigation={navigation} icon={require('../assets/icons/favourite.png')} name={'Favourite'} />

                    <View style={{ width: '100%', height: 1, backgroundColor: 'white' }} />
                    <CustomDrawerItems setScreen={setScreen} navigation={navigation} icon={require('../assets/icons/location.png')} name={'Track your order'} />
                    <CustomDrawerItems setScreen={setScreen} navigation={navigation} icon={require('../assets/icons/coupon.png')} name={'Coupons'} />
                    <CustomDrawerItems setScreen={setScreen} navigation={navigation} icon={require('../assets/icons/setting.png')} name={'Settings'} />
                    <CustomDrawerItems setScreen={setScreen} navigation={navigation} icon={require('../assets/icons/profile.png')} name={'Invite a friend'} />
                    <CustomDrawerItems setScreen={setScreen} navigation={navigation} icon={require('../assets/icons/help.png')} name={'Help center'} />
                </View>
            </View>

            {/* log out button */}
            <TouchableOpacity style={{
                flexDirection: 'row', marginHorizontal: 10, marginBottom: 10,
                flexDirection: 'row',
                gap: 20, alignItems: 'center',
            }}
                onPress={() => {
                    setModalVisible(true)
                }}
            >
                <Image source={require('../assets/icons/logout.png')} style={{ height: 25, width: 25 }} />
                <Text style={styles.drawerItemName}>Logout</Text>
            </TouchableOpacity>

            {/* modal show to confirm choice */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.modal}>
                        <Text style={[styles.text, { color: 'gray', fontSize: 16 }]}>Do you really want to sign out</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '80%' }}>
                            <Pressable
                                style={[styles.button, { backgroundColor: 'white' }]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={[styles.text, { color: CUS_ORANGE, fontSize: 14 }]}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, { backgroundColor: CUS_ORANGE }]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    signOut()
                                }}>
                                <Text style={[styles.text, { color: 'white', fontSize: 14 }]}>Ok</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>

        </DrawerContentScrollView>
    )
}
const SideBar = ({ navigation }) => {

    //set default screen
    const [screen, setScreen] = useState('home')
    return (
        <View
            style={{
                flex: 1,
            }}>
            <Drawer.Navigator
                drawerType="modal"
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        width: '70%',
                        backgroundColor: CUS_ORANGE,
                        gestureDirection: 'horizontal',
                        gestureEnabled: false,
                    },

                }}
                initialRouteName='mainlayout'
                drawerContent={
                    props => {
                        return (
                            <CustomDrawerContent
                                setScreen={setScreen}
                                navigation={props.navigation}
                            />
                        )
                    }
                }
            >
                <Drawer.Screen name='mainlayout'>
                    {props => (
                        <MainLayout {...props} screenRoot={screen} />
                    )}
                </Drawer.Screen>
            </Drawer.Navigator>

        </View >
    )
}

export default SideBar

const styles = StyleSheet.create({
    modal: {
        height: 120, width: 350, gap: 15,
        borderRadius: 20, backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        height: 40, width: 100,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 20,
    },
    drawerItemName: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14, color: 'white'
    },
    profile: {
        height: 40,
        width: 40, borderRadius: 10,
    },
    text: {
        fontFamily: 'Poppins-SemiBold',
    },
    name: {
        fontFamily: 'Poppins-Medium',
        fontSize: 13, color: 'white'
    },
    view: {
        fontFamily: 'Poppins-Italic',
        fontSize: 12, color: 'white'
    },
    drawerItem: {
        flexDirection: 'row',
        gap: 20, alignItems: 'center',
    }
})
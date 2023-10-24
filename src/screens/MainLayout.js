import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Dimensions, } from 'react-native'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Home from './Home'
import Search from './Search'
import Carts from './Carts'
import Favourite from './Favourite'
import Notifications from './Notifications'
import BottomTab from '../navigation/BottomTab'
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import messaging from '@react-native-firebase/messaging';
import InputRange from '../components/InputRange'
import { CUS_ORANGE } from '../assets/colors'
import Entypo from 'react-native-vector-icons/Entypo'

const { height, width } = Dimensions.get('window')
const MainLayout = ({ screenRoot, navigation }) => {

    //default value of bottom sheet (on the top but out of the screen)
    const translateY = useSharedValue(height)

    //set screen for navigate to specified screen
    const [screen, setScreen] = useState('home')

    //set screen from sidebar,this changes whenever user choose one item in sidebar 
    useEffect(() => {
        setScreen(screenRoot)
    }, [screenRoot])

    //hardcode
    const deliTime = [10, 20, 30]
    const [nowDeliTime, setNowDeliTime] = useState(10)
    const ratingData = [1, 2, 3, 4, 5]
    const [rating, setRating] = useState(0)

    //this is bottom sheet of filter search
    const closeBottomSheet = () => {
        translateY.value = withTiming(height)
    }
    const openBottomSheet = () => {
        translateY.value = withTiming(height * .15)
    }

    //bottomSheet Animation
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateY.value }
            ]
        }
    })

    //blur background when bottom sheet is showed
    const showBlurBack = useAnimatedStyle(() => {
        const opacity = translateY.value === height ? 0 : 1
        const zIndex = translateY.value === height ? -1 : 0
        return {
            opacity: withTiming(opacity),
            zIndex: zIndex
        }
    })

    //add animated for TouchableOpacity
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

    //notification 
    const [notificationTitle, setNotificationTitle] = useState('')
    const [notificationContent, setNotificationContent] = useState('')
    const notificationAnimated = useSharedValue(-80)
    const context = useSharedValue(0)

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            setNotificationContent(remoteMessage.notification.body)
            setNotificationTitle(remoteMessage.notification.title)
            notificationAnimated.value = withSpring(0)
        });
        return unsubscribe;
    }, []);

    const notificationAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: notificationAnimated.value }
            ]
        }
    })

    useEffect(() => {
        //notification will display in 5s
        const timeoutId = setTimeout(() => {
            notificationAnimated.value = withSpring(-80)
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [notificationContent, notificationTitle])

    const pan = Gesture.Pan()
        .onBegin(() => {

        })
        .onChange((event) => {
            if (event.translationY + context.value >= 0) notificationAnimated.value = withTiming(0)
            else if (event.translationY + context.value <= -80) notificationAnimated.value = withTiming(-80)
            else notificationAnimated.value = event.translationY + context.value;
        })
        .onFinalize(() => {
            if (notificationAnimated.value > -30) notificationAnimated.value = withTiming(0)
            else if (notificationAnimated.value < -30) notificationAnimated.value = withTiming(-80)
            context.value = notificationAnimated.value
        });

    return (
        <GestureHandlerRootView
            style={{ flex: 1 }}
        >

            {/* state of notification modal */}
            <GestureDetector gesture={pan}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        notificationAnimated.value = withTiming(-80)
                        setScreen('notification')
                    }
                    }
                >
                    <Animated.View style={[styles.notification, notificationAnimatedStyle]}>
                        <View>
                            <MaterialCommunityIcons name='bell-ring' size={25} color={'white'} />
                        </View>
                        <View>
                            <Text numberOfLines={1} style={styles.notiTitle}>{notificationTitle}</Text>
                            <Text numberOfLines={2} style={styles.notiContent}>{notificationContent}</Text>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </GestureDetector>

            {/* body part */}
            <View style={styles.body}>
                {
                    screen == 'home' ? <Home
                        setScreen={setScreen}
                        openBottomSheet={openBottomSheet}
                        navigation={navigation}
                    /> :
                        (screen == 'search' ? <Search navigation={navigation} /> :
                            (screen == 'cart' ? <Carts navigation={navigation} /> :
                                (screen == 'favourite' ? <Favourite navigation={navigation} /> :
                                    <Notifications navigation={navigation}
                                    />)))
                }
            </View>

            {/* footer part */}
            <View style={styles.footer}>
                <BottomTab screen={screen} setScreen={setScreen} />
            </View>

            {/* bottomSheet part */}
            <AnimatedTouchableOpacity
                onPress={() => closeBottomSheet()}
                style={[styles.blurBack, showBlurBack]} />
            <Animated.View style={[styles.bottomSheet, animatedStyle]}>
                <View style={styles.contentContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Filter your search</Text>
                        <TouchableOpacity onPress={() => closeBottomSheet()} style={styles.close}>
                            <Image source={require('../assets/icons/cross.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.DistanceText}> Distance</Text>
                    <InputRange cata={'Km'} min={1} max={20} steps={1} onChange={(range) => { console.log(range) }} />
                    <Text style={styles.DistanceText}> Delivery Time</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {
                            deliTime.map((item, idx) => {
                                return (
                                    <TouchableOpacity key={idx}
                                        style={[styles.delitime, { backgroundColor: item == nowDeliTime ? CUS_ORANGE : '#F5F5F8', }]}
                                        onPress={() => setNowDeliTime(item)}>
                                        <Text style={styles.text}>{item} Mins</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <Text style={styles.DistanceText}> Pricing Range</Text>
                    <InputRange cata={'$'} min={1} max={50} steps={1} onChange={(range) => { console.log(range) }} />
                    <Text style={styles.DistanceText}>Rating</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {
                            ratingData.map((item, idx) => {
                                return (
                                    <TouchableOpacity key={idx}
                                        style={[styles.rating, { backgroundColor: item <= rating ? CUS_ORANGE : '#F5F5F8', }]}
                                        onPress={() => setRating(item)}>
                                        <Text style={styles.text}>{item}</Text>
                                        <Entypo name='star' size={20} color={item <= rating ? 'yellow' : '#898B9A'} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>

                </View>
                <TouchableOpacity style={styles.rightBox}>
                    <Text style={styles.textRightBox}>Apply Filters</Text>
                </TouchableOpacity>
            </Animated.View>
        </GestureHandlerRootView>
    )
}

export default MainLayout

const styles = StyleSheet.create({
    notiContent: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12, color: 'white',
        maxWidth: width * 0.8
    },
    notiTitle: {
        maxWidth: width * 0.7,
        fontFamily: 'Poppins-Bold',
        fontSize: 14, color: 'white'
    },
    notification: {
        height: 80, width: width, flexDirection: 'row',
        backgroundColor: '#FE8A71', position: 'absolute',
        zIndex: 1, borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20, paddingHorizontal: 20,
        paddingVertical: 15, alignItems: 'center', gap: 20
    },
    label: {
        fontSize: 18,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20, color: 'black'
    },
    body: {
        flex: 9,
    },
    footer: {
        backgroundColor: 'white',
        elevation: 3,
        flex: 1
    },
    blurBack: {
        height: height,
        width: width,
        backgroundColor: 'rgba(128, 128, 128, 0.4)',
        position: 'absolute'
    },
    bottomSheet: {
        paddingTop: 20,
        height: height * 0.85,
        width: width,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        position: 'absolute',
        backgroundColor: 'white'
    },
    textRightBox: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16, color: 'white',
    },
    rightBox: {
        alignSelf: 'center', marginTop: 140,
        flexDirection: 'row', paddingHorizontal: 10,
        backgroundColor: CUS_ORANGE, borderRadius: 10,
        height: 50, width: '90%', justifyContent: 'center',
        alignItems: "center",
    },
    text: {
        fontFamily: 'Poppins-Italic',
        fontSize: 16, color: 'black'
    },
    rating: {
        height: 40, width: 60, flexDirection: 'row', gap: 5,
        borderRadius: 10, justifyContent: 'center', alignItems: "center"
    },
    delitime: {
        height: 40, width: 100,
        borderRadius: 10, justifyContent: 'center', alignItems: "center"
    },
    DistanceText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16, color: 'black',
        marginVertical: 15,
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20, color: 'black'
    },
    close: {
        height: 40, borderColor: 'gray', justifyContent: 'center',
        width: 40, borderRadius: 10, borderWidth: 0.5, alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center'
    },
    contentContainer: {
        marginHorizontal: 20
    },
})
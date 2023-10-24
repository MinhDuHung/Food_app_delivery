import { StyleSheet, Text, TouchableOpacity, Image, View, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { FlatList, PanGestureHandler, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { CUS_ORANGE } from '../assets/colors'
const { width, height } = Dimensions.get('window')
const Notification = ({ item, index, deleteOne, viewableItemsArray }) => {
    const translation = useSharedValue(0)
    const panGesture = useSharedValue(0)
    const context = useSharedValue(0)

    const rStyle = useAnimatedStyle(() => {
        const isVisible = Boolean(viewableItemsArray.value.filter(items => items.isViewable).find((viewableItem) => viewableItem.index === index))
        translation.value = isVisible ? 0 : 100
        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [
                { scale: withTiming(isVisible ? 1 : 0) },
                { translateX: translation.value },
                { rotate: withSpring(isVisible ? '0deg' : '45deg') }
            ]
        }
    })
    const boxWidth = -(width * .8)
    const animatedGestureHandler = useAnimatedGestureHandler({
        onStart: (e) => {
            context.value = panGesture.value
        },
        onActive: (e) => {
            if (e.translationX + context.value > 0) panGesture.value = 0
            else
                panGesture.value = e.translationX + context.value
        },
        onEnd: (e) => {
            panGesture.value = (boxWidth / 3) > e.translationX ? withTiming(boxWidth / 2) : withTiming(0)
        }
    })
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: panGesture.value }
            ]
        }
    })
    const animatedOptionStyle = useAnimatedStyle(() => {
        const width = interpolate(
            panGesture.value,
            [0, boxWidth / 2],
            [0, -boxWidth / 2]
        )
        return {
            width,
        }
    })
    const animatedDeleteStyle = useAnimatedStyle(() => {
        const width = interpolate(
            panGesture.value,
            [0, boxWidth / 4],
            [0, 70],
            Extrapolate.CLAMP
        )
        return {
            width,
        }
    })
    const animatedMoreOptionStyle = useAnimatedStyle(() => {
        const width = interpolate(
            panGesture.value,
            [boxWidth / 4, boxWidth / 2],
            [0, 70],
            Extrapolate.CLAMP
        )
        return {
            width,
        }
    })
    const isRead = item.status === 'yes' ? true : false
    const boxColor = !isRead ? CUS_ORANGE : 'rgba(255, 108, 66, 0.5)'
    return (
        <PanGestureHandler
            onGestureEvent={animatedGestureHandler}
            activeOffsetX={[-10, 10]}
        >
            <Animated.View style={{ maxWidth: -boxWidth, flexDirection: "row" }}>
                <Animated.View style={[styles.box, { backgroundColor: boxColor }, rStyle, animatedStyle]}>
                    <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                    <Text numberOfLines={2} style={styles.content}>{item.content}</Text>
                </Animated.View>
                <Animated.View style={[styles.option, animatedOptionStyle]}>
                    <Animated.View style={[styles.retangle, animatedMoreOptionStyle]}>
                        <Animated.Text style={[styles.text,]}>More option</Animated.Text>
                    </Animated.View>
                    <Animated.View style={[styles.retangle, animatedDeleteStyle]}>
                        <TouchableWithoutFeedback
                            onPress={() => deleteOne(index)}>
                            <Animated.Text style={[styles.text,]}>Delete</Animated.Text>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </PanGestureHandler >
    )
}

export default Notification

const styles = StyleSheet.create({
    text: {
        color: 'white', fontWeight: 'bold',
        fontSize: 16
    },
    retangle: {
        justifyContent: 'center', alignItems: 'center',
        height: 70, borderRadius: 15, backgroundColor: CUS_ORANGE
    },
    option: {
        position: 'absolute', right: 0, flexDirection: 'row',
        borderRadius: 15, justifyContent: 'space-around', alignItems: 'center',
        height: 70,
    },
    title: {
        color: 'white', fontFamily: 'Poppins-SemiBold',
        fontSize: 13
    },
    content: {
        color: 'white', fontFamily: 'Poppins-Italic',
        fontSize: 11, maxWidth: '90%'
    },
    box: {
        height: 70, width: width * .8,
        borderRadius: 15, alignItems: 'center',
        paddingTop: 7
    }
})
import { Dimensions, StyleSheet, TextInput, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useAnimatedProps, useAnimatedGestureHandler, useSharedValue } from 'react-native-reanimated'
import { CUS_ORANGE } from '../assets/colors'
import { PanGestureHandler, } from 'react-native-gesture-handler'

const InputRange = ({ cata, min, max, steps, onChange }) => {
    const MAX_VALUE = Dimensions.get('window').width - Dimensions.get('window').width * 0.2
    const start1 = useSharedValue(0)
    const end1 = useSharedValue(MAX_VALUE)
    const scaleStart = useSharedValue(1)
    const scaleEnd = useSharedValue(1)
    const AnimationTextInput = Animated.createAnimatedComponent(TextInput)
    const styleLine = useAnimatedStyle(() => {
        return {
            height: 12, width: end1.value - start1.value + 10, position: 'absolute',
            backgroundColor: CUS_ORANGE, borderRadius: 5,
            transform: [
                { translateX: start1.value },
            ]
        }
    })
    const trackStart1Move = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: start1.value,
                },
            ]
        }
    })
    const trackEnd1Move = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: end1.value,
                },
            ]
        }
    })
    const x = cata === 'Km' ? 'Km' : '$'
    const prop1 = useAnimatedProps(() => {
        const value = Math.round((min + (start1.value / MAX_VALUE) * (max - min)) / steps) * steps;
        const text = x === 'Km' ? `${value} Km` : `$${value}`;

        return {
            text,
        };
    });

    const prop2 = useAnimatedProps(() => {
        const value = Math.round((min + (end1.value / MAX_VALUE) * (max - min)) / steps) * steps
        const text = x === 'Km' ? `${value} Km` : `$${value}`
        return {
            text
        }
    })
    const styleStart1 = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: start1.value,
                },
                {
                    scale: scaleStart.value,
                }
            ]
        }
    })
    const styleEnd1 = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: end1.value,
                },
                {
                    scale: scaleEnd.value,
                }
            ]
        }
    })
    onGestureEvent1 = useAnimatedGestureHandler({
        onStart: (_, ctx) => { ctx.startX = start1.value },
        onActive: (event, ctx) => {
            scaleStart.value = 1.3
            start1.value = ctx.startX + event.translationX < 0 ?
                0 : ctx.startX + event.translationX >= end1.value - 22 ? end1.value - 22 :
                    ctx.startX + event.translationX
        },
        onEnd: () => { scaleStart.value = 1 }
    })
    onGestureEvent2 = useAnimatedGestureHandler({
        onStart: (_, ctx) => { ctx.startX = end1.value },
        onActive: (event, ctx) => {
            scaleEnd.value = 1.3
            end1.value = ctx.startX + event.translationX <= start1.value + 22 ?
                start1.value + 22 : ctx.startX + event.translationX > MAX_VALUE ? MAX_VALUE :
                    ctx.startX + event.translationX
        },
        onEnd: () => { scaleEnd.value = 1 }
    })
    return (
        <View>
            <View style={styles.line} />
            <Animated.View style={styleLine} />
            <View>
                <PanGestureHandler onGestureEvent={onGestureEvent2}>
                    <Animated.View style={[styles.end, styleEnd1]} />
                </PanGestureHandler>
                <PanGestureHandler onGestureEvent={onGestureEvent1}>
                    <Animated.View style={[styles.start, styleStart1]} />
                </PanGestureHandler>
            </View>
            <View style={{elevation:-3}}>
                <AnimationTextInput style={[styles.value, trackStart1Move]} defaultValue={min.toString()} editable={false} animatedProps={prop1} />
                <AnimationTextInput style={[styles.value, trackEnd1Move]} defaultValue={max.toString()} editable={false} animatedProps={prop2} />
            </View>
        </View>
    )
}

export default InputRange

const styles = StyleSheet.create({
    value: {
        color: 'black', position: 'absolute', top: -20
    },
    line: {
        height: 10, width: '90%',
        backgroundColor: '#F5F5F8', borderRadius: 5,
    },
    start: {
        height: 22, backgroundColor: CUS_ORANGE, position: 'absolute',
        width: 22, borderRadius: 15, borderWidth: 3, borderColor: '#006439',
        top: -15
    },
    end: {
        height: 22, backgroundColor: CUS_ORANGE,
        width: 22, borderRadius: 15, borderWidth: 3, borderColor: '#006439',
        top: -15, right: 0
    }
})
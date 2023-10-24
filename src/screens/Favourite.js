import { StyleSheet, Text, View, Animated, Easing } from 'react-native'
import React, { useEffect } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { CUS_ORANGE } from '../assets/colors'
const Favourite = () => {
  const rotate = new Animated.Value(0)
  const useAnimated = () => {
    rotate.setValue(0)
    Animated.timing(rotate, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear
    }).start(()=>useAnimated())
  }
  useEffect(() => {
    useAnimated()
  },[])
  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.heart, { transform: [{ rotate: rotation }] }]}>
        <Entypo name='heart' size={50} color={CUS_ORANGE} />
      </Animated.View>
    </View>
  )
}

export default Favourite

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heart: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center'
  }
})
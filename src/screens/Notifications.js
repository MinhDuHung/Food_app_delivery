import { StyleSheet, Text, TouchableOpacity, Easing, Animated, Image, View, Dimensions } from 'react-native'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-reanimated'
import Notification from '../components/Notification'
import { getAllNotificationsByIdApi } from '../api/notification'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { CUS_ORANGE } from '../assets/colors'

const Notifications = ({ navigation }) => {
  //store notifications
  const [Arr, setArr] = useState([])

  //store items which are displaying in the screen, and this defines default value
  const viewableItemsArray = useSharedValue([{ "index": 0, "isViewable": true, "item": 1, "key": "1" }, { "index": 1, "isViewable": true, "item": 2, "key": "2" }, { "index": 2, "isViewable": true, "item": 3, "key": "3" }, { "index": 3, "isViewable": true, "item": 4, "key": "4" }, { "index": 4, "isViewable": true, "item": 5, "key": "5" }, { "index": 5, "isViewable": true, "item": 6, "key": "6" }, { "index": 6, "isViewable": true, "item": 7, "key": "7" }, { "index": 7, "isViewable": true, "item": 8, "key": "8" }, { "index": 8, "isViewable": true, "item": 9, "key": "9" }])
  const currentUser = useSelector((state) => state.userReducer);

  //render each item of arr
  function renderItem({ item, index }) {
    return (
      <Notification item={item} index={index} deleteOne={deleteOne} viewableItemsArray={viewableItemsArray} />
    )
  }

  //delete one item
  const deleteOne = (index) => {
    setArr(Arr.filter((items, idx) => idx !== index))
  };

  //get all notifications from DB by user id
  async function getAllNotificationsById() {
    try {
      const response = await axios.get(getAllNotificationsByIdApi, {
        params: {
          userId: currentUser.id
        }
      });
      setArr(response.data.notifications)
    } catch (error) {
      console.error('Error getting orders data:', error);
      throw error;
    }
  }
  //auto call
  useEffect(() => {
    getAllNotificationsById()
  }, [])

  //this reset the viewableitems, means when user scrolling screen
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    viewableItemsArray.value = viewableItems
  }, []);

  //loading animation when data is empty
  const rotate = useRef(new Animated.Value(0)).current;
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


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      {/* header */}
      <View style={[styles.header]}>
        <TouchableOpacity style={styles.menu}
          onPress={() => navigation.openDrawer()}>
          <Image source={require('../assets/icons/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <Image source={require('../assets/images/profile.png')}
          style={styles.menu} />
      </View>

      {/* body */}
      <View style={styles.body}>
        {
          Arr.length > 0 ?
            <FlatList
              data={Arr}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ gap: 15, alignItems: 'center' }}
              onViewableItemsChanged={onViewableItemsChanged}
              showsVerticalScrollIndicator={false}
              inverted
            /> :
            
            // loading effect
            <Animated.View style={[styles.heart, { transform: [{ rotate: rotation }] }]}>
              <AntDesign name='loading1' size={30} color={CUS_ORANGE} />
            </Animated.View>
        }
      </View>
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({
  heart: {
    height: 200, width: 200, alignSelf: 'center',
    justifyContent: 'center', alignItems: 'center'
  },
  body: {
    flex: 9,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20, color: 'black'
  },
  menu: {
    height: 40, width: 40, borderWidth: 1,
    borderRadius: 10, justifyContent: 'center',
    alignItems: 'center', borderColor: 'gray'
  },
  header: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row', paddingHorizontal: 15
  }
})
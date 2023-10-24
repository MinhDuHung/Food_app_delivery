import { StyleSheet, Image, Easing, TouchableOpacity, Animated, Text, Dimensions, View, FlatList, Modal, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CUS_ORANGE, CUS_YELLOW } from '../assets/colors'
import { findOneOrderApi, getAllOrdersApi, getAllOrdersByCategoryApi } from '../api/orders'
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/AntDesign'
const { format } = require('date-fns');
import { useDispatch, useSelector } from 'react-redux'
import { rateItemsByIdApi } from '../api/itemApi'
import { err } from 'react-native-svg/lib/typescript/xml'
const { width, height } = Dimensions.get('window')

const Carts = () => {
  const currentUser = useSelector((state) => state.userReducer);
  const [catagory, setCatagory] = useState('History')

  //data of ordered foods
  const [data, setData] = useState([])

  //detail infor of each above data
  const [order, setOrder] = useState([])

  //find all orders by id and catagory
  async function getAllOrders(id) {
    const status = catagory === "History" ? "Delivered" : "Any"
    try {
      const response = await axios.get(getAllOrdersByCategoryApi, {
        params: {
          id,
          status
        }
      });
      //resutls
      setData(response.data.orders)
    } catch (error) {
      console.error('Error getting orders data:', error);
      throw error;
    }
  }

  //call whenever catagoty is changed
  useEffect(() => {
    getAllOrders(currentUser.id)
  }, [catagory])

  //call whenever data is changed
  useEffect(() => {
    findOrderInformation()
  }, [data])

  //find each order infor to display
  async function findOrderInformation() {

    // this var will contain [{img, name, price},...]
    const newOrder = [];

    for (let i = 0; i < data.length; i++) {
      try {
        const response = await axios.get(findOneOrderApi, {
          params: {
            id: data[i].itemId
          }
        });
        if (response.status === 200) {
          const { image, name, price } = response.data.order
          newOrder.push({
            name: name,
            image: image,
            price: price
          })
        }
      } catch (error) {
        console.error('Error getting orders data:', error);
        throw error;
      }
    }
    setOrder(newOrder);
  }

  //loading effect when data is null
  const rotate = new Animated.Value(0)
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

  const [isShowModel, setIsShowModal] = useState(false)

  const rateData = [1, 2, 3, 4, 5]
  const [chosenId, setChosenId] = useState(-1)
  const [rating, setRating] = useState(0)

  async function handleRating() {
    try {
      const response = await axios.post(rateItemsByIdApi, {
        id: chosenId,
        rate: rating + 1
      })
      if (response.status === 201) {
        setRating(0)
        setChosenId(-1)
      }

    } catch (error) {
      console.log(error)
    }
    setIsShowModal(false)
  }

  const renderItem = ({ item, index }) => {
    const date = new Date(item.date);
    const formattedDate = format(date, 'yyyy-MM-dd');
    const uri = order[index]?.image ? order[index].image : 'https://image.winudf.com/v2/image1/Y29tLmNjbS5hcHBzLnJhbmRvbWx1bmNoX2ljb25fMTU4MjgyNDQ3Nl8wMDE/icon.png?w=340&fakeurl=1'
    return (
      <>
        {
          uri === 'https://image.winudf.com/v2/image1/Y29tLmNjbS5hcHBzLnJhbmRvbWx1bmNoX2ljb25fMTU4MjgyNDQ3Nl8wMDE/icon.png?w=340&fakeurl=1' ?
            <Animated.View style={[styles.heart, { transform: [{ rotate: rotation }] }]}>
              <AntDesign name='loading1' size={30} color={CUS_ORANGE} />
            </Animated.View>
            :
            <TouchableOpacity
              style={styles.box}>
              <View style={styles.boxHeader}>
                <Image style={styles.image} source={{ uri: uri }} />
                <View style={styles.content}>
                  <Text style={styles.name} numberOfLines={1}>{order[index]?.name}</Text>
                  <View style={styles.infor}>
                    <Text numberOfLines={1} style={styles.date}>{formattedDate}</Text>
                    <Text style={styles.quantity}>{item.quantity} items</Text>
                  </View>
                  <Text style={[styles.status, { color: catagory == 'History' ? CUS_YELLOW : 'green' }]}>{item.status}</Text>
                </View>
                <Text style={styles.price}>{item.quantity * order[index]?.price}</Text>
              </View>
              <View style={[styles.boxFooter]}>
                {
                  catagory === 'History' ?
                    <TouchableOpacity style={[styles.bottomBox, { backgroundColor: CUS_ORANGE }]}>
                      <Text style={[styles.historyText, { color: 'white' }]}>Re-Order</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.bottomBox, { backgroundColor: CUS_ORANGE }]}>
                      <Text style={[styles.historyText, { color: 'white' }]}>Track order</Text>
                    </TouchableOpacity>
                }

                {
                  catagory === 'History' ?
                    <TouchableOpacity style={[styles.bottomBox, { backgroundColor: '#FFF0EC' }]}
                      onPress={() => { setChosenId(item.id); setIsShowModal(true) }}
                    >
                      <Text style={[styles.historyText, { color: CUS_ORANGE }]}>Rate</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.bottomBox, { backgroundColor: '#FFF0EC' }]}>
                      <Text style={[styles.historyText, { color: CUS_ORANGE }]}>Chat with Driver</Text>
                    </TouchableOpacity>
                }

              </View >
            </TouchableOpacity >
        }
      </>
    )
  }
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', height: 60, width: '100%', }}>
        <TouchableOpacity
          onPress={() => setCatagory('History')}
          style={[styles.history, { backgroundColor: catagory === 'History' ? CUS_ORANGE : '#FFF0EC' }]}>
          <Text style={[styles.historyText, { color: catagory === 'History' ? 'white' : '#FF6D43' }]}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCatagory('Upcoming')}
          style={[styles.history, { backgroundColor: catagory !== 'History' ? CUS_ORANGE : '#FFF0EC' }]}>
          <Text style={[styles.historyText, { color: catagory !== 'History' ? 'white' : '#FF6D43' }]}>Upcoming</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: 60 }}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 15, }}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShowModel}
      >

        <Pressable
          onPress={() => { }}
          style={styles.modal}>
          <View style={styles.subModal}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {
                rateData.map((item, index) => {
                  return (
                    <Pressable key={item} style={[]}
                      onPress={() => setRating(index)}
                    >
                      <Entypo name='star' size={20} color={index <= rating ? 'yellow' : 'white'} />
                    </Pressable>
                  )
                })
              }
            </View>
            <View style={{ flexDirection: "row", gap: 20, zIndex: 1 }}>
              <TouchableOpacity
                style={[styles.selection, { backgroundColor: CUS_ORANGE }]}
                onPress={() => { setIsShowModal(false); setRating(-1) }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.selection, { backgroundColor: 'white' }]}
                onPress={() => { handleRating() }}
              >
                <Text style={{ color: CUS_ORANGE, fontWeight: 'bold', fontSize: 16 }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View >
  )
}

export default Carts

const styles = StyleSheet.create({
  selection: {
    height: 30, width: 100, justifyContent: 'center', alignItems: 'center',
    borderRadius: 10,
  },
  subModal: {
    height: 100, width: width * .8, backgroundColor: CUS_ORANGE, borderRadius: 30,
    justifyContent: 'center', alignItems: 'center', gap: 10
  },
  modal: {
    justifyContent: 'center', alignItems: 'center',
    flex: 1, backgroundColor: "rgba(192,192,192,.5)"
  },
  heart: {
    height: 100, width: 100, alignSelf: 'center',
    justifyContent: 'center', alignItems: 'center'
  },
  name: {
    fontFamily: 'Poppins-Black',
    fontSize: 15, color: 'black',
  },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13, color: 'gray',
  },
  time: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13, color: 'gray',
  },
  quantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13, color: 'gray',
  },
  status: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16, color: CUS_ORANGE, height: '100%'
  },
  boxFooter: {
    height: '40%', flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 10, gap: 10,
  },
  bottomBox: {
    height: '70%', width: width * 0.4, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  infor: {
    flexDirection: 'row', gap: 10
  },
  content: {
    width: '50%',
  },
  boxHeader: {
    height: '60%', flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', width: '100%', paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    height: 40, width: 40, borderRadius: 20,
  },
  history: {
    height: 40, width: width * 0.4, borderRadius: 10, justifyContent: 'center',
    alignItems: 'center',
  },
  historyText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14, color: 'black',
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1, paddingHorizontal: 20, paddingTop: 40,
  },
  box: {
    backgroundColor: '#F5F5F8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 140, width: '100%',
  }
})
import { Image, StyleSheet, Text, Dimensions, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import OnboardingPages from '../components/OnboardingPages';
import { CUS_ORANGE } from '../assets/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Onboarding3 = ({ navigation, route }) => {
    const [currentPage, setCurrentPage] = useState(3)
    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.background_01}
                    source={require('../assets/images/background_01.png')}
                />
                <Image style={styles.logo_02} source={require('../assets/images/logo_02.png')} />
                <Image style={styles.favourite_food} source={require('../assets/images/great_food.png')} />
            </View>

            <View>
                <Text style={styles.title}>
                    Receive the Great Food
                </Text>
                <Text style={styles.content}>
                    You will receive the great food within a hour. Anh get free delivery credits for every order
                </Text>
                <OnboardingPages
                    navigation={navigation}
                    currentPage={currentPage}
                  
                />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('signin')

                }}
                    style={styles.box}>
                    <Text style={[styles.text, { color: 'white' }]}>
                        Get started!
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Onboarding3

const styles = StyleSheet.create({
    smallbox: {
        height: 50, width: 100,
        justifyContent: 'center',
    },
    box: {
        height: 50, width: 300,
        backgroundColor: CUS_ORANGE, borderRadius: 20,
        justifyContent: 'center', alignItems: 'center',
    },
    footer: {
        marginTop: 30, justifyContent: 'center',
        flexDirection: 'row', alignItems: 'center'
    },
    text: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18
    },
    title: {
        fontFamily: 'Poppins-Bold',
        color: 'black',
        alignSelf: 'center',
        fontSize: 25, marginTop: 50,
    },
    content: {
        maxWidth: screenWidth * .8,
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        fontSize: 15, textAlign: 'center'
    },
    favourite_food: {
        resizeMode: 'contain',
        position: 'absolute',
        bottom: -20, alignSelf: 'center'
    },
    logo_02: {
        height: 50, alignSelf: 'center',
        width: 200, position: 'absolute',
        resizeMode: 'contain', marginTop: 30,
    },
    container: {
    },
    background_01: {
        width: screenWidth,
        height: undefined,
        aspectRatio: 1 / 1.2,
    }
})
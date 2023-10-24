import { Image, StyleSheet, Text, Dimensions, TouchableOpacity, View, Switch, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CUS_ORANGE, TEXT_INPUT } from '../assets/colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isEmailValid = require('../components/EmailValid.js');
import axios from 'axios';
import { loginApi, signUpApi } from '../api/userApi';
import { useDispatch, useSelector } from 'react-redux'
import { saveUser } from '../redux/actions/userAction'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signin = ({ navigation, route }) => {
    // redux thunk
    const dispatch = useDispatch();


    const [email, setEmail] = useState()
    const [saveme, setSaveme] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('')
    const valid = isEmailValid(email)
    const validPassword = password.length >= 8

    //async storage user information
    const getData = async () => {
        try {
            const email = await AsyncStorage.getItem('userEmail');
            const password = await AsyncStorage.getItem('userPassword');
            let saveme = await AsyncStorage.getItem('saveMe', saveme);
            saveme === 'true' ? saveme = true : false
            if (email !== null && password != null) {
                setEmail(email)
                setPassword(password)
                setSaveme(saveme)
            }
            else {
                setEmail('')
                setPassword('')
            }
        } catch (e) {
            console.log('====================================');
            console.log(e);
            console.log('====================================');
        }
    };
    const storeData = async () => {
        try {
            await AsyncStorage.setItem('userEmail', email);
            await AsyncStorage.setItem('userPassword', password);
            await AsyncStorage.setItem('saveMe', saveme.toString());
        } catch (e) {
            console.log(e)
        }
    };
    const removeData = async () => {
        try {
            await AsyncStorage.removeItem('userEmail')
            await AsyncStorage.removeItem('userPassword')
            await AsyncStorage.setItem('saveMe', 'false');
        } catch (e) {
            console.log(e)
        }
    }


    //handle switch button
    const toggleSwitch = () => {
        setSaveme((previousState) => !previousState)
    };

    //handle sign in
    async function handleSignin() {
        try {
            //send email and password to auth
            const response = await axios.post(loginApi, {
                email,
                password,
            });
            if (response.status === 200) {
                // check if saveme is true, store data to async storage
                //else remove pre value and clean input 
                if (saveme === true) {
                    storeData()
                }
                else {
                    removeData()
                }
                setEmail('');
                setPassword('');

                //save user infor in Redux thunk
                dispatch(saveUser(response.data.user.name, response.data.user.email, response.data.user.id, response.data.user.avatar))
                navigation.navigate('sidebar')
            }
        } catch (error) {
            console.error(error);
        }

    }



    // sign in with gg
    const [userInfor, setUserInfor] = useState(null)
    useEffect(() => {
        getData()
        GoogleSignin.configure({
            webClientId: "318626232779-d4e6p19rnmaqvttfhetqupf1sfltf9ai.apps.googleusercontent.com"
        })
    }, [])

    const signInWithGG = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUserInfor(userInfo);
            navigation.navigate('sidebar')
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('Error:', error.code);
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log('Error:', error.code);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log('Error:', error.code);
            } else {
                console.log('Error:', error.code);
            }
        }
    };


    return (
        <View style={[styles.container,]}>
            <Image style={styles.logo_02} source={require('../assets/images/logo_02.png')} />
            <Text style={styles.title}>Let's Sign You In</Text>
            <Text style={styles.content}>Well come back, you have been missed</Text>

            <View>
                <View>
                    <Text>Email</Text>
                    {
                        email !== '' ?
                            valid ?
                                <></> :
                                <Text style={styles.invalidEmail}>Invalid Email</Text>
                            :
                            <></>
                    }
                    <TextInput style={styles.textInput}
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    {
                        email !== '' ?
                            valid ?
                                <AntDesign name='checkcircle' size={20}
                                    style={styles.checked}
                                    color={'green'}
                                /> :
                                <AntDesign name='closecircle' size={20}
                                    style={styles.checked}
                                    color={'red'}
                                />
                            :
                            <></>
                    }

                </View>
                <View>
                    <Text>Password</Text>
                    <TextInput
                        secureTextEntry={!showPassword}
                        style={styles.textInput}
                        value={password}
                        onChangeText={text => setPassword(text)} />
                    <AntDesign
                        onPress={() => { setShowPassword(!showPassword) }}
                        name='eyeo' size={20}
                        style={styles.checked}
                    />
                    {
                        password !== '' ?
                            validPassword ?
                                <></> :
                                <Text style={styles.invalidEmail}>Password must be 8 characters</Text>
                            :
                            <></>
                    }
                </View>

                <View style={styles.switch}>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={saveme ? 'blue' : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={saveme}
                        style={{ marginRight: 10 }}
                    />
                    <Text
                        style={{ color: saveme ? 'green' : 'gray' }}>
                        Save Me
                    </Text>
                    <Text
                        style={styles.ForgotPassword}
                        onPress={() => navigation.navigate('passwordRecovery')}
                    >
                        Forgot Password?
                    </Text>
                </View>

                <View>
                    {
                        valid && validPassword ?
                            <TouchableOpacity
                                onPress={() => { handleSignin() }}
                                style={[styles.box, { backgroundColor: CUS_ORANGE }]}>

                                <Text style={[styles.text, { color: 'white' }]}>
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                            :
                            <View style={[styles.box, { backgroundColor: '#F4C9B7' }]}>

                                <Text style={[styles.text, { color: 'white' }]}>
                                    Sign In
                                </Text>
                            </View>
                    }
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.content}>Don't have an account? </Text>
                    <Text
                        onPress={() => navigation.navigate('signup')}
                        style={styles.signup}>Sign up</Text>
                </View>
                <TouchableOpacity
                    style={[styles.links, { backgroundColor: 'blue' }]}>
                    <AntDesign
                        name='facebook-square' size={20}
                        color={'white'}
                    />
                    <Text style={[styles.linkstext, { color: 'white' }]}>Continue with Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        signInWithGG()
                    }}
                    style={[styles.links, { backgroundColor: TEXT_INPUT }]}>
                    <Image
                        source={require('../assets/icons/google.png')}
                        style={{ width: 20, height: 20 }}
                    />
                    <Text style={[styles.linkstext, { color: 'black' }]}>Continue with Google</Text>
                </TouchableOpacity>

            </View>
        </View >
    )
}

export default Signin

const styles = StyleSheet.create({
    linkstext: {
        fontFamily: 'Poppins-Regular',

    },
    links: {
        height: 40, width: '100%', marginTop: 20,
        borderRadius: 10, flexDirection: 'row', gap: 15,
        justifyContent: 'center', alignItems: 'center',
    },
    signup: {
        color: 'red',
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
    },
    bottom: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    ForgotPassword: {
        left: 120,
        color: 'blue'
    },
    switch: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    invalidEmail: {
        position: 'absolute',
        right: 20,
        color: 'red'
    },
    box: {
        height: 50, width: '100%', marginVertical: 25,
        borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
    },
    checked: {
        position: 'absolute',
        right: 20, top: 40,
    },
    textInput: {
        backgroundColor: TEXT_INPUT,
        height: 40, marginVertical: 10,
        width: '100%',
        borderRadius: 10, paddingHorizontal: 15,
    },
    footer: {
        marginTop: 30, justifyContent: 'space-between', paddingHorizontal: 20,
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
        fontSize: 20, marginTop: 50,
    },
    content: {
        maxWidth: screenWidth * .8,
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center', marginBottom: 30,
        fontSize: 14, textAlign: 'center'
    },
    logo_02: {
        height: 50, alignSelf: 'center',
        width: 200,
        resizeMode: 'contain', marginTop: 20,
    },
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: 'white'
    },
})
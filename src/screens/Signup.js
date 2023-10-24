import { Image, StyleSheet, Alert, Text, Dimensions, TouchableOpacity, View, Switch, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CUS_ORANGE, TEXT_INPUT } from '../assets/colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getAllUsers, signUpApi, userAvatarApi } from '../api/userApi';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isEmailValid = require('../components/EmailValid.js');
import axios from 'axios';

const Signup = ({ navigation, route }) => {
    const [email, setEmail] = useState('')
    const [name, setUserName] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')
    const [id, setId] = useState()
    const valid = isEmailValid(email)
    const validPassword = password.length >= 8

    //get random avatar for user
    const getAvatar = async () => {
        try {
            const response = await fetch(userAvatarApi);
            const data = await response.json();
            if (response.ok) {
                const avatarUrl = data.results[0].picture.large;
                setAvatar(avatarUrl);
            } else {
                console.log('getAvatar 1st Error:', data);
            }
        } catch (error) {
            console.log('getAvatar 2nd Error:', error);
        }
    };

    // automatically call getAll and get Avatar
    useEffect(() => {
        getAll()
        getAvatar()
    }, [])

    //get all users to set the new id with the length of arr + 1
    async function getAll() {
        try {
            const response = await axios.get(getAllUsers, {
                params: {
                }
            });
            setId(response.data.users.length)
        } catch (error) {
            console.error('Error getting users data:', error);
            throw error;
        }
    }

    //handle sign up 
    async function handleSignUp() {
        setId(id + 1)
        try {
            //send infor to sign up
            const response = await axios.post(signUpApi, {
                id,
                name,
                avatar,
                email,
                password,
            });

            if (response.status === 201) {
                setUserName('');
                setEmail('');
                setPassword('');
                Alert.alert('Your account is created successfully!')
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <View style={styles.container}>
            <Image style={styles.logo_02} source={require('../assets/images/logo_02.png')} />
            <Text style={styles.title}>Getting Started!</Text>
            <Text style={styles.content}>Create an account to continue!</Text>

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
                    <Text>Username</Text>
                    <TextInput style={styles.textInput}
                        value={name}
                        onChangeText={text => setUserName(text)}
                    />
                    {
                        valid && name.length > 4 ?
                            <AntDesign name='checkcircle' size={20}
                                style={styles.checked}
                                color={'green'}
                            /> :
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
                <View>
                    {
                        valid && validPassword ?
                            <TouchableOpacity
                                onPress={() => { handleSignUp() }}
                                style={[styles.box, { backgroundColor: CUS_ORANGE }]}>

                                <Text style={[styles.text, { color: 'white' }]}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                            :
                            <View style={[styles.box, { backgroundColor: '#F4C9B7' }]}>

                                <Text style={[styles.text, { color: 'white' }]}>
                                    Sign Up
                                </Text>
                            </View>
                    }
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.content}>Already have an account? </Text>
                    <Text
                        onPress={() => navigation.navigate('signin')}
                        style={styles.signup}>Sign in</Text>
                </View>
                <TouchableOpacity style={[styles.links, { backgroundColor: 'blue' }]}>
                    <AntDesign
                        onPress={() => { }}
                        name='facebook-square' size={20}
                        color={'white'}
                    />
                    <Text style={[styles.linkstext, { color: 'white' }]}>Continue with Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.links, { backgroundColor: TEXT_INPUT }]}>
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

export default Signup

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
        marginBottom: 40,
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
        alignSelf: 'center', marginBottom: 15,
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
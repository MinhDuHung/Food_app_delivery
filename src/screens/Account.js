import { StyleSheet, ScrollView, Text, TouchableOpacity, Image, View, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { CUS_ORANGE } from '../assets/colors'
import Entypo from 'react-native-vector-icons/Entypo'
import DatePicker from 'react-native-date-picker'
import { Dropdown } from 'react-native-element-dropdown';
const Account = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    //value of dropdown
    const [value, setValue] = useState(null);

    //state of dropdown
    const [isFocus, setIsFocus] = useState(false);

    //open datepicker
    function handleCalendar() {
        setOpen(true)
    }

    //change date type to viet nam local date string
    const datePartOnly = date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    //options of dropdown
    const data = [
        { label: 'Male' },
        { label: 'Female' },
        { label: 'Others' }
    ]
    return (
        <KeyboardAvoidingView style={{ flex: 10, backgroundColor: 'white' }}>

            {/* header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.menu}
                    onPress={() => navigation.goBack()}>
                    <Image style={{ height: 30, width: 30, }} source={require('../assets/icons/back.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>My Account</Text>
                <View style={{ height: 40, width: 40, }} />
            </View>

            {/* body */}
            <View style={styles.body}>
                <ScrollView>

                    {/* this will display when user click the calender btn */}
                    <DatePicker
                        modal
                        mode={'date'}
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />

                    <View style={styles.box}>
                        <Text style={styles.label}>Full name</Text>
                        <TextInput style={styles.textInput}
                            value={name}
                            onChangeText={text => setName(text)} />
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.label}>Phone number</Text>
                        <TextInput style={styles.textInput} />
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.label}>ID card</Text>
                        <TextInput style={styles.textInput} />
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <View>
                            <TextInput style={styles.textInput} placeholder='MM/DD/YYYY' >
                                {
                                    date ? <Text>{datePartOnly}</Text> : <></>
                                }
                            </TextInput>
                            <Entypo
                                onPress={() => { handleCalendar() }}
                                style={styles.calendar} name='calendar' size={20} />
                        </View>
                    </View>
                    
                    <View style={styles.box}>
                        <Text style={styles.label}>Gender</Text>
                        <Dropdown
                            data={data}
                            style={[styles.dropdown, isFocus && { borderWidth: .5, borderColor: 'blue' }]}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            placeholder={!isFocus ? 'Select Gender' : ''}
                            placeholderStyle={styles.placeholderStyle}
                            onChange={item => {
                                setValue(item.label);
                                setIsFocus(false);
                            }}
                            value={value}
                            valueField="label"
                            labelField="label"
                            selectedTextStyle={{ color: 'black' }}
                            maxHeight={100}
                        >
                        </Dropdown>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.textInput} value={email}
                            onChangeText={text => setEmail(text)} />
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.label}>Address</Text>
                        <TextInput style={styles.textInput} />
                    </View>

                </ScrollView>
            </View>

            {/* footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.rightBox}>
                    <Text style={styles.textRightBox}>Save</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Account

const styles = StyleSheet.create({
    placeholderStyle: {
        color: 'black'
    },
    dropdown: {
        backgroundColor: 'white', height: 40, borderRadius: 10,
        paddingHorizontal: 15,
    },
    calendar: {
        position: 'absolute',
        right: 20,
        top: 10,
    },
    textRightBox: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16, color: 'white',
    },
    rightBox: {
        flexDirection: 'row', paddingHorizontal: 10,
        backgroundColor: CUS_ORANGE, borderRadius: 10,
        height: 50, width: '90%', justifyContent: 'center',
        alignItems: "center",
    },
    footer: {
        flex: 1,
        justifyContent: 'center', alignItems: "center"
    },
    label: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13, color: 'gray',
    },
    textInput: {
        backgroundColor: 'white', height: 40, borderRadius: 10,
        paddingHorizontal: 15,
    },
    box: {
        width: '100%', justifyContent: 'center',
        height: 100, gap: 10,
    },
    body: {
        flex: 8, width: '90%',
        backgroundColor: '#F5F5F8', alignSelf: 'center',
        borderRadius: 15, paddingHorizontal: 20,
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
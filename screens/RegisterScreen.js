import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, Alert, Pressable } from 'react-native'
import React, { useCallback, useReducer, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { FONTS, COLORS, SIZES, images } from '../constants'
import { MaterialIcons, FontAwesome, Fontisto } from '@expo/vector-icons'
import Input from '../components/Input'
import Button from '../components/Button'
import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionic from 'react-native-vector-icons/Ionicons'
import { firebaseConfig } from '../firebase'
import firebase from 'firebase/compat/app'
import SocialButtons from "../components/SocialButtons";




const initialState = {
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
}


const RegisterScreen = ({ navigation }) => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [errors, setErrors] = useState({});

    const LoginWithIcon = ({ iconName, onPress, buttonTitle }) => {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={{ backgroundColor: '#ddeff6', width: "46%", paddingVertical: 15, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, marginHorizontal: 10 }}>
                <Ionic name={iconName} style={{ fontSize: 26, color: 'black', marginBottom: 4 }} />
                <Text style={{ fontSize: 14, opacity: 0.4 }}>{buttonTitle}</Text>
            </TouchableOpacity>
        );
    }


    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result })
        },
        [dispatchFormState]
    )

    const getErrors = (email, password, confirmPassword, phone) => {
        const errors = {};

        if (!email) {
            errors.email = "Please Enter Email ";
        } else if (!email.includes('@') || !email.includes('.com')) {
            errors.email = 'Please Enter Valid Email';
        }

        if (!password) {
            errors.password = "Please Enter Password ";
        } else if (password.length < 8) {
            errors.password = 'Please Enter Password of  8 characters';
        }

        if (!confirmPassword) {
            errors.confirmPassword = "Please Enter Password ";
        } else if (confirmPassword.length < 8) {
            errors.confirmPassword = 'Please Correct Your Password Again';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Password not matched';
        }
        if (!phone) {
            errors.phone = "Please Enter Phone Number ";
        } else if (phone.length < 10) {
            errors.phone = 'Please Enter Valid Number';
        }


        if (email === "" || password === "" || phone === "" || confirmPassword === "") {
            Alert.alert(
                "Invalid Detials",
                "Please enter all the credentials",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }
        return errors;
    };


    const register = () => {
        const errors = getErrors(email, password, confirmPassword, phone);

        if (Object.keys(errors).length > 0) {
            setShowErrors(true);
            setErrors(showErrors && errors);
            console.log(errors);
        } else {
            setErrors({});
            setShowErrors(false);
            createUserWithEmailAndPassword(auth, email, password)
        }

        createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {

            const user = userCredentials._tokenResponse.email;
            const uid = auth.currentUser.uid;

            setDoc(doc(db, "users", `${uid}`), {
                email: user,
                phone: phone
            })

        })
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <PageContainer>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, marginHorizontal: 22, alignItems: 'center' }}>

                        {/* LOGO */}
                        <Image
                            source={images.logo}
                            resizeMode="contain"
                            style={{ width: 280, height: 280 }}
                        />

                        {/* Working With Nature  */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{ ...FONTS.h1, color: COLORS.primary }}
                            >
                                Working
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.h1,
                                    color: COLORS.black,
                                    marginHorizontal: 8,
                                }}
                            >
                                With
                            </Text>
                            <Text
                                style={{ ...FONTS.h1, color: COLORS.primary }}
                            >
                                Nature
                            </Text>
                        </View>


                        {/* Input  */}
                        <View style={{ marginVertical: 20 }}>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                                    Email
                                </Text>
                                <TextInput
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                    placeholder="Enter Email"
                                    placeholderTextColor={"black"}
                                    keyboardType='email-address'
                                    style={{
                                        fontSize: email ? 18 : 18,
                                        backgroundColor: '#ddeff6',
                                        borderColor: "transparent",
                                        borderBottomWidth: 1,
                                        marginVertical: 6,
                                        width: 300,
                                        padding: 15,
                                        borderRadius: 16
                                    }}
                                ></TextInput>
                                {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                            </View>


                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                                    Password
                                </Text>

                                <TextInput
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    secureTextEntry={false}
                                    placeholder="Password"
                                    maxLength={12}
                                    placeholderTextColor={"black"}
                                    keyboardType='visible-password'
                                    style={{
                                        fontSize: password ? 18 : 18,
                                        backgroundColor: '#ddeff6',
                                        borderColor: "transparent",
                                        borderBottomWidth: 1,
                                        marginVertical: 6,
                                        width: 300,
                                        padding: 15,
                                        borderRadius: 16
                                    }}
                                ></TextInput>
                                {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                                    Confirm Password
                                </Text>

                                <TextInput
                                    value={confirmPassword}
                                    onChangeText={(text) => setConfirmPassword(text)}
                                    secureTextEntry={false}
                                    placeholder="Confirm Password"
                                    placeholderTextColor={"black"}
                                    maxLength={12}
                                    keyboardType='visible-password'
                                    style={{
                                        fontSize: password ? 18 : 18,
                                        backgroundColor: '#ddeff6',
                                        borderColor: "transparent",
                                        borderBottomWidth: 1,
                                        marginVertical: 6,
                                        width: 300,
                                        padding: 15,
                                        borderRadius: 16
                                    }}

                                ></TextInput>
                                {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>}
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                                    Phone
                                </Text>

                                <TextInput
                                    value={phone}
                                    onChangeText={(text) => setPhone(text)}
                                    placeholder="Enter Phone Number"
                                    placeholderTextColor={"black"}
                                    style={{
                                        fontSize: password ? 18 : 18,
                                        backgroundColor: '#ddeff6',
                                        borderColor: "transparent",
                                        borderBottomWidth: 1,
                                        marginVertical: 6,
                                        width: 300,
                                        padding: 15,
                                        borderRadius: 16
                                    }}
                                ></TextInput>
                                {errors.phone && <Text style={{ color: 'red' }}>{errors.phone}</Text>}
                            </View>

                        </View>

                        <TouchableOpacity onPress={register}
                            activeOpacity={0.8}
                            style={{
                                width: '90%',
                                backgroundColor: "#89D7BC",
                                padding: 15,
                                borderRadius: 7,
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}>

                            <Text style={{ textAlign: "center", color: "white", fontSize: 17, fontWeight: "bold" }}>Register</Text>
                        </TouchableOpacity>



                        <TouchableOpacity activeOpacity={0.7} style={{ marginVertical: 20, flexDirection: 'row' }} onPress={() => navigation.navigate('LoginScreen')} >
                            <Text style={{ fontSize: 17, color: COLORS.black }}>
                                Already have an account ?{' '}
                            </Text>
                            <Text style={{ fontSize: 17, color: COLORS.primary }}>
                                Login
                            </Text>
                        </TouchableOpacity>


                        <SocialButtons />

                    </View>
                </ScrollView>

            </PageContainer>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({

})
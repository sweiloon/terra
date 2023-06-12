import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, images, FONTS, SIZES } from '../constants'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import Input from '../components/Input'
import Button from '../components/Button'
import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Ionic from 'react-native-vector-icons/Ionicons'
import SocialButtons from "../components/SocialButtons";

const initialState = {
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
}



const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [errors, setErrors] = useState({});
    const [hidePassword, setHidePassword] = useState(true);
    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const LoginWithIcon = ({ iconName, onPress, buttonTitle }) => {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={{ backgroundColor: '#ddeff6', width: "46%", paddingVertical: 15, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, marginHorizontal: 10 }}>
                <Ionic name={iconName} style={{ fontSize: 26, color: 'black', marginBottom: 4 }} />
                <Text style={{ fontSize: 14, opacity: 0.4 }}>{buttonTitle}</Text>
            </TouchableOpacity>
        );
    }


    const getErrors = (email, password) => {
        const errors = {};

        if (!email) {
            errors.email = "Please Enter Email ";
        } else if (!email.includes('@') || !email.includes('.com')) {
            errors.email = 'Please Valid Email';
        }

        if (!password) {
            errors.password = "Please Enter Password ";
        } else if (password.length < 8) {
            errors.password = 'Please Enter Password of  8 characters';
        }
        return errors;
    };


    const login = () => {
        const errors = getErrors(email, password);

        if (Object.keys(errors).length > 0) {
            setShowErrors(true);
            setErrors(showErrors && errors);
            console.log(errors);
        } else {
            setErrors({});
            setShowErrors(false);
            console.log('Already Log In');
        }

        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("user credential", userCredential);
            const user = userCredential.user;
            console.log("user details", user);
        })

    }

    useEffect(() => {
        try {
            const unsubscribe = auth.onAuthStateChanged((authUser) => {
                if (authUser) {
                    navigation.replace("StackNavigator");
                }
            });

            return unsubscribe;
        } catch (e) {
            console.log(e);
        }
    }, []);

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result })
        },
        [dispatchFormState]
    )


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
            <PageContainer>
                <ScrollView>
                    <View style={{ flex: 1, marginHorizontal: 22, alignItems: 'center' }} >

                        <Image source={images.logo} resizeMode="contain"
                            style={{ width: 280, height: 280, }}
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ ...FONTS.h1, color: COLORS.primary }}>
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
                            <Text style={{ ...FONTS.h1, color: COLORS.primary }}>
                                Nature
                            </Text>
                        </View>


                        {/*Email*/}
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                                Email
                            </Text>

                            <TextInput
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholder="Enter Email"
                                placeholderTextColor={"black"}
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

                        {/*Password*/}
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                                Password
                            </Text>

                            <View style={{ borderRadius: 10, backgroundColor: 'white', flexDirection: 'column', width: '100%' }}>
                                <TextInput
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    secureTextEntry={hidePassword ? true : false}
                                    placeholder="Password"
                                    maxLength={12}
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
                                        //flex: 1
                                    }}
                                ></TextInput>
                                {password.length > 0 && (
                                    <TouchableOpacity
                                        style={{ paddingHorizontal: 10, alignItems: 'flex-start', top: -42, marginLeft: 250 }}
                                        onPress={() => setHidePassword(!hidePassword)}
                                    >
                                        <Ionic name={hidePassword ? "eye-sharp" : "eye-off-sharp"} style={{ fontSize: 20, color: 'black' }} />
                                    </TouchableOpacity>
                                )}
                            </View>
                            {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                        </View>


                        <Button
                            title="LOGIN"
                            filled
                            onPress={login}
                            style={{
                                width: '100%',
                                marginTop: 10
                            }}
                        />


                        <TouchableOpacity
                            onPress={() => navigation.navigate('ResetPassword')}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    color: COLORS.primary,
                                    marginVertical: 12,
                                }}
                            >
                                Forgot Password
                            </Text>
                        </TouchableOpacity>


                        <View
                            style={{
                                marginVertical: 0,
                                flexDirection: 'row',
                                marginBottom: 15
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    color: COLORS.black,
                                }}
                            >
                                Don't have an account ?{' '}
                            </Text>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('RegisterScreen')}
                            >
                                <Text
                                    style={{
                                        fontSize: 17,
                                        color: COLORS.primary,
                                    }}
                                >
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <SocialButtons />
                    </View>
                </ScrollView>
            </PageContainer>
        </SafeAreaView>
    )
}


export default Login

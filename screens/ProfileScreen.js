import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    Feather,
    EvilIcons,
    Ionicons,
    Entypo,
} from '@expo/vector-icons'
import { COLORS, FONTS, SIZES, images } from '../constants'
import * as Location from 'expo-location'
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../firebase'
import FeatherIcon from 'react-native-vector-icons/Feather';


const ProfileScreen = ({ navigation }) => {
    //Current Location Part 
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Loading Location...')
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false)
    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    }, [])

    const signOutUser = () => {
        return auth.signOut();
    };

    const handleSignOut = () => {
        try {
            signOutUser();
            console.log("signed out");
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert('Location Services not enabled', 'Please enabled the location services', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
                { cancelable: false }
            );
        } else {
            setLocationServicesEnabled(enabled)
        }
    }
    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Allow the app to use location services', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
                { cancelable: false }
            );
        }

        const { coords } = await Location.getCurrentPositionAsync();
        // console.log(coords)
        if (coords) {
            const { latitude, longitude } = coords;

            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            //console.log(response)

            for (let item of response) {
                let address = `${item.name}${item.city}${item.postalCode}`
                setDisplayCurrentAddress(address)
            }
        }
    }
    // Currrent Location Part ^^^^^^^^^^

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 10, marginRight: 6 }}>
                    <Feather name="arrow-left" size={30} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h2, marginTop: 15 }} >Profile</Text>
                <TouchableOpacity onPress={() => console.log('Pressed')} style={{ marginTop: 10, marginRight: 6 }}>
                    <Feather name="edit" size={24} color={COLORS.black} />
                </TouchableOpacity>
            </View>
        )
    }

    function renderProfile() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    marginVertical: 16,
                }}
            >
                <Image
                    source={images.user7}
                    resizeMode="cover"
                    style={{
                        height: 130,
                        width: 130,
                        borderRadius: 70,
                    }}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        // handle onPress
                    }}>
                    <View style={styles.profileAction}>
                        <FeatherIcon color="#fff" name="edit-3" size={15} />
                    </View>
                </TouchableOpacity>


                <Text style={{ ...FONTS.h2, marginTop: 16 }}>Mohamad Bin Ali</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginVertical: SIZES.padding,
                        marginHorizontal: 15,
                        marginLeft: 1
                    }}
                >
                    <EvilIcons
                        name="location"
                        size={32}
                        color={COLORS.secondary}
                    />
                    <Text
                        style={{
                            ...FONTS.body4,
                            marginLeft: 8,
                            marginTop: 3
                        }}
                    >
                        {displayCurrentAddress}
                    </Text>
                </View>
            </View>
        )
    }

    function renderButtons() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            "Please Contact Us On",
                            "+6012-2132155",
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ],
                            { cancelable: false }
                        );
                    }}
                    style={{
                        backgroundColor: COLORS.secondary,
                        width: 150,
                        height: 50,
                        borderRadius: SIZES.padding,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}
                >
                    <Ionicons
                        name="person-add-outline"
                        size={24}
                        color={COLORS.white}
                    />
                    <Text
                        style={{

                            color: COLORS.white,
                            marginLeft: 12,
                            fontSize: 16
                        }}
                    >
                        Call Us
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={console.log('Press')}
                    style={{
                        backgroundColor: COLORS.secondary,
                        width: 150,
                        height: 50,
                        borderRadius: SIZES.padding,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Entypo name="forward" size={24} color={COLORS.white} />
                    <Text
                        style={{
                            fontSize: 16,
                            color: COLORS.white,
                            marginLeft: 12,
                        }}
                    >
                        Request
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    /*function renderFeatures() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginVertical: 12,
                }}
            >
                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ ...FONTS.h2 }}>Paddy</Text>
                    <Text style={{ ...FONTS.body3 }}>Crop Type</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ ...FONTS.h2 }}>05</Text>
                    <Text style={{ ...FONTS.body3 }}>Field</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ ...FONTS.h2 }}>02</Text>
                    <Text style={{ ...FONTS.body3 }}>Farm</Text>
                </View>
            </View>
        )
    }*/

    function renderSettings() {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    marginTop: 15
                }}
            >
                {/*Alert 
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 8,

                    }}
                    onPress={() => console.log('Pressed')}
                >
                    <MaterialCommunityIcons
                        name="calendar-clock-outline"
                        size={27}
                        color={COLORS.secondary}
                    />
                    <Text
                        style={{
                            ...FONTS.body2,
                            marginLeft: 24,
                        }}
                    >
                        Alert
                    </Text>
                </TouchableOpacity>*/}

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 8,
                    }}
                    onPress={() => console.log('P')}
                >
                    <Ionicons
                        name="share-outline"
                        size={27}
                        color={COLORS.secondary}
                    />
                    <Text
                        style={{
                            ...FONTS.body2,
                            marginLeft: 24,
                        }}
                    >
                        Invite a friend
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 12,
                    }}
                    onPress={() => console.log('Pressed')}
                >
                    <Feather name="info" size={27} color={COLORS.secondary} />
                    <Text
                        style={{
                            ...FONTS.body2,
                            marginLeft: 24,
                        }}
                    >
                        Get help
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 12,
                    }}
                    onPress={() => navigation.navigate('Settings')}
                >

                    <Feather name="settings" size={27} color={COLORS.secondary} />
                    <Text
                        style={{
                            ...FONTS.body2,
                            marginLeft: 24,
                        }}
                    >
                        Settings
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={styles.logoutbutton} onPress={() => handleSignOut()}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Logout</Text>
                </TouchableOpacity>

            </View>
        )
    }


    return (
        <LinearGradient style={{ flex: 1 }} colors={['rgba(226,165,173,0.4)', 'rgba(252,249,240,0.4)']}>
            <SafeAreaView>
                <View style={{ marginHorizontal: 22 }}>
                    {renderHeader()}
                    {renderProfile()}
                    {renderButtons()}
                    {renderSettings()}
                </View>
            </SafeAreaView>
        </LinearGradient>

    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    logoutbutton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        marginTop: 25,
        width: '100%',
        height: '16%',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOffset: {
                    width: 3,
                    height: 5,
                },
                shadowOpacity: 1,
                shadowRadius: 4,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    profileAction: {
        position: 'absolute',
        right: -50,
        bottom: -5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 9999,
        backgroundColor: '#89D7BC',
    },
})


import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    Feather,
    EvilIcons,
    Ionicons,
    Entypo,
} from '@expo/vector-icons'
import { COLORS, FONTS, SIZES, images } from '../../constants'
import { LinearGradient } from 'expo-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Farmdetail = ({ navigation }) => {

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                }}
            >
                <Text></Text>
                <Text style={{ ...FONTS.h2, marginTop: 15, marginLeft: 32 }} >Farm Detail</Text>
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
                    source={images.farmimage}
                    resizeMode="cover"
                    style={{
                        height: 160,
                        width: 330,
                        borderRadius: 10,
                    }}
                />

                <Text style={{ ...FONTS.h2, marginTop: 16 }}>Happy Farm</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginVertical: SIZES.padding,
                        marginHorizontal: 15,
                        marginLeft: 1
                    }}
                >
                    <FontAwesome5 name="border-style" size={24} color={COLORS.black} />
                    <Text
                        style={{
                            fontSize: 20,
                            marginLeft: 10

                        }}
                    >
                        Zone 1 / Zone 2
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
                    onPress={() => navigation.navigate('Newfarm')}
                    style={{
                        backgroundColor: COLORS.secondary,
                        width: 160,
                        height: 60,
                        borderRadius: SIZES.padding,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}
                >
                    <FontAwesome5
                        name="warehouse"
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
                        Add Farm
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Newzone')}
                    style={{
                        backgroundColor: COLORS.secondary,
                        width: 160,
                        height: 60,
                        borderRadius: SIZES.padding,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <FontAwesome5 name="border-style" size={24} color={COLORS.white} />
                    <Text
                        style={{
                            fontSize: 16,
                            color: COLORS.white,
                            marginLeft: 12,
                        }}
                    >
                        Create Zone
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }


    function renderSettings() {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    marginTop: 20,
                    marginLeft: 20
                }}
            >

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 8,
                    }}
                    onPress={() => console.log('P')}
                >
                    <Ionicons
                        name="md-leaf-outline"
                        size={27}
                        color={COLORS.secondary}
                    />
                    <Text
                        style={{
                            ...FONTS.body2,
                            marginLeft: 24,
                        }}
                    >
                        Crop Type:
                    </Text>
                    <Text
                        style={{
                            ...FONTS.body2,
                            marginLeft: 14,
                        }}
                    >
                        Paddy
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
                    <Ionicons name="resize" size={27} color={COLORS.secondary} />
                    <Text
                        style={{
                            ...FONTS.body2,
                            marginLeft: 24,
                        }}
                    >
                        Land Size:
                    </Text>
                    <Text
                        style={{
                            ...FONTS.body2,
                            marginLeft: 24,
                        }}
                    >
                        14.5 Acre
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 12,
                    }}

                >

                    <FontAwesome5 name="border-style" size={24} color={COLORS.secondary} />
                    <Text
                        style={{
                            ...FONTS.body2,
                            marginLeft: 24,
                        }}
                    >
                        Created Zone List
                    </Text>
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

export default Farmdetail

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


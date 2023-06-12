import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native'
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
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase'


const Newfarm = ({ navigation }) => {
    const [newItem, setNewItem] = React.useState({
        farmname: '',
        croptype: '',
        location: '',
        createdAt: new Date(),
    });
    const onSend = async () => {
        const docRef = await addDoc(collection(database, 'products'), newItem);
        navigation.goBack();
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text></Text>
                <Text style={{ ...FONTS.h2, marginTop: 15, marginLeft: 32 }} >Create New Farm</Text>
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
                <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                        height: 160,
                        width: 330,
                        borderRadius: 10,
                        borderWidth: 2,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Feather name="plus" size={40} color={COLORS.black} />

                </TouchableOpacity>


            </View>
        )
    }

    function renderSettings() {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    marginTop: 15
                }}
            >

                <View>
                    <Text style={{ fontSize: 18, marginTop: 14 }}>Farm Name</Text>
                    <TouchableOpacity
                        style={styles.inputBtn}

                        activeOpacity={0.9}

                    >
                        <TextInput style={{ fontSize: 17 }} placeholder="Happy Farm" onChangeText={(text) => setNewItem({ ...newItem, farmname: text })}   ></TextInput>
                    </TouchableOpacity>
                </View>




                <View>
                    <Text style={{ fontSize: 18, marginTop: 14 }}>Crop Type</Text>
                    <TouchableOpacity
                        style={styles.inputBtn}

                        activeOpacity={0.9}

                    >
                        <TextInput style={{ fontSize: 17 }} placeholder="Paddy" onChangeText={(text) => setNewItem({ ...newItem, croptype: text })}  ></TextInput>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={{ fontSize: 18, marginTop: 14 }}>Location</Text>
                    <TouchableOpacity
                        style={styles.inputBtn}

                        activeOpacity={0.9}

                    >
                        <TextInput style={{ fontSize: 17 }} placeholder="Address" onChangeText={(text) => setNewItem({ ...newItem, location: text })}   ></TextInput>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity activeOpacity={0.8} style={styles.logoutbutton} onPress={() => console.log('Press')}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Add Farm</Text>
                </TouchableOpacity>

            </View>
        )
    }


    return (
        <LinearGradient style={{ flex: 1 }} colors={['rgba(137,215,188,0.4)', 'rgba(153,195,217,0.4)']}>
            <SafeAreaView>
                <View style={{ marginHorizontal: 22 }}>
                    {renderHeader()}
                    {renderProfile()}
                    {renderSettings()}
                </View>
            </SafeAreaView>
        </LinearGradient>

    )
}

export default Newfarm

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
    inputBtn: {
        borderRadius: 20,
        height: 55,
        paddingLeft: 8,
        fontSize: 18,
        justifyContent: "center",
        marginTop: 4,
        backgroundColor: 'white'
    },
})


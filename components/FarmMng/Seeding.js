import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Modal, TextInput } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase'


const Seeding = () => {
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(
        today.setDate(today.getDate() - 365),
        "YYYY/MM/DD"
    );
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [startedDate, setStartedDate] = useState("2023/06/06");

    function handleChangeStartDate(propDate) {
        setStartedDate(propDate);
    }

    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };
    const [newItem, setNewItem] = React.useState({
        startingdate: '',
        selectzone: '',
        croptype: '',
        quantity: '',
        remark: '',
        isDone: false,
        createdAt: new Date(),
    });
    const onSend = async () => {
        const docRef = await addDoc(collection(database, 'products'), newItem);
        navigation.goBack();
    }


    return (
        <LinearGradient style={{ flex: 1 }} colors={['rgba(137,215,188,0.4)', 'rgba(153,195,217,0.4)']}>
            <SafeAreaView>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : ""}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Text style={{ fontSize: 30, fontWeight: 'bold', padding: 20 }}>Seeding </Text>
                        <View style={{ flex: 1, alignItems: "center" }}>

                            <View style={{ width: "100%", paddingHorizontal: 30 }}>
                                <View>
                                    <Text style={{ fontSize: 18 }}>Starting Date</Text>
                                    <TouchableOpacity
                                        style={styles.inputBtn}
                                        onPress={handleOnPressStartDate}
                                        activeOpacity={0.8}

                                    >
                                        <Text style={{ fontSize: 17 }} >{selectedStartDate}</Text>
                                    </TouchableOpacity>
                                </View>


                                <View>
                                    <Text style={{ fontSize: 18, marginTop: 14 }}>Select Zone</Text>
                                    <TouchableOpacity
                                        style={styles.inputBtn}
                                        activeOpacity={0.9}

                                    >
                                        <TextInput style={{ fontSize: 17 }} placeholder="Zone" onChangeText={(text) => setNewItem({ ...newItem, selectzone: text })}  ></TextInput>
                                    </TouchableOpacity>
                                </View>



                                <View>
                                    <Text style={{ fontSize: 18, marginTop: 14 }}>Crop Type</Text>
                                    <TouchableOpacity
                                        style={styles.inputBtn}

                                        activeOpacity={0.9}

                                    >
                                        <TextInput style={{ fontSize: 17 }} placeholder="Paddy" onChangeText={(text) => setNewItem({ ...newItem, croptype: text })}   ></TextInput>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18, marginTop: 14 }}>Quatity</Text>
                                    <TouchableOpacity
                                        style={styles.inputBtn}

                                        activeOpacity={0.9}

                                    >
                                        <TextInput style={{ fontSize: 17 }} placeholder="(tonnes)" onChangeText={(text) => setNewItem({ ...newItem, quantity: text })}  ></TextInput>
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <Text style={{ fontSize: 18, marginTop: 14 }}>Remark</Text>
                                    <TouchableOpacity
                                        style={styles.inputBtn}

                                        activeOpacity={0.9}

                                    >
                                        <TextInput style={{ fontSize: 17 }} onChangeText={(text) => setNewItem({ ...newItem, remark: text })}  ></TextInput>
                                    </TouchableOpacity>
                                </View>


                                <TouchableOpacity
                                    onPress={() => console.log("Submit data")}
                                    style={styles.submitBtn}
                                >
                                    <Text style={{ fontSize: 20, color: "white" }}>Submit</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Create modal for date picker */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={openStartDatePicker}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <DatePicker
                                            mode="calendar"
                                            minimumDate={startDate}
                                            selected={startedDate}
                                            onDateChanged={handleChangeStartDate}
                                            onSelectedChange={(date) => setSelectedStartDate(date)}
                                            options={{
                                                backgroundColor: "#080516",
                                                textHeaderColor: "#469ab6",
                                                textDefaultColor: "#FFFFFF",
                                                selectedTextColor: "#FFF",
                                                mainColor: "#469ab6",
                                                textSecondaryColor: "#FFFFFF",
                                                borderColor: "rgba(122, 146, 165, 0.1)",
                                            }}
                                        />

                                        <TouchableOpacity onPress={handleOnPressStartDate}>
                                            <Text style={{ color: "white" }}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}

export default Seeding

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 36,
        marginVertical: 60,
        color: "#111",
    },
    textSubHeader: {
        fontSize: 25,
        color: "#111",
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
    submitBtn: {
        backgroundColor: "#342342",
        paddingVertical: 22,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        paddingVertical: 12,
        marginBottom: 60,
        marginTop: 40
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "#080516",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 35,
        width: "90%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
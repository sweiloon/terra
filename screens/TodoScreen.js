import { Pressable, StyleSheet, Text, View, Alert, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Agenda, Calendar, CalendarList, AgendaEntry } from 'react-native-calendars';
import events from '../assets/data/events.json'



const TodoScreen = () => {

    const renderItem = (reservation, isFirst) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? "black" : "#43515c";

        return (
            <Pressable
                style={[styles.item, { height: reservation.height }]}
                onPress={() => navigation.navigate("Modal", { id: reservation.id })}
            >
                <Text style={{ fontSize, color }}>{reservation.name}</Text>
            </Pressable>
        );
    };


    return (

        <SafeAreaView style={styles.container} >
            < Agenda items={events} renderItem={renderItem} selected='2023-07-19' />
        </SafeAreaView >

    )
}

export default TodoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    item: {
        backgroundColor: "white",
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
    }
})
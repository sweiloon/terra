import { StyleSheet, Text, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto'


const LocationFilter = () => {
    const initialMapState = {
        categories: [
            {
                name: 'Harvest',
                icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
            },
            {
                name: 'Farm',
                icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
            },
            {
                name: 'Restaurant',
                icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
            },
            {
                name: 'Dineouts',
                icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
            },
            {
                name: 'Snacks Corner',
                icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
            },
        ]

    }
    const [state, setState] = React.useState(initialMapState);

    return (
        <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            height={60}
            style={styles.chipsScrollView}
            contentInset={{ //ios only
                top: 0,
                left: 0,
                bottom: 0,
                right: 20
            }}
            contentContainerStyle={{
                paddingRight: Platform.OS === 'android' ? 20 : 0
            }}

        >
            {state.categories.map((category, index) => (
                <TouchableOpacity activeOpacity={0.8} key={index} style={styles.chipsItem}>
                    {category.icon}
                    <Text>{category.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default LocationFilter

const styles = StyleSheet.create({
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 92 : 80,
        paddingHorizontal: 15,

    },

    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        height: 35,
        shadowColor: '#00BA91',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 12,
    }
})
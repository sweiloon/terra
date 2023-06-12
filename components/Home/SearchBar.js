import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import { COLORS, FONTS, SIZES, images } from '../../constants'


const SearchBar = ({ navigation }) => {
    return (
        <View style={styles.searchContainer}>
            <GooglePlacesAutocomplete
                styles={{ textInput: styles.input }}
                placeholder='Find Something Green'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: "AIzaSyAB5NVPeZjIn2mril7ohmuii24wzDB3g4c",
                    language: 'en',
                }}
            />


            <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('Press')}>
                <Image
                    source={images.user7}
                    resizeMode="cover"
                    style={{
                        height: 48,
                        width: 48,
                        borderRadius: 70,
                        bottom: 3,

                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 7,
        position: "absolute",
        width: "92%",
        height: "8%",
        backgroundColor: "white",
        shadowColor: "#00BA91",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        padding: 8,
        borderRadius: 30,
        top: Constants.statusBarHeight,
        alignSelf: 'flex-start',
        elevation: 10,
        marginLeft: 19,
        flexDirection: 'row'

    },
    input: {
        borderColor: "#898A8D",
        borderRadius: 20,
        fontSize: 18,
        height: '120%'
    }

})
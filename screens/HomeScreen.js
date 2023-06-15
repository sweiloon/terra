import { ScrollView, StyleSheet, Text, View, Animated, Image, TouchableOpacity, Dimensions, Platform, Alert, Button, Pressable } from 'react-native'
import React, { useState, useEffect, Component } from 'react'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { markers, mapDarkStyle, mapStandardStyle } from '../model/mapData';
import StarRating from '../components/StarRating';
import SearchBar from './SearchBar';
import LocationFilter from '../components/Home/LocationFilter';
import { COLORS, FONTS, SIZES, images } from '../constants'




const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.6;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const HomeScreen = ({ navigation }) => {
    const initialMapState = {
        markers,
        region: {
            latitude: 3.1201724145249194,
            latitudeDelta: 0.11970560284827148,
            longitude: 101.70245714485645,
            longitudeDelta: 0.06743408739569645
        }
    }
    const [state, setState] = React.useState(initialMapState);
    const [location, setLocation] = useState();
    const [address, setAddress] = useState();


    Location.setGoogleApiKey('AIzaSyAB5NVPeZjIn2mril7ohmuii24wzDB3g4c');

    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Please grant location permissions");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            console.log("Location:");
            console.log(currentLocation);
        };
        getPermissions();
    }, []);

    const _map = React.useRef();
    const _scrollView = React.useRef(null);

    function renderProfile() {
        return (
            <View
                style={{
                    top: 33,
                    left: 342,
                    position: "absolute",
                    zIndex: 1
                }}
            >
                <Pressable activeOpacity={0.9} onPress={() => navigation.navigate('MyProfile')}>
                    <Image
                        source={images.user7}
                        resizeMode="cover"
                        style={{
                            height: 52,
                            width: 52,
                            borderRadius: 70,
                            bottom: 3
                        }}
                    />
                </Pressable>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={state.region}
                showsUserLocation={true}
                showsMyLocationButton={true}
                mapPadding={{ top: 0, right: 0, bottom: 310, left: 30, }}
            >

                <Marker
                    coordinate={{
                        latitude: 3.12894,
                        longitude: 101.72124
                    }}
                    image={require('../assets/icons/map_marker.png')}
                >
                    <Callout tooltip>
                        <View>
                            <View style={{ flexDirection: 'column', alignSelf: 'flex-start', borderRadius: 8, padding: 8, width: 130, backgroundColor: 'white', height: 80 }}>
                                <Text style={{ fontSize: 15 }}>Best Office(KL)</Text>
                                <Image style={{ width: 85, height: 45, resizeMode: 'contain', alignSelf: 'center' }} source={require('../assets/icons/best.png')} />
                            </View>
                            <View style={{ backgroundColor: 'transparent', borderColor: 'transparent', borderTopColor: '#007a87', borderWidth: 16, alignSelf: 'center', marginTop: -0.5 }} />
                            <View style={{ backgroundColor: 'transparent', borderColor: 'transparent', borderTopColor: '#fff', borderWidth: 16, alignSelf: 'center', marginTop: -32 }} />
                        </View>
                    </Callout>
                </Marker>


            </MapView>
            {renderProfile()}



            <SearchBar />

            <LocationFilter />


            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
                    paddingVertical: 60
                }}
            >
                {state.markers.map((marker, index) => (
                    <View style={styles.card} key={index}>
                        <Image
                            source={marker.image}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.textContent}>
                            <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                            <StarRating ratings={marker.rating} reviews={marker.reviews} />
                            <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                            <View style={styles.button}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            "Function Not Available Yet",
                                            "Coming soon",
                                            [
                                                { text: "OK", onPress: () => console.log("OK Pressed") }
                                            ],
                                            { cancelable: false }
                                        );
                                    }}
                                    style={[styles.signIn, {
                                        borderColor: '#FF6347',
                                        borderWidth: 1
                                    }]}
                                >
                                    <Text style={[styles.textSign, {
                                        color: '#FF6347'
                                    }]}>Visit Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                ))}
            </Animated.ScrollView>

        </View >
    )
}


export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        backgroundColor: '#F2F5FA',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: '100%',
    },
    scrollView: {
        position: 'absolute',
        bottom: 0,
        left: 10,
        right: 0,
        paddingVertical: 15,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderRadius: 15,
        marginHorizontal: 8,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.6,
        shadowOffset: { x: 3, y: -3 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: 'visible'
    },
    cardImage: {
        flex: 4,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 3,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        //marginTop: 2,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})
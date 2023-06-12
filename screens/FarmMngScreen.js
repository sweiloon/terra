import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    Pressable,
    StatusBar,
    TextInput
} from "react-native";
import { images, FONTS, Icons } from '../constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../app/constants';
import FeatherIcon from 'react-native-vector-icons/Feather';

let jobmanagement = [
    {
        id: "0",
        image: require('../assets/images/harvest.png'),
        name: "Harvest",

    },
    {
        id: "11",
        image: require('../assets/images/seed.png'),
        name: "Seeding"
    },
    {
        id: "12",
        image: require('../assets/images/fertilize.png'),
        name: "Fertilize",

    },
    {
        id: "13",
        image: require('../assets/images/consume.png'),
        name: "Consumption",
    }

];


const FarmMngScreen = ({ navigation }) => {

    function renderButtons() {
        return (
            <View style={{
                flexDirection: 'column'
            }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginVertical: -10,
                        marginTop: 5
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Harvest')}
                        activeOpacity={0.8}
                        style={{
                            backgroundColor: 'white',
                            width: 0.5 * SIZES.width - 45,
                            margin: 8,
                            marginLeft: 30,
                            height: 160,
                            borderRadius: 10,
                            padding: 15,
                            shadowColor: 'lightgrey',
                            shadowOpacity: 1,
                            shadowOffset: {
                                width: 3,
                                height: 3
                            },
                            elevation: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Image style={{ width: '70%', height: '70%', marginVertical: 6 }} source={require('../assets/images/harvest.png')} />
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: 'center'
                            }}
                        >
                            Harvest
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Seeding')}
                        activeOpacity={0.8}
                        style={{
                            backgroundColor: 'white',
                            width: 0.5 * SIZES.width - 45,
                            margin: 8,
                            marginRight: 30,
                            height: 160,
                            borderRadius: 10,
                            padding: 15,
                            shadowColor: 'lightgrey',
                            shadowOpacity: 1,
                            shadowOffset: {
                                width: 3,
                                height: 3
                            },
                            elevation: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Image style={{ width: '70%', height: '70%', marginVertical: 6 }} source={require('../assets/images/seed.png')} />
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: 'center'
                            }}
                        >
                            Seeding
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',

                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Fertilize')}
                        activeOpacity={0.8}
                        style={{
                            backgroundColor: 'white',
                            width: 0.5 * SIZES.width - 45,
                            margin: 8,
                            marginLeft: 30,
                            height: 160,
                            borderRadius: 10,
                            padding: 15,
                            shadowColor: 'lightgrey',
                            shadowOpacity: 1,
                            shadowOffset: {
                                width: 3,
                                height: 3
                            },
                            elevation: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Image style={{ width: '70%', height: '70%', marginVertical: 6 }} source={require('../assets/images/fertilize.png')} />
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: 'center'
                            }}
                        >
                            Fertilize
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Consumption')}
                        activeOpacity={0.8}
                        style={{
                            backgroundColor: 'white',
                            width: 0.5 * SIZES.width - 45,
                            margin: 8,
                            marginRight: 30,
                            height: 160,
                            borderRadius: 10,
                            padding: 15,
                            shadowColor: 'lightgrey',
                            shadowOpacity: 1,
                            shadowOffset: {
                                width: 3,
                                height: 3
                            },
                            elevation: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Image style={{ width: '70%', height: '70%', marginVertical: 6 }} source={require('../assets/images/consume.png')} />
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: 'center'
                            }}
                        >
                            Consumption
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                barStyle="dark-content"
                animated={true}
            />

            <View
                style={{
                    width: '100%',
                    height: 0.45 * SIZES.height,
                    padding: 20,
                    position: 'relative',
                    top: -20,

                }}>

                {/*BackgroundImage*/}

                <Image
                    source={require('../assets/images/BgOrange.png')}
                    style={{
                        position: 'absolute',
                        top: 60,
                        left: -50,
                    }}
                />

                {/*TopRight Circle*/}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        top: -15
                    }}>
                    <View
                        style={{
                            width: 60,
                            height: 60,
                            backgroundColor: COLORS.accent + '25',
                            marginRight: 0,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 5
                        }}>
                    </View>
                </View>

                {/*MiddleRight Circle*/}
                <View
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: COLORS.accent + '25',
                        position: 'absolute',
                        right: -30,
                        bottom: 50,
                    }}></View>


                {/*Header*/}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        borderRadius: 15,
                        padding: 5,
                        shadowColor: '#9e9898',
                        elevation: 10,
                        shadowColor: 'lightgrey',
                        shadowOpacity: 1,
                        shadowOffset: {
                            width: 3,
                            height: 3
                        },
                        top: -55

                    }}>
                    <Image
                        source={images.user7}
                        style={{ width: 70, height: 70, resizeMode: 'cover', borderRadius: 15 }}
                    />
                    <View>
                        <Text style={{ fontWeight: '500', fontSize: 16, paddingLeft: 20, color: 'grey' }}>Welcome</Text>
                        <Text style={{ paddingLeft: 20, fontSize: 22 }}>Mohamad Ali</Text>
                    </View>
                </View>

                {/*Card*/}

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Farmdetail')}
                    style={{
                        height: 130,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        backgroundColor: COLORS.white,
                        borderRadius: 15,
                        padding: 12,
                        shadowColor: '#9e9898',
                        elevation: 10,
                        shadowColor: 'lightgrey',
                        shadowOpacity: 1,
                        shadowOffset: {
                            width: 3,
                            height: 3
                        },
                        top: -45
                    }}>


                    <Image
                        source={images.farmimage}
                        style={{ width: 100, height: 100, resizeMode: 'cover', borderRadius: 15, }}
                    />

                    <View>
                        <Text style={{ fontWeight: '800', fontSize: 22, paddingLeft: 20 }}>Happy Farm</Text>
                        <Text style={{ paddingLeft: 20, fontSize: 18 }}>Zone1</Text>
                        <Text style={{ paddingLeft: 20, fontSize: 18, borderColor: 'black', borderTopWidth: 1 }}>Location</Text>
                        <Text style={{ paddingLeft: 20, fontSize: 18 }}>Weather Today: Suuny</Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Newfarm')}
                    >
                        <View style={styles.profileAction}>
                            <FeatherIcon color="#fff" name="plus-circle" size={35} />
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>

                <View  >
                    <Text style={{ fontWeight: '600', fontSize: 18, top: -15 }}>Farm Management </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Recorded')}
                    >
                        <View style={styles.recordAction}>
                            <MaterialCommunityIcons color="#fff" name="book-open-outline" size={35} />
                        </View>
                    </TouchableOpacity>
                </View>
                {renderButtons()}
            </View>


        </SafeAreaView >
    );
}

export default FarmMngScreen

const styles = StyleSheet.create({
    profileAction: {
        position: 'absolute',
        right: -55,
        bottom: 11,
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        height: 48,
        borderRadius: 9999,
        backgroundColor: '#3D708F',
    },
    recordAction: {
        position: 'absolute',
        right: 5,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        height: 48,
        borderRadius: 9999,
        backgroundColor: '#3D708F',
    },

})




{/*<FlatList
data={jobmanagement}
style={{
    paddingHorizontal: 20,
    marginTop: -60,
}}
contentContainerStyle={{
    flex: 1,
    alignItems: 'center',
}}
showsVerticalScrollIndicator={false}
numColumns={2}
keyExtractor={item => item.id}
renderItem={({ item }) => <ExerciseItem exercise={item} />}
/>*/}
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { images, COLORS, FONTS, SIZES } from '../constants'
import Button from '../components/Button'


const GetStarted = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <PageContainer>
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 22,
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        style={{

                            width: 280,
                            height: 280,
                            marginBottom: 0

                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
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

                    <View style={{ marginVertical: 40 }}>
                        <Text
                            style={{
                                ...FONTS.body2,
                                textAlign: 'center',
                            }}
                        >
                            Everything Start From Soil
                        </Text>
                    </View>


                    <Button
                        title="LOGIN"
                        onPress={() => navigation.navigate('LoginScreen')}
                        style={{
                            width: '100%',
                            marginBottom: SIZES.padding,
                        }}
                    />

                    <Button
                        title="REGISTER"
                        onPress={() => navigation.navigate('RegisterScreen')}
                        filled
                        style={{
                            width: '100%',
                        }}
                    />

                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default GetStarted

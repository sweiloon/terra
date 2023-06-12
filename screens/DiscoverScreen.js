import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles'
import { getCategoryName } from "../src/data/MockDataAPI";
import { recipes } from '../src/data/dataArrays';


const DiscoverScreen = ({ navigation }) => {
    const onPressRecipe = (item) => {
        navigation.navigate("Recipe", { item });
    };

    const renderRecipes = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPressRecipe(item)}
            contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
            }}

        >
            <View style={styles.container}>
                <Image style={styles.photo} source={{ uri: item.photo_url }} />
                <Text style={styles.title}> {item.title}</Text>
                <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <LinearGradient style={{ flex: 1 }} colors={['rgba(137,215,188,0.4)', 'rgba(153,195,217,0.4)']}>
            <SafeAreaView>
                <Text style={{ fontSize: 30, padding: 10, fontWeight: 'bold' }}>Discover</Text>
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    numColumns={2} data={recipes}
                    renderItem={renderRecipes}
                    keyExtractor={(item) => `${item.recipeId}`}
                    style={{ marginBottom: 123 }}
                />

            </SafeAreaView>
        </LinearGradient>
    );
};


export default DiscoverScreen;


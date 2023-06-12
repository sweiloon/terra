import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import React from 'react'

const Services = () => {

  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/512/1037/1037111.png",
      name: "Harvest",

    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/512/4499/4499003.png",
      name: "Seeding"
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/512/1465/1465973.png",
      name: "Fertilize",

    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/512/2499/2499645.png",
      name: "Consume",
    },

  ];
  return (
    <View style={{ padding: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service, index) => (
          <Pressable style={{ margin: 10, backgroundColor: "white", padding: 20, borderRadius: 7 }} key={index}>
            <Image source={{ uri: service.image }} style={{ width: 70, height: 70 }} />

            <Text style={{ textAlign: "center", marginTop: 10 }}>{service.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})
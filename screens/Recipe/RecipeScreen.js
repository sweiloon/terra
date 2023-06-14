import React, { useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  getIngredientName,
  getCategoryName,
  getCategoryById,
} from "../../src/data/MockDataAPI";
import {
  Feather
} from '@expo/vector-icons'

const { width: viewportWidth } = Dimensions.get("window");

const RecipeScreen = (props) => {
  const { navigation, route } = props;
  const item = route.params?.item;

  const [activeSlide, setActiveSlide] = useState(0);
  const slider1Ref = useRef();

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer} >
        <View style={styles.carousel}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 10, marginRight: 6, padding: 10 }}>
            <Feather name="arrow-left" size={26} color='black' />
          </TouchableOpacity>
          <Carousel
            ref={slider1Ref}
            data={item.photosArray}
            renderItem={renderImage}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={0}
            loop={false}
            autoplay={false}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => setActiveSlide(0)}
          />
          <Pagination
            dotsLength={item.photosArray.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor="black"
            dotStyle={styles.paginationDot}
            inactiveDotColor="black"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={slider1Ref.current}
            tappableDots={!!slider1Ref.current}
          />
        </View>
      </View>



      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.title}</Text>

        <View style={styles.infoContainer}>
          <TouchableHighlight
            onPress={() =>
              console.log('Pressed')
            }
          >
            <Text style={styles.category}>
              {getCategoryName(item.categoryId).toUpperCase()}
            </Text>
          </TouchableHighlight>
        </View>


        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View>
      </View>

    </ScrollView>
  );
}

export default RecipeScreen;
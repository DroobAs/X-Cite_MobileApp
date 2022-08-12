import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";

import {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
} from "./../../../assets/slider";

const { width, height } = Dimensions.get("window");

const newImage = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
];
const image = (index) => ({ image: newImage[index % newImage.length] });

const items = Array.from(Array(20)).map((_, index) => image(index));

export default () => {
  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={3}
      index={19}
      autoplayLoop
      autoplayInvertDirection
      data={items}
      renderItem={({ item }) => (
        <Image style={styles.image} source={item.image} />
      )}
      showPagination
      paginationStyle={{ paddingTop: 14 }}
      paginationStyleItem={{ margin: 3, marginLeft: 2, marginRight: 2 }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: height * 0.2,
    width,
    marginBottom: 12,
  },
});

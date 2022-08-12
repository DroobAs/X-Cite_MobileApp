import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";

const { width, height } = Dimensions.get("window");
const firstImg =
  "https://m.xcite.com/media/wysiwyg/nasima/17012022-Apple-PO-DP-EN.jpg";
const secondImg =
  "https://m.xcite.com/media/wysiwyg/1Meshaiei/05052022-iPhone13Pro-DP-EN.jpg";
const thirdImg =
  "https://m.xcite.com/media/wysiwyg/1Meshaiei/05052022-iPadFamily-DP-EN.jpg";
const forthImg =
  "https://m.xcite.com/media/wysiwyg/1Meshaiei/05052022-AppleWatch-DP-EN.jpg";
const newImage = [firstImg, secondImg, thirdImg, forthImg];
const image = (index) => ({ image: newImage[index % newImage.length] });

const items = Array.from(Array(4)).map((_, index) => image(index));
const randersImage = ({ item }) => (
  <View style={{ paddingRight: 20, marginRight: 12, marginBottom: 70, flex: 1 }}>
    <Image style={styles.image} source={{ uri: item.image }} />
  </View>
);
export default () => {
  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={3}
      index={0}
      autoplayLoop
      autoplayInvertDirection
      data={items}
      renderItem={randersImage}
      showPagination
      paginationStyle={{ paddingTop: 12 }}
      paginationStyleItem={{ margin: 12, marginLeft: 2, marginRight: 2 }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: height * 0.2,
    width,
    padding: 5,
    resizeMode: "cover",
  },
});

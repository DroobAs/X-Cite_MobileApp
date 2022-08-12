import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
// import AppleSlider from "./AppleSlider/AppleSlider";
import { Card } from "@rneui/themed";
import { Button } from "@rneui/themed";

const Apple = ({ navigation }) => {
  console.log(navigation);
  const { width, height } = Dimensions.get("screen");
  const cardInfo = [
    {
      name: "iPhone",
      imgUrl:
        "https://m.xcite.com/media/wysiwyg/Apple_Shop/Apple-Prd-iPhone-13.jpg",
      comp: "Iphone",
    },
    {
      name: "Mac",
      imgUrl: "https://m.xcite.com/media/wysiwyg/Apple_Shop/Apple-Prd-Mac.jpg",
      comp: "Mac",
    },
    {
      name: "iPad",
      imgUrl:
        "https://m.xcite.com/media/wysiwyg/Apple_Shop/Apple-Prd-iPad-2022.jpg",
      comp: "IPad",
    },
    {
      name: "Apple Watch",
      imgUrl: "https://m.xcite.com/media/wysiwyg/Apple_Shop/Apple-Watch-28.jpg",
      comp: "AppleWatch",
    },
    {
      name: "AirPods",
      imgUrl:
        "https://m.xcite.com/media/wysiwyg/Apple_Shop/Apple-Prd-AirPods.jpg",
      comp: "AirPods",
    },
    {
      name: "Apple Tv",
      imgUrl:
        "https://m.xcite.com/media/wysiwyg/Apple_Shop/Apple-Prd-AppleTv.jpg",
      comp: "AppleTv",
    },
    {
      name: "Air Tag",
      imgUrl:
        "https://m.xcite.com/media/wysiwyg/Apple_Shop/Apple-Prd-AirTag.jpg",
      comp: "AirTag",
    },
    {
      name: "Beats",
      imgUrl:
        "https://m.xcite.com/media/wysiwyg/Apple_Shop/Apple-Prd-Beats.jpg",
      comp: "Beats",
    },
  ];
  // cards view
  const cards = ({ item }) => {
    return (
      <Card
        containerStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "700" }}>
          {item?.name}
        </Text>
        <Image
          source={{ uri: item.imgUrl }}
          style={{
            width,
            height: 300,
            resizeMode: "center",
            overflow: "hidden",
          }}
        />
        <Button
          title="SHOP NOW"
          containerStyle={{ width: 150, alignSelf: "center" }}
          onPress={()=> {navigation.navigate(item.comp)}}
        />
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>
        Apple Brand Products in Kuwait By Xcite Alghanim Electronics
      </Text>
      {/* <AppleSlider /> */}
      <SafeAreaView>
        <FlatList
          data={cardInfo}
          keyExtractor={(item) => item.name}
          renderItem={cards}
        />
      </SafeAreaView>
      {/* <View style={{padding: 70, backgroundColor: "#DFE3EE"}}></View> */}
    </View>
  );
};

export default Apple;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFE3EE",
    marginBottom: 135,
  },
  mainText: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
  },
});

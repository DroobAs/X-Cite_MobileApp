import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { Card } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../../firebase";
// import { Icon } from "react-native-elements/dist/icons/Icon";
import { Icon } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
const Iphone = ({navigation}) => {
  const { width, height } = Dimensions.get("screen");

  const [data, setData] = useState([]);

  // get data iphone from firestore
  useEffect(() => {
    const iphoneRef = collection(db, `Products`);
    let q = query(
      iphoneRef,
      where("categoryName", "==", "Mobile Phones"),
      where("brandName", "==", "apple")
    );
    const getPhones = async () => {
      const mobiles = await getDocs(q);
      setData(mobiles.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    getPhones()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  // mobile card
  const mobiles = ({ item }) => {
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
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            position: "relative",
          }}
        >
          <Text style={styles.textBestSeller}>best seller</Text>

          <AntDesign
            name="heart"
            color="red"
            size={30}
            style={{ alignSelf: "flex-start", position: "absolute", right: 20 }}
          />
        </View>

        <Image
          source={{ uri: item.mobileImg || item.images[0] }}
          style={{
            width,
            height: 300,
            resizeMode: "contain",
            overflow: "hidden",
          }}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "700",
            marginVertical: 13,
          }}
        >
          {item.brandName} {item?.mobileName} {item?.storage}- {item.color}
        </Text>
        <View style={styles.ratingStar}>
          <Icon
            style={{ paddingLeft: 20 }}
            name={"star"}
            color="gold"
            size={20}
          />
          <Icon
            style={{ paddingLeft: 2 }}
            name={"star"}
            color="gold"
            size={20}
          />
          <Icon
            style={{ paddingLeft: 2 }}
            name={"star"}
            color="gold"
            size={20}
          />
          <Icon
            style={{ paddingLeft: 2 }}
            name={"star"}
            color="gold"
            size={20}
          />
          <Icon
            style={{ paddingLeft: 2 }}
            name={"star"}
            color="gold"
            size={20}
          />
        </View>
        <Text style={{ marginLeft: 20, fontSize: 17, fontWeight: "bold" }}>
          Price {item.price}
        </Text>
        <Text style={{ marginLeft: 20, fontSize: 14, fontWeight: "600" }}>
          Sold By {item.seller}
        </Text>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 14,
            fontWeight: "500",
            backgroundColor: "#BBAFE0",
            width: 130,
            marginVertical: 12,
          }}
        >
          <AntDesign name="right" color="blue" size={15} />
          Fulfilled by X-cite
        </Text>
        <Button
          title="Add to cart"
          containerStyle={{
            width: 150,
            alignSelf: "center",
            backgroundColor: "orange",
          }}
          onPress={() => {
            navigation.navigate(item.comp);
          }}
          color="orange"
        />
      </Card>
    );
  };

  return (
    <View>
      <View style={{ padding: 50, backgroundColor: "#001A2C" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 30,
          }}
        >
          <View>
            <Text style={{ color: "#808080" }}>phones & PersonalAudio</Text>
            <Text style={{ color: "#fff" }}>Mobile Phones</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Card.Image
                style={{ width: 80, height: 40, resizeMode: "contain" }}
                source={{
                  uri: "https://m.xcite.com/skin/frontend/xvii/default/images/xcite-logo-en.png",
                }}
              />
              <Icon name={"search"} color="white" size={18} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={1}
          renderItem={mobiles}
          style={{ marginBottom: 350 }}
        />
      </SafeAreaView>
      {/* <View style={{padding: 50}}></View> */}
    </View>
  );
};

export default Iphone;

const styles = StyleSheet.create({
  textBestSeller: {
    textAlign: "center",
    fontSize: 14,
    backgroundColor: "#001A2C",
    width: 120,
    color: "#fff",
    marginLeft: 20,
    padding: 4,
    marginBottom: 12,
  },
  ratingStar: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 14,
  },
});

import {
  collection,
  getDocs,
  onSnapshot,
  updateDoc,
  getDoc,
  doc
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { Card, Button, Icon } from "@rneui/themed";
import  {AddToUserCart} from "../Cart/cartService"
import db from "../../firebase";
import { AntDesign } from "@expo/vector-icons";
import { UserAuth } from "../../context/AuthContext";

const ProductSearch = ({ navigation, route }) => {
  const [dataSearch, setDataSearch] = useState([]);
  const [result, setResult] = useState([]);
  const [showingData, setShowingData] = useState([]);
  const {user} = UserAuth()
  let inputValue = route.params.name;
  console.log(inputValue);
  useEffect(() => {
    const prodCollection = collection(db, "Products");
    // let searchByName = query(
    //   prodCollection,
    //   where("brandName", "==", inputValue)
    // );

    //by name
    const getPhones = async () => {
      const mobiles = await getDocs(prodCollection);
      setDataSearch(mobiles.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPhones();

    //   })
  }, []);

  let filterData = dataSearch.filter(
    ({ brandName, categoryName, type, name, mobileName }) => {
      return (
        inputValue.includes(brandName?.toLowerCase()) ||
        inputValue.includes(categoryName?.toLowerCase()) ||
        inputValue.includes(type?.toLowerCase()) ||
        inputValue.includes(mobileName?.toLowerCase())
      );
    }
  );
  console.log(filterData);
  // return
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#202124",
          padding: 40,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 24, color: "orange" }}>search</Text>
        </View>
        <View>
          <AntDesign
            name="close"
            color={"white"}
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        
      </View>
      <View style={{backgroundColor: "white", padding: 20}}>
          
          <Text style={{ color: "#A0A0A0", fontSize: 16 }}>
            {filterData?.length} Results Found
          </Text>
        </View>
      {filterData.length < 1 ? (
        <Text>no item found</Text>
      ) : (
        filterData.map((item) => {
          return (
            <View key={item.id}>
              <View key={item.id} style={styles.mainView}>
                <View style={{ marginLeft: -5, marginRight: 4 }}>
                  <Card.Image
                    style={{ width: 80, resizeMode: "contain" }}
                    source={{
                      uri:
                        item.mobileImg ||
                        item?.images[0] ||
                        item.imgsDescription[0],
                    }}
                  />
                </View>
                <View style={{ flexGrow: 2 }}>
                  <Text style={styles.textBestSeller}>best seller</Text>
                  <Text style={{ fontSize: 15, marginRight: -5, width: 250 }}>
                    {item.name || item.mobileName} - {item.color}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      marginVertical: 8,
                    }}
                  >
                    Price {item.price} -{" "}
                    <Text
                      style={{
                        backgroundColor: "red",
                        color: "#fff",
                        fontSize: 14,
                      }}
                    >{`save ${item.discount}`}</Text>
                  </Text>
                  <View style={styles.sold}>
                    <Text>sold by X-cite</Text>
                    <Text style={styles.Fulfilled}>
                      <AntDesign name="right" color="blue" size={15} />
                      Fulfilled by X-cite
                    </Text>
                  </View>
                  <Button
                    containerStyle={{
                      width: 150,
                      alignSelf: "center",
                      backgroundColor: "orange",
                    }}
                    color="warning"
                    iconRight
                    onPress={()=>{AddToUserCart(item.id, 1,user, db, doc, getDoc, updateDoc)}}
                  >
                    Add to cart <Icon name="shopping-cart" color="white" />
                  </Button>
                </View>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

export default ProductSearch;

const styles = StyleSheet.create({
  mainView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderBottomWidth: 1,
    overflow: "hidden",
    marginTop: 10,
  },
  textBestSeller: {
    textAlign: "center",
    fontSize: 14,
    backgroundColor: "#001A2C",
    width: 80,
    color: "#fff",

    padding: 4,
    marginBottom: 12,
  },
  ratingStar: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 14,
  },
  sold: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 2,
  },

  Fulfilled: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "#BBAFE0",
    width: 130,
    marginVertical: 12,
  },
});

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Button, Card } from "react-native-elements";
import { color } from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";
// import { Image } from "@rneui/themed";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header/Header";
import Slider from "./Slider/Slider";
import db from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import ShowCategories from "./ShowCategories/ShowCategories";
const Home = ({ navigation }) => {
  const { width, height } = Dimensions.get("screen");
  const ITEM_WIDTH = width * 0.76;
  const ITEM_HEIGHT = height * 1.47;

  const [digitalCards, setDigitalCards] = useState([]);
  const [phonesAndPersonalAudio, setphonesAndPersonalAudio] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [televisions, setTelevisions] = useState([]);
  useEffect(() => {
    const proCollection = collection(db, "Products");

    // digital Cards
    const q_digitalProds = query(
      proCollection,
      where("categoryName", "==", "digital cards")
    );
    onSnapshot(q_digitalProds, (snapshot) => {
      setDigitalCards(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    // mobile phones
    const q_phonesProds = query(
      proCollection,
      where("categoryName", "==", "Mobile Phones")
    );
    onSnapshot(q_phonesProds, (snapshot) => {
      setphonesAndPersonalAudio(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    // laptops
    const q_labtopsProds = query(
      proCollection,
      where("categoryName", "==", "labtops")
    );
    onSnapshot(q_labtopsProds, (snapshot) => {
      setLaptops(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    // tablets
    const q_tabletsProds = query(
      proCollection,
      where("categoryName", "==", "tablets")
    );
    onSnapshot(q_tabletsProds, (snapshot) => {
      setTablets(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    // Televisions
    const q_tvsProds = query(proCollection, where("categoryName", "==", "tvs"));
    onSnapshot(q_tvsProds, (snapshot) => {
      setTelevisions(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);
  console.log(phonesAndPersonalAudio);
  return (
    <ScrollView>
      <View>
        {/* header */}
        <Header navigation={navigation} />
        {/* image slider */}
        <View>
          <Slider />
        </View>
        {/* get data from firebase and make cards */}
        <ShowCategories />
        {/* digital cards */}
        <View>
          <Text
            style={{
              padding: 12,
              fontSize: 22,
              marginTop: 22,
              backgroundColor: "white",
              color: "#1D82D4",
            }}
          >
            Digital Cards
          </Text>
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              // ListHeaderComponent={<ShowCategories />}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              horizontal
              inverted
              contentContainerStyle={{ alignItems: "center" }}
              data={digitalCards}
              decelerationRate={0}
              bounces={false}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    width: 250,
                    height: 400,
                    backgroundColor: "white",
                    borderRadius: 34,
                    marginTop: 20,
                    marginHorizontal: 8,
                    display: "flex",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <View style={{ width }} key={item.id}>
                    <Image
                      style={{
                        width: ITEM_WIDTH,
                        height: 240,
                        resizeMode: "contain",
                      }}
                      source={{ uri: item.images[0] }}
                    />
                  </View>
                  <View>
                    <Text style={styles.digitalCard}>{item?.name}</Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                        marginBottom: 8,
                      }}
                    >
                      <Text style={styles.digitalCardPrice}>
                        price {item?.price}
                      </Text>
                      <Text
                        style={{
                          backgroundColor: "red",
                          color: "#fff",
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        {item?.discount !== 0
                          ? `save ${item?.discount} %`
                          : "no discount"}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </SafeAreaView>
        </View>
        {/* Phones & Personal Audio */}
        <View>
          <Text
            style={{
              padding: 12,
              fontSize: 22,
              marginTop: 20,
              backgroundColor: "white",
              color: "#1D82D4",
            }}
          >
            Phones & Personal Audio
          </Text>
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              // ListHeaderComponent={<ShowCategories />}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              horizontal
              inverted
              contentContainerStyle={{ alignItems: "center" }}
              data={phonesAndPersonalAudio}
              decelerationRate={0}
              bounces={false}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    width: 250,
                    height: 400,
                    backgroundColor: "white",
                    borderRadius: 34,
                    marginTop: 20,
                    marginHorizontal: 8,
                    display: "flex",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <View style={{ width }} key={item.id}>
                    <Image
                      style={{
                        width: ITEM_WIDTH,
                        height: 240,
                        resizeMode: "contain",
                      }}
                      source={{ uri: item.images[0] }}
                    />
                  </View>
                  <View>
                    <Text style={styles.digitalCard}>
                      {item?.name || item.mobileName}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                        marginBottom: 8,
                      }}
                    >
                      <Text style={styles.digitalCardPrice}>
                        price {item?.price}
                      </Text>
                      <Text
                        style={{
                          backgroundColor: "red",
                          color: "#fff",
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        {item?.discount !== 0
                          ? `save ${item?.discount} %`
                          : "no discount"}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </SafeAreaView>
        </View>
        {/* laptops */}
        <View>
          <Text
            style={{
              padding: 12,
              fontSize: 22,
              marginTop: 20,
              backgroundColor: "white",
              color: "#1D82D4",
            }}
          >
            Laptops
          </Text>
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              // ListHeaderComponent={<ShowCategories />}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              horizontal
              inverted
              contentContainerStyle={{ alignItems: "center" }}
              data={laptops}
              decelerationRate={0}
              bounces={false}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    width: 250,
                    height: 400,
                    backgroundColor: "white",
                    borderRadius: 34,
                    marginTop: 20,
                    marginHorizontal: 8,
                    display: "flex",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <View style={{ width }} key={item.id}>
                    <Image
                      style={{
                        width: ITEM_WIDTH,
                        height: 240,
                        resizeMode: "cover",
                      }}
                      source={{ uri: item.images[0] }}
                    />
                  </View>
                  <View>
                    <Text style={styles.digitalCard}>{item?.name}</Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                        marginBottom: 8,
                      }}
                    >
                      <Text style={styles.digitalCardPrice}>
                        price {item?.price}
                      </Text>
                      <Text
                        style={{
                          backgroundColor: "red",
                          color: "#fff",
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        {item?.discount !== 0
                          ? `save ${item?.discount} %`
                          : "no discount"}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </SafeAreaView>
        </View>

        {/* tablets */}
        <View>
          <Text
            style={{
              padding: 12,
              fontSize: 22,
              marginTop: 20,
              backgroundColor: "white",
              color: "#1D82D4",
            }}
          >
            Tablets
          </Text>
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              // ListHeaderComponent={<ShowCategories />}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              horizontal
              inverted
              contentContainerStyle={{ alignItems: "center" }}
              data={tablets}
              decelerationRate={0}
              bounces={false}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    width: 250,
                    height: 400,
                    backgroundColor: "white",
                    borderRadius: 34,
                    marginTop: 20,
                    marginHorizontal: 8,
                    display: "flex",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <View style={{ width }} key={item.id}>
                    <Image
                      style={{
                        width: ITEM_WIDTH,
                        height: 240,
                        resizeMode: "cover",
                      }}
                      source={{ uri: item.images[0] }}
                    />
                  </View>
                  <View>
                    <Text style={styles.digitalCard}>{item?.name}</Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                        marginBottom: 8,
                      }}
                    >
                      <Text style={styles.digitalCardPrice}>
                        price {item?.price}
                      </Text>
                      <Text
                        style={{
                          backgroundColor: "red",
                          color: "#fff",
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        {item?.discount !== 0
                          ? `save ${item?.discount} %`
                          : "no discount"}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </SafeAreaView>
        </View>

        {/* Televisions */}
        <View>
          <Text
            style={{
              padding: 12,
              fontSize: 22,
              marginTop: 20,
              backgroundColor: "white",
              color: "#1D82D4",
            }}
          >
            Televisions
          </Text>
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              // ListHeaderComponent={<ShowCategories />}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              horizontal
              inverted
              contentContainerStyle={{ alignItems: "center" }}
              data={televisions}
              decelerationRate={0}
              bounces={false}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    width: 250,
                    height: 400,
                    backgroundColor: "white",
                    borderRadius: 34,
                    marginTop: 20,
                    marginHorizontal: 8,
                    display: "flex",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <View style={{ width }} key={item.id}>
                    <Image
                      style={{
                        width: ITEM_WIDTH,
                        height: 240,
                        resizeMode: "cover",
                      }}
                      source={{ uri: item.images[0] }}
                    />
                  </View>
                  <View>
                    <Text style={styles.digitalCard}>{item?.name}</Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                        marginBottom: 8,
                      }}
                    >
                      <Text style={styles.digitalCardPrice}>
                        price {item?.price}
                      </Text>
                      <Text
                        style={{
                          backgroundColor: "red",
                          color: "#fff",
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        {item?.discount !== 0
                          ? `save ${item?.discount} %`
                          : "no discount"}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </SafeAreaView>
        </View>
        {/* Apple products */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Apple");
          }}
        >
          <View style={styles.appleproducts}>
            <Text style={styles.appleproductsText}>Apple Products</Text>
            <Button
              // onPress={onPressLearnMore}

              icon={
                <Icon
                  style={{ paddingLeft: 9 }}
                  name={"arrow-right"}
                  color="#fec525"
                  size={14}
                />
              }
              title="View All"
              iconRight
              color="#000"
              accessibilityLabel="go to apple prods"
              type="clear"
            />
          </View>
        </TouchableOpacity>
        {/* rating on play store */}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              "https://play.google.com/store/apps/details?id=com.developmentnow.xcite"
            );
          }}
        >
          <View style={styles.rating}>
            <Text style={styles.ratingText}>Enjoying our app?</Text>
            <Text style={styles.ratingText}>
              Let us know by rating & writing review
            </Text>
            <View style={styles.ratingStar}>
              <Icon
                style={{ paddingLeft: 9 }}
                name={"star"}
                color="gold"
                size={14}
              />
              <Icon
                style={{ paddingLeft: 9 }}
                name={"star"}
                color="gold"
                size={14}
              />
              <Icon
                style={{ paddingLeft: 9 }}
                name={"star"}
                color="gold"
                size={14}
              />
              <Icon
                style={{ paddingLeft: 9 }}
                name={"star"}
                color="gold"
                size={14}
              />
              <Icon
                style={{ paddingLeft: 9 }}
                name={"star"}
                color="gold"
                size={14}
              />
            </View>
            <Button title="Rate" style={styles.ratingButton} />
          </View>
        </TouchableOpacity>
        {/* padding */}
        <View style={{ padding: 40 }}></View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 55,
    paddingBottom: 14,
    backgroundColor: "#001A2C",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 4,
    color: "#fec525",
  },
  text: {
    color: "#fff",
  },
  logo: {
    width: 130,
    height: 30,
  },
  card: {
    padding: 0,
    width: 181,
    marginHorizontal: 6,
  },
  cardText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 3,
    marginBottom: 3,
    fontSize: 15,
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  cardTextFirstChild: {
    marginRight: 2,
    marginLeft: 2,
    fontSize: 12,
  },
  cardTextSecondChild: {
    marginRight: 2,
    fontSize: 8,
    marginLeft: 2,
    color: "red",
  },
  cardImage: {
    width: null,
    padding: 0,
    flex: 1,
  },
  digitalCard: {
    fontSize: 20,
    paddingLeft: 8,
    color: "#000",
    marginTop: 8,
    marginBottom: 5,
  },
  digitalCardPrice: {
    fontSize: 18,
    paddingLeft: 12,
    color: "#ddd",
    paddingBottom: 10,
  },
  appleproducts: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#000",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  appleproductsText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
    backgroundColor: "#001A2C",
  },
  ratingText: {
    color: "#fff",
    marginVertical: 4,
    fontSize: 20,
  },
  ratingStar: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 5,
  },
  ratingButton: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: "orange",
  },
});

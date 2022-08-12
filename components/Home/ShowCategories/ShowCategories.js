import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { Button, Card } from "react-native-elements";

import db from "../../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const ShowCategories = () => {
    const [cat, setCats] = useState([]);

    useEffect(() => {
      const catCollection = collection(db, "Categories");
      onSnapshot(catCollection, (snapshot) => {
        // console.log(snapshot.docs);
        setCats(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    }, []);
  
    

    return (
        <FlatList
        data={cat}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Card containerStyle={styles.card} key={item.id}>
              <Card.Image
                style={styles.cardImage}
                source={{ uri: item.img }}
              />
              <View style={styles.cardText}>
                <Text style={styles.cardTextFirstChild}>{item?.id}</Text>
                <View >
                  <Text style={styles.cardTextSecondChild}>save up </Text>
                  <Text >
                    {item?.discount}%
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        )}
      />
    )
};

export default ShowCategories;


const styles = StyleSheet.create({
    container: {
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
      flex: 1,
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
  });

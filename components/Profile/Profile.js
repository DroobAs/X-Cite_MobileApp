import { Image } from "@rneui/base";
import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import { Icon, SocialIcon } from "@rneui/themed";
import { UserAuth } from "../../context/AuthContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


const Profile = ({ navigation }) => {
  const { user, logout } = UserAuth();
  const handelLogOut = async()=> {
   try {
     await logout();
     navigation.navigate("Home")
   }catch(e){
     console.log(e);
   }
  }
  return (
    <View>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.firstRow}>
          <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
            My Account
          </Text>
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
              <Image
                style={{ width: 70, height: 40, resizeMode: "contain" }}
                source={require("./../../assets/xcite-logo-en.png")}
              />
              <Icon
                style={{ paddingLeft: 9 }}
                name={"search"}
                color="#fec525"
                size={22}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.firstRow}>
          {user ? undefined : <Button
            title="Go To Login"
            type="outline"
            size="md"
            containerStyle={{
              width: 120,
              marginVertical: 20,
              backgroundColor: "white",
            }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Icon name={"arrow-right"} color={"black"} />
          </Button>}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              style={{ paddingLeft: 9 }}
              name={"settings"}
              color="#ddd"
              size={30}
              onPress={()=> {navigation.navigate("Settings")}}
            />
          </View>
        </View>
      </View>
      {/* list  */}
      <View>
        <View style={styles.list}>
          <Text style={styles.listText}>store locator</Text>
          <Icon name={"arrow-right-alt"} />
        </View>
        <View style={styles.list}>
          <Text style={styles.listText}>Use Barcode Scanner</Text>
          <Icon name={"arrow-right-alt"} />
        </View>
        <View style={styles.list}>
          <Text style={styles.listText}>Help & Services</Text>
          <Icon name={"arrow-right-alt"} />
        </View>
        <View style={styles.list}>
          <Text style={styles.listText}>About Xcite</Text>
          <Icon name={"arrow-right-alt"} />
        </View>
        {user ? (
          <TouchableOpacity onPress={() => {handelLogOut()}}>
            <View style={styles.list}>
              <Text style={styles.listText}>Log out</Text>
              <Icon name={"arrow-right-alt"} />
            </View>
          </TouchableOpacity>
        ) : undefined}
      </View>
      {/* bottom */}
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
        }}
      >
        <Text style={{ marginBottom: 10 }}>Version 1.0</Text>
        <Text style={{ marginBottom: 20, fontSize: 18, fontWeight: "600" }}>
          Follow Us
        </Text>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 25,
          }}
        >
          <SocialIcon type={"facebook"} />
          <SocialIcon type={"twitter"} />
          <SocialIcon type={"linkedin"} />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00365C",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  firstRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  list: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 14,

    borderColor: "#ddd", // if you need
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#fffafa",
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  listText: {
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: "700",
  },
});

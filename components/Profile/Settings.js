import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Icon, SocialIcon } from "@rneui/themed";

const Settings = ({navigation}) => {
  return (
    <View>
       <View style={styles.header}>
        <View style={styles.firstRow}>
        <Icon
          name={"navigate-before"}
          color={"white"}
          size={40}
          onPress={() => {
            navigation.goBack();
          }}
        />
          <Text style={{ color: "white", fontSize: 22, fontWeight: "bold", marginTop:20,}}>
            SETTINGS
          </Text>
          
        </View>
        
      </View>
      <View style={{borderTopLeftRadius:20, borderTopRightRadius:20}}>
        <View style={styles.list} >
          <Text onPress={()=>{navigation.navigate("Lang")}} style={styles.listText}>Country/Language</Text>
          <Icon name={"arrow-right-alt"} />
        </View>
        <View style={styles.list}>
          <Text style={styles.listText}>communication Permission Settings</Text>
          <Icon name={"arrow-right-alt"} />
        </View>
        <View style={styles.list}>
          <Text style={styles.listText}>Rate the App</Text>
          <Icon name={"arrow-right-alt"} />
        </View>
        <View style={styles.list}>
          <Text style={styles.listText}>Share the App</Text>
          <Icon name={"arrow-right-alt"} />
        </View>
      </View>
    </View>
  );
};
export default Settings;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00365C",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  firstRow: {
    display: "flex",
    marginBottom:10,
    alignItems: "flex-start",
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

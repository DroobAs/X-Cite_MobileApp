import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Icon } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
const Search = ({ navigation }) => {
  const { width } = Dimensions.get("screen");
  const [inputValue, setInputValue] = useState("");
  console.log(inputValue);

  const goToSearch = () => {
    if (inputValue !== "") {
      return navigation.navigate("ProductSearch", { name: inputValue.toLowerCase() });
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View
        style={{ flex: 1, backgroundColor: "#202124", position: "relative" }}
      >
        <View
          style={{
            position: "absolute",
            right: -30,
            padding: 60,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <AntDesign
            name="close"
            color={"white"}
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            name={"search"}
            color={"white"}
            size={37}
            onPress={() => {
              goToSearch()
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={"#ddd"}
            autoFocus={true}
            onChangeText={setInputValue}
            value={inputValue}
            returnKeyType={"search"}
            textAlign={"center"}
          />
        </View>
        <Text
          style={{
            color: "orange",
            paddingLeft: 20,
            marginBottom: 20,
            fontSize: 22,
          }}
        >
          Top Search
        </Text>
        <Text style={styles.textStyle} onPress={()=>{setInputValue("iphone 11")}}>iphone 11</Text>
        <Text style={styles.textStyle} onPress={()=>{setInputValue("iphone 13 pro max")}}>iphone 13 pro max</Text>
        <Text style={styles.textStyle} onPress={()=>{setInputValue("samsung s22 ultra")}}>samsung s22 ultra</Text>
        <Text style={styles.textStyle} onPress={()=>{setInputValue("iphone 13 pro")}}>iphone 13 pro</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  inputView: {
    marginTop: 100,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "transparent",
    borderWidth: 1,
    padding: 10,
    color: "#fff",
  },
  textStyle: {
    color: "#fff",
    paddingLeft: 20,
    marginBottom: 15,
    fontSize: 17,
  },
});

export default Search;

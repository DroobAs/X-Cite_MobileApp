import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-elements";
import { color } from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("./../../../assets/xcite-logo-en.png")}
        style={styles.logo}
      />
      <View style={styles.buttonContainer}>
        <Button
          // onPress={onPressLearnMore}
          onPress={() => {
            navigation.navigate("Categories");
          }}
          icon={
            <Icon
              style={{ paddingLeft: 9 }}
              name={"list"}
              color="#fec525"
              size={14}
            />
          }
          title="Categories"
          iconRight
          color="#fec525"
          accessibilityLabel="go to Categories"
          type="clear"
        />
        <Button
          onPress={() => {
            navigation.navigate("Search");
          }}
          icon={
            <Icon
              style={{ paddingLeft: 9 }}
              name={"search"}
              color="#fec525"
              size={14}
            />
          }
          title="Search"
          color="#fec525"
          accessibilityLabel="go to Search"
          iconRight
          type="clear"
        />
      </View>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
    container: {
      color: "white",
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 55,
      paddingBottom: 14,
      backgroundColor: "#00365C",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    buttonContainer : {
      display: "flex",
      flexDirection: "row",
      padding: 4,
      color: "#fec525"
    },
    text: {
      color: "#fff",
    },
    logo: {
      width: 130,
      height: 30,
    },
  });

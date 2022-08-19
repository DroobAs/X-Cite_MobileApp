import { Image } from "@rneui/base";
import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
} from "react-native";
import { Button } from "react-native-elements";
import { Icon, SocialIcon } from "@rneui/themed";
import { UserAuth } from "../../context/AuthContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import RNRestart from "react-native-restart";
const Profile = ({ navigation }) => {
  const { i18n } = useTranslation();

  const handleLang = (lang) => {
   return  i18n.changeLanguage(lang);
     
  };

  return (
    <View style={styles.header}>
      <Image
        style={{
          width: 170,
          height: 70,
          resizeMode: "contain",
          marginBottom: 15,
        }}
        source={require("./../../assets/xcite-logo-en.png")}
      />
      <Text style={{ fontSize: 24, color: "white", fontWeight: "700" }}>
        Select Your Language
      </Text>
      <Text style={{ fontSize: 20, color: "white", fontWeight: "700" }}>
        اختر لغتك
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: 30,
        }}
      >
        <Button
          title={"English"}
          type="outline"
          onPress={() => {
            handleLang("en").then(()=> {
              RNRestart.Restart()
            })
           
          }}
        ></Button>
        <Button
          title={"العربية"}
          type="outline"
          onPress={() => {
            handleLang("ar").then(()=> {
              RNRestart.Restart()
            })
          }}
        ></Button>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00365C",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 200,
  },
});

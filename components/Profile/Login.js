import { Image } from "@rneui/base";
import React from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import { Icon, SocialIcon } from "@rneui/themed";
import { Formik } from "formik";
import { UserAuth } from "../../context/AuthContext";
import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().required().min(12),
  password: yup.string().required().min(8),
});

const Login = ({ navigation }) => {
  const { width } = Dimensions.get("window");
  const { user, signin } = UserAuth();
  console.log(user);

  return (
    <View style={{ flex: 1, backgroundColor: "#183a52" }}>
      <View style={{ display: "flex", marginTop: 40, marginLeft: -310 }}>
        <Icon
          name={"navigate-before"}
          color={"white"}
          size={40}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
        <Image
          style={{
            width: 170,
            height: 70,
            resizeMode: "contain",
            marginBottom: 15,
          }}
          source={require("./../../assets/xcite-logo-en.png")}
        />
        <Text style={{ fontSize: 20, fontWeight: "700", color: "white" }}>
          TO CONTINUE
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async(values, actions) => {
            try {
              await signin(values.email, values.password);
              navigation.goBack()
            } catch (e) {
              
              console.log(e.message);
            }
          }}
        >
          {(props) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="E-mail Address"
                placeholderTextColor={"#ddd"}
                onChangeText={props.handleChange("email")}
                value={props.values.email}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={"#ddd"}
                secureTextEntry
                onChangeText={props.handleChange("password")}
                value={props.values.password}
              />
              <Button
                title="Log in"
                loading={false}
                loadingProps={{ size: "small", color: "white" }}
                buttonStyle={{
                  backgroundColor: "orange",
                }}
                titleStyle={{ fontWeight: "bold", fontSize: 18 }}
                containerStyle={{
                  marginHorizontal: 50,
                  height: 50,
                  width: 350,
                  marginVertical: 20,
                }}
                onPress={props.handleSubmit}
              />
            </>
          )}
        </Formik>

        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Text style={{ color: "white", marginLeft: 40 }}>
            new to X-cite ?
          </Text>
          <Button
            containerStyle={{
              width: 200,
              marginHorizontal: -40,
              marginVertical: 10,
            }}
            title="Sing up"
            type="clear"
            titleStyle={{ color: "#06bcee", fontSize: 18 }}
            onPress={()=>{navigation.navigate("SingUp")} }
          />
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  input: {
    width: Dimensions.get("window").width,
    alignItems: "stretch",
    padding: 20,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    marginBottom: 20,
    color: "white",
    marginHorizontal: 15,
  },
});

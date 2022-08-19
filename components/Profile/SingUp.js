import { Image } from "@rneui/base";
import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import { Icon, SocialIcon } from "@rneui/themed";
import { Formik } from "formik";
import { UserAuth } from "../../context/AuthContext";
import * as yup from "yup";
import { doc, setDoc } from "firebase/firestore";
import db from "../../firebase";
const SingUp = ({ navigation }) => {
  const { createUser } = UserAuth();
  const mobileReg = /^01[0125][0-9]{8}$/gm
  const loginSchema = yup.object({
    fullName: yup.string().required().min(4),
    email: yup
      .string()
      .required("email is required")
      .email("must be valid email"),
    password: yup.string().required().min(8, 'Password is too short - should be 8 chars minimum.'),
    mobile: yup.string().required().matches(mobileReg, 'Phone number should be 11 number and starts with 01'),
  });

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
          SING UP
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
      >
        <Formik
          initialValues={{ email: "", password: "", fullName: "", mobile: '' }}
          validationSchema={loginSchema}
          onSubmit={async (values, actions) => {
            try {
              await createUser(values.email, values.password).then((res) => {
                const userCollection = doc(db, `users/${res.user.uid}`);
                setDoc(userCollection, {...values, orders:[], cart:[], wishlist:[], mob : "from mobile app"}).then(() => {
                 
                  console.log("done");
                });
                navigation.popToTop("Profile");
              });
            } catch (e) {
              console.log(e.message);
            }
          }}
        >
          {(props) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={"gray"}
                onChangeText={props.handleChange("fullName")}
                value={props.values.fullName}
              />
              <Text style={styles.errorText}>
                {props.touched.fullName && props.errors.fullName}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="E-mail Address"
                placeholderTextColor={"gray"}
                onChangeText={props.handleChange("email")}
                value={props.values.email}
              />
              <Text style={styles.errorText}>
                {props.touched.email && props.errors.email}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Mobile"
                placeholderTextColor={"gray"}
                onChangeText={props.handleChange("mobile")}
                value={props.values.mobile}
                keyboardType="numeric"
              />
              <Text style={styles.errorText}>
                {props.touched.mobile && props.errors.mobile}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={"gray"}
                secureTextEntry
                onChangeText={props.handleChange("password")}
                value={props.values.password}
              />
              <Text style={styles.errorText}>
                {props.touched.password && props.errors.password}
              </Text>
              <Button
                title="Sing Up"
                loading={false}
                loadingProps={{ size: "small", color: "white" }}
                buttonStyle={{
                  backgroundColor: "orange",
                }}
                titleStyle={{ fontWeight: "bold", fontSize: 18 }}
                containerStyle={{
                  marginHorizontal: 20,
                  height: 50,
                  width: 350,
                  marginVertical: 20,
                }}
                onPress={props.handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default SingUp;

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
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 20,
    color: "black",
    marginHorizontal: 15,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    paddingLeft: 20,
  },
});

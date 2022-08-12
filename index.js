import React from "react";
import { Text } from "react-native";
import { AppRegistry } from "react-native";


const home = ()=>{
    return (
     <Text>Hello ahmed</Text>
    )
}

AppRegistry.registerComponent("X-cite",()=> home)
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList, Image } from "react-native";
import db from "../../firebase";
import { collection, query, where, onSnapshot, doc, documentId } from "firebase/firestore";
import { UserAuth } from '../../context/AuthContext';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user }= UserAuth();
  const [curUser, setCurUser] = useState();

  useEffect(()=>{
    const proCollec = collection(db, "Products");
    if(user)
    {
      if(user.uid)
      {
        const usrDoc = doc(db, 'users/', `${user.uid}`)
        onSnapshot(usrDoc,(snapshot)=>{
            setCurUser({...snapshot.data(), id: user.uid});

            const cartdb = snapshot.data().cart;
            // alert(cartdb.length)
            if(cartdb.length)
            {
              const q = query(proCollec, where(documentId() ,"in", cartdb.map((item)=> item.pId)));
              onSnapshot(q,(res)=>{
                setCart((car)=>{
                  let _cart = res.docs.map((doc)=>({
                  ...doc.data(),
                  id: doc.id,
                  amount: cartdb.find((item)=> item.pId==doc.id).amount
                  }))
                  return _cart;
                }
                );
              })
            }
        })
      }
    }
  },[user])


  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text>Cartt</Text> */}
        {
          cart.length>0?
          <>
          <Text style={styles.textCart}>** Your Cart **</Text>
        <FlatList
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              vertical
              inverted
              contentContainerStyle={{ alignItems: "center" }}
              data={cart}
              decelerationRate={0}
              bounces={false}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    width: 350,
                    height: 270,
                    backgroundColor: "white",
                    borderRadius: 34,
                    marginTop: 20,
                    marginHorizontal: 8,
                    display: "flex",
                    justifyContent: "center",
                    overflow: "hidden",
                    paddingHorizontal:9
                  }}
                >
                  <View key={item.id}>
                    <Image
                      style={{
                        height: 200,
                        resizeMode: "contain",
                      }}
                      source={{ uri: item.images[0] }}
                    />
                  </View>
                  <View>
                    <Text>
                      {item?.name}
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
                      <Text style={{fontSize:9, paddingTop:6}}>
                        Unit price: {item?.price}$
                      </Text>
                      <Text style={{fontSize:9, paddingTop:6}}>
                        Total price: {item?.price * item?.amount}$
                      </Text>
                      <Text style={{fontSize:9, paddingTop:6}}>
                        Amount: {item?.amount}
                      </Text>
                      <Text
                        style={{
                          backgroundColor: "red",
                          color: "#fff",
                          padding: 3,
                          borderRadius: 4,
                          fontSize:8,
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
            /></>
            :<Text style={styles.empty}>Your Cart is Empty!</Text>
        }
      </View>
    </ScrollView>
  )
}

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    display: "flex",
    paddingBottom:100
    // flexDirection: "row",
    // justifyContent: "space-around",
  },
  empty:{
    marginHorizontal:'auto',
    textAlign:"center",
    fontSize:24,
    color:'blue',
    paddingTop:100,
  },
  textCart:{
    marginHorizontal:'auto',
    textAlign:"center",
    fontSize:24,
    color:'black',
    paddingTop:50,
  }
});
import { StyleSheet, Text, View,  SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, {useContext} from 'react'
import AppLoading from 'expo-app-loading'
import {useFonts} from 'expo-font'

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 


const Landing = ({navigation}) => {

    let [fontsLoaded] = useFonts({
        'fbold': require("../assets/Montserrat/static/Montserrat-Bold.ttf"),
        'fsemibold': require("../assets/Montserrat/static/Montserrat-SemiBold.ttf"),
        'fmedbold': require("../assets/Montserrat/static/Montserrat-Medium.ttf"),
        'fregular': require("../assets/Montserrat/static/Montserrat-Regular.ttf")
    })

    if(!fontsLoaded)
    {
        return <AppLoading />
    }

   
  return (
    <SafeAreaView>
    <View style={styles.upperHalf}>
      
    <MaterialCommunityIcons 
      name="piggy-bank" 
      size={80} 
      color="black"
      backgroundColor="white"
      style={styles.icon} />
    </View>

    <View style={styles.lowerHalf}>
    
    <View style={styles.title}>
    <Text style={styles.titleBold}>Apna</Text>
    <Text style={styles.titleLight}>Gullak</Text>
    </View>
 
       
    <View style={styles.btnOuter}>

       

        <TouchableOpacity 
        onPress={() => navigation.navigate("Login") }
        style={styles.btn}>
            <Text style={styles.btnText}>Log in</Text>
        </TouchableOpacity>
    </View>
        
     



      <View style={styles.bottomRow}>
      <TouchableOpacity onPress={() => navigation.navigate("ChildLogin") }>
        <Text style={styles.help}>Are you child ?</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={() =>navigation.navigate("Register")}
       style={{display:'flex',
        flexDirection:"row",
      alignItems:"center"}}
      >
        <Text style={styles.register}>Register
        </Text>

        <FontAwesome 
        style={styles.arrow}
        name="chevron-right" 
        size={20} color="#71c671" />
        
      </TouchableOpacity>
      </View>


    
      

    </View>

    
    </SafeAreaView>
  )
}

export default Landing

const styles = StyleSheet.create({
 main: { 
  height: "100%",
  backgroundColor:"#F5F5F5",
},
icon : {
  borderRadius: 100,
  padding: 29,
  position: "absolute",
  bottom: -50,
  elevation: 15,
  shadowColor: 'black',
  left: 130
},
upperHalf: {
  backgroundColor: "#5cadff",
  height: 220,
  padding: 20,
  display: "flex",
  justifyContent: "center",
  alignItems:"center",
  borderBottomLeftRadius:130,
  marginLeft: -20
},

lowerHalf : {
  marginTop: 40,
  padding: 30,
},

btn:{
  backgroundColor: "#71c671",
  width: "70%",
  padding: 15,
  borderRadius: 30,
  elevation: 10,
  shadowColor: 'black',
  
},
btnText : {
  color:"white",
  fontSize: 20,
  fontFamily: 'fbold',
  textAlign:"center"
},
  btnOuter: {
    display:"flex",
    alignItems:"center",
    marginTop: "20%"
  },
  title: {
    display:"flex",
    flexDirection:"row",
    marginBottom:30,
    justifyContent:"center",
    marginTop: 40
  },
  titleBold : {
    fontSize: 35,
    fontFamily: 'fbold',
  },
  titleLight: {
    fontSize: 35,
    fontFamily: 'fmedbold',
  },
  bottomRow : {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop: 150
  },
  help : {
    fontFamily:"fregular"
  },
  register: {
    fontFamily: "fsemibold"
  },
  arrow: {
    fontWeight:"bold",
    marginLeft: 5

  },
  

})
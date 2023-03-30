import { StyleSheet, Text, View,  SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, {useContext} from 'react'
import {useFonts} from 'expo-font'
import { Entypo } from '@expo/vector-icons'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserContext } from '../context';
import {useState} from "react"

const ChildLogin = ({navigation}) => {

    let [fontsLoaded] = useFonts({
        'fbold': require("../assets/Montserrat/static/Montserrat-Bold.ttf"),
        'fsemibold': require("../assets/Montserrat/static/Montserrat-SemiBold.ttf"),
        'fmedbold': require("../assets/Montserrat/static/Montserrat-Medium.ttf"),
        'fregular': require("../assets/Montserrat/static/Montserrat-Regular.ttf")
    })
    const {childLogin,loading} = useContext(UserContext)

    const [password,setPassword] = useState("Sbshahaha")
    const [childId, setchildId] = useState("Ashish1322")

    return (
     <SafeAreaView style={styles.main}>

        <View style={styles.upperHalf}>
        <TouchableOpacity
        onPress={() => navigation.goBack() }
        style={styles.goBack}>
        <Entypo 
      
        name="chevron-left" 
        size={30} 
        color="white"
         />
        </TouchableOpacity>
        
            <Text style={styles.loginText}>Child Login</Text>

            <Ionicons 
            style={styles.icon}
            name="person-sharp" size={44} color="black"
            backgroundColor="#F5F5F5" />
        </View>

        <View style={styles.lowerHalf}>
        
            <TextInput 
            onChangeText={data => setchildId(data)}
            style={[styles.input]}
            placeholder="Enter login Id"
             />
            <TextInput 
            onChangeText={data => setPassword(data)}
            style={[styles.input]}
            placeholder="Enter Password" />
            
            <TouchableOpacity  onPress={() => navigation.navigate("Login")}>
            <Text style={styles.forget}>I am a Parent ?</Text>
            </TouchableOpacity>

           

        </View>

        {
            loading ?
            <View style={styles.btnOuter}>
                <TouchableOpacity style={styles.btn} disabled>
                <Text style={styles.btnText}>Loading...</Text>
                </TouchableOpacity>
            </View>
             :  
            <View style={styles.btnOuter}>
                <TouchableOpacity style={styles.btn} onPress={() => childLogin(childId,password)}>
                <Text style={styles.btnText}>Log in</Text>
                </TouchableOpacity>
            </View>
        }
       

        




    </SafeAreaView>
  )
}

export default ChildLogin

const styles = StyleSheet.create({
    goBack: {
        position:"absolute",
        left: 20,
       
    },
    main: {
        height: "100%",
        backgroundColor:"#F5F5F5",
    },
    icon : {
        borderRadius: 40,
        padding: 13,
        position: "absolute",
        bottom: -35,
        elevation: 10,
        shadowColor: 'black',
        left: "43%"
    },
    upperHalf: {
        backgroundColor: "#5cadff",
        height: "27%",
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        borderBottomRightRadius:100,
        marginRight: -10
    },
    loginText: {
        color:"white",
        fontSize: 30,
        fontFamily: 'fsemibold'
    }, 
    input: {
        padding: 10,
        borderRadius: 8,
        borderColor: "#d3d3d3",
        borderStyle: 'solid',
        borderWidth: 1,
        marginVertical: 20
    } ,
    lowerHalf : {
        marginTop: 40,
        padding: 30,
    },
    forget:{
        textAlign: "center",
        marginTop:10,
        fontFamily: "fregular"   
    },
    btn:{
        backgroundColor: "#5cadff",
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
    }
})
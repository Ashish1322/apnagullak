import { StyleSheet, Text, View,  SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, {useContext, useState} from 'react'
import AppLoading from 'expo-app-loading'
import {useFonts} from 'expo-font'
import { Entypo } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserContext } from '../context';

const Register = ({navigation}) => {

    let [fontsLoaded] = useFonts({
        'fbold': require("../assets/Montserrat/static/Montserrat-Bold.ttf"),
        'fsemibold': require("../assets/Montserrat/static/Montserrat-SemiBold.ttf"),
        'fmedbold': require("../assets/Montserrat/static/Montserrat-Medium.ttf"),
        'fregular': require("../assets/Montserrat/static/Montserrat-Regular.ttf")
    })

    const {signup, loading} = useContext(UserContext)

    const [name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [gender,setgender] = useState("male")

    const handleSubmit = () => {
      if(name.length < 2)
        alert("Please enter valid name !")
      else if ( phone.length !=10 || phone[0] <= '5' )
        alert("Invalid Phone")
      else if ( password != password2)
        alert("Password doen't match")
      else
      {
        signup(email,password,name,phone,gender)
      }

    }

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

            <Text  style={styles.loginText}>Register</Text>

            <Ionicons 
            style={styles.icon}
            name="person-sharp" size={44} color="black"
            backgroundColor="#F5F5F5" />
        </View>

        <View style={styles.lowerHalf}>
        
        <TextInput 
        onChangeText={val => setEmail(val) }
        style={styles.input}
        placeholder="Email"
         />

            <View style={styles.inputRow}>
            <TextInput 
            onChangeText={val => setName(val) }
            style={{...styles.input,...styles.inputRowChild}}
            placeholder="Name"
             />
             
             <TextInput 
             onChangeText={val => setPhone(val) }
            style={{...styles.input,...styles.inputRowChild}}
            keyboardType="phone-pad"
            maxLength={10}
            placeholder="Phone Number"
          
             />
            </View>
          
            <TextInput 
            secureTextEntry={true}
            onChangeText={val => setPassword(val) }
            style={styles.input}
            placeholder="Password" />
            <TextInput 
            secureTextEntry={true}
            onChangeText={val => setPassword2(val) }
            style={styles.input}
            placeholder="Confirm Password" />

            <View style={styles.genderRow}>
              <TouchableOpacity 
              style={[styles.genderBox,gender == "male" ? {backgroundColor:"#d5d5d5"}: null]}
              onPress={() => setgender("male")}
              >
                 <Fontisto 
                 name="male" 
                 size={25} 
                 color="black" 
                 />
                 <Text>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={[styles.genderBox,gender=="female" ? {backgroundColor:"#d5d5d5"}: null]}
              onPress={() => setgender("female")}
              >
                <Fontisto 
                name="female" 
                size={25} 
                color="black" 
                />
                <Text>Fe-Male</Text>
              </TouchableOpacity>
            </View>
          
        </View>
        {
          loading 
          ? 
          <View style={styles.btnOuter}>
            <TouchableOpacity disabled={true} style={styles.btn}>
            <Text style={styles.btnText}>... Loading</Text>
            </TouchableOpacity>
         </View>
          :
          <View style={styles.btnOuter}>
            <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
            <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
         </View>
        }
       

        <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        >
            <Text style={styles.forget}>Already have an account ?</Text>
        </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  goBack: {
    position:"absolute",
    left: 20,
   
},
  genderRow: {
    display:"flex",
    justifyContent: 'space-evenly',
    flexDirection:"row",
    marginTop: 15
  },
  genderBox:{
    padding: 10,
    borderRadius: 8,
    borderColor: "#d3d3d3",
    borderStyle: 'solid',
    borderWidth: 1,
    width: 90,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    gap: 5

  },
  inputRow: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    gap: 10

  },
  inputRowChild: {
    minWidth:"50%",
    maxWidth:"50%",
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
        height: "23%",
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
        marginVertical: 8
    } ,
    lowerHalf : {
        marginTop: 20,
        padding: 30,
    },
    forget:{
        textAlign: "center",
        marginTop:20,
        fontFamily: "fregular" ,
    
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
   
    }
})
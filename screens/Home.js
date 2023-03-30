import { StyleSheet, Text, View,  SafeAreaView, TouchableOpacity, TextInput, Button, FlatList} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppLoading from 'expo-app-loading'
import {useFonts} from 'expo-font'
import { FontAwesome } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { UserContext } from '../context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons'; 
import { getDocs, collection,query,where } from 'firebase/firestore';
import { db } from '../firebase';
import { MaterialIcons } from '@expo/vector-icons'; 

const Home = ({navigation}) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => setModalVisible(true)
    const closeModal = () => setModalVisible(false);


    let [fontsLoaded] = useFonts({
        'fbold': require("../assets/Montserrat/static/Montserrat-Bold.ttf"),
        'fsemibold': require("../assets/Montserrat/static/Montserrat-SemiBold.ttf"),
        'fmedbold': require("../assets/Montserrat/static/Montserrat-Medium.ttf"),
        'fregular': require("../assets/Montserrat/static/Montserrat-Regular.ttf")
    })

    const {user,addParentTransaction, loading, addChild, logout} = useContext(UserContext)
    const [amount,setAmount] = useState(0);
    // Modal States and Methods
    const [modalname,setmodalnameName] = useState("")
    const [modalnameuserId,setmodalnameUserId] = useState("")
    const [modalnamepassword,setmodalnamePassword] = useState("")
    // childs state
    const [childs,setChilds] = useState([])
    // Fetching all the childs of the current user to show on the Home childs section
    useEffect(() => {
        const childRef = collection(db,"childs")
        const q = query(childRef,where("parent","==",user && user.id)) // fetching the childs of current user
        getDocs(q)
        .then((querySnapshot)=>{
            let childTemp = []
            querySnapshot.forEach((doc) => { // fetching individual transactions
                childTemp.push(doc.data())
              });
              
            setChilds(childTemp)
        })
        .catch(err => alert("Something went Wrong !"))
    },[user])


    if(!fontsLoaded)
    {
        return <AppLoading />
    }

    const addMoney = () => {
       // do the razorpay stuff herexs
       addParentTransaction(amount,"orderId2323232_322","23232dlfk",true,"Recharge")
    }


    
    const handleModalSubmit = () => {
        // password
        if(modalnamepassword.length < 6)
        {
            alert("Password should be of atleast 6 characters!")
            return;
        }
        // name
        if(modalname == "" || modalname==" ")
        {
            alert("Wrong Name!")
            return;
        }
        if( modalnameuserId.indexOf(' ') >= 0)
        {
            alert("UserId cannot conatain spaces !")
            return;
        }
        // check if the user name already exsits
        const childsRef = collection(db, "childs");
        const q = query(childsRef, where("userId", "==", modalnameuserId));
        getDocs(q)
        .then( snapshot => {
            if(snapshot.empty) // if there is no user with the give user id 
            {
                // then create a new user
                addChild(modalname,modalnamepassword,modalnameuserId)
                closeModal()
            }
            else
            alert("UserId already exists !")
        })
        .catch(() => alert("Something Went Wrong !"))
    }
    
 


  return (

    <SafeAreaView style={styles.main}>

        <View style={styles.upperHalf}>
            <Text style={styles.loginText}>Apna Gullak</Text>
        </View>
   
        <View style={styles.homeCard}>
            <Text style={{fontFamily:"fbold",backgroundColor:"#6cc366",color:"white",alignSelf:"flex-start", paddingHorizontal: 10, marginBottom: 10, borderRadius: 13, paddingVertical: 3,opacity:0.8}}>{user && user.name}</Text>

            <View style={{display:"flex",flexDirection:"row",gap:20}}>
                <View>
                    <MaterialCommunityIcons 
                    name="piggy-bank" 
                    size={70} 
                    color="black"
                    backgroundColor="white"
                    style={styles.icon} />
                </View>
                <View>
                   
                    <Text style={styles.balance}>₹ {user && user.wallet}</Text>
                    <Text style={styles.balanceP}>Account Balance</Text>
                </View>
            </View>
            
            
           
            <View style={styles.btnRow}>
                <TextInput keyboardType='numeric' onChangeText={value => setAmount(value)} style={styles.input} />

                {
                    loading ? 
                    <TouchableOpacity
                    disabled = {true}
                    style={styles.btn}
                
                    >
                    <Text
                         style={styles.btnText}>Please Wait...</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                    disabled = {amount <=0 }
                    style={styles.btn}
                    onPress={addMoney}
                    >
                        <Text
                         style={styles.btnText}>Add Money</Text>
                    </TouchableOpacity>
                }
                     
             
            </View>

        </View>

        <View style={styles.navigationRowMain}>
            <Text 
            style={styles.navigationText}>
            Quick Navigation</Text>

            <View style={styles.navigationRow}>

                <TouchableOpacity onPress={() => navigation.navigate("Transactions") } style={styles.navigationBox}>
                
                <FontAwesome name="paper-plane" size={24} color="#5cadff" />
                <Text
                style={styles.innerText}
                >Transactions</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationBox} 
                onPress={() => navigation.navigate("Statistics",{childs: childs})}>
                
                <Entypo name="bar-graph" size={24} color="#5cadff" />

                <Text
                style={styles.innerText}
                >Statistics</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationBox} onPress={logout}>
                
          
                <MaterialIcons name="logout" size={24} color="#5cadff" />
                <Text
                style={styles.innerText}>Logout</Text>

                </TouchableOpacity>
                
                
            </View>
        </View>

        <View>
            <Text 
            style={styles.navigationText}>
            Child Accounts</Text>
            <FlatList
            contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly', padding: 5}}
            data={childs}
            renderItem={
                ({item}) => 
                <TouchableOpacity 
                onPress={() => navigation.navigate("Child",{childId:item.userId}) }
                style={styles.child}
                >
                    <MaterialIcons name="account-circle" size={24} color="#5cadff" />
                    <Text style={styles.innerText}>{item.name}</Text>
                </TouchableOpacity> 
            }
            keyExtractor={item => item.userId}
            horizontal
            />
        
        </View>
        
        <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
        <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>

        <Modal isVisible={isModalVisible}>
                <View style={{backgroundColor:"white",padding: 20, borderRadius: 10 }}>
                
                <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row", marginBottom: 20,marginTop: 10}}>
                    <Text style={{fontFamily:"fsemibold",fontSize: 16,color:"grey"}}>Add Child</Text>
                    <TouchableOpacity onPress={() => closeModal()}>
                        <AntDesign name="close" size={24} color="grey" />
                    </TouchableOpacity>
                </View>

                <TextInput 
                onChangeText={val =>  setmodalnameName(val)}
                style={styles.modalInput}
                placeholder="Name" />

                <TextInput 
                onChangeText={val =>  setmodalnameUserId(val)}
                style={styles.modalInput}
                placeholder="Login id" />

                <TextInput 
                onChangeText={val =>  setmodalnamePassword(val)}
                style={styles.modalInput}
                placeholder="Password" />
                
                <Button  onPress={() => handleModalSubmit()} title="Add Child"  />
                </View>
        </Modal>
        


        
    </SafeAreaView>

  )
}

export default Home

const styles = StyleSheet.create({
    child:{
        backgroundColor:"white",
        padding: 10,
        height: 75,
        width: 90,
        borderRadius: 10,
        elevation: 4,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        gap: 8,
        marginHorizontal: 10,
        
    },
    input:{
        borderStyle:"solid",
        borderColor:"#d5d5d5",
        borderWidth:1,
        flexGrow: 1,
        borderRadius:10,
        paddingHorizontal: 10
       
    },
    modalInput: {
        padding: 10,
        borderRadius: 8,
        borderColor: "#d3d3d3",
        borderStyle: 'solid',
        borderWidth: 1,
        marginVertical: 8
    } ,
    addButton:{
        backgroundColor:"#6cc366",
        position: "absolute",
        bottom: 15,
        left: "43%",
        padding: 10,
        borderRadius: 100,
        width: 50,
        height: 50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"

        
    },
    navigationText:{
        textAlign:"center",
        fontSize: 19,
        fontFamily:"fbold" ,
        margin: 10,
        marginTop: 30
  },
  navigationRow: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-evenly"
  },
  navigationRowMain:{
    borderBottomColor:"#e2e2e2",
    borderBottomWidth: 3,
    paddingBottom: 34
  },
  innerText:{
    fontFamily:"fsemibold",
    fontSize: 10
  },
  navigationBox:{
    backgroundColor:"white",
    padding: 10,
    height: 75,
    width: 90,
    borderRadius: 10,
    elevation: 4,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    gap: 8
  },
    main: {
        height: "100%",
        backgroundColor:"#F5F5F5",
    },
    upperHalf: {
        backgroundColor: "#5cadff",
        height: "27%",
        padding: 10,
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
    btnRow: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop: 13,
        gap: 10
    },
    btn:{
        backgroundColor: "#5cadff",
        padding: 8,
        borderRadius: 30,
        elevation: 10,
        shadowColor: 'black',
        paddingHorizontal:20
        
    },
    btnText : {
        color:"white",
        fontFamily: 'fsemibold',
        textAlign:"center",
    },
    homeCard : {
        backgroundColor: "white",
        width: "80%",
        padding: 20,
        borderRadius: 30,
        marginTop: -60,
        marginLeft: "auto",
        marginRight:"auto",
        elevation: 20,
    height: 190
      
    },
    balance :{
 
        fontFamily:"fbold",
        fontSize:28,
 

    },
    balanceP: {
        fontFamily: "fregular",
        borderBottomWidth: 1,
        borderBottomColor:"#d5d5d5",
        paddingBottom: 10
    }
    
})
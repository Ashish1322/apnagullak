import { StyleSheet, Text, View,  SafeAreaView, TouchableOpacity, TextInput, Button, ScrollView} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppLoading from 'expo-app-loading'
import {useFonts} from 'expo-font'
import { UserContext } from '../context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons'; 
import { getDocs, collection,query,where,orderBy, addDoc, serverTimestamp,doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 



const ChildHome = ({navigation}) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => setModalVisible(true)
    const closeModal = () => setModalVisible(false);
    const [loading,setLoading] = useState(false)

    let [fontsLoaded] = useFonts({
        'fbold': require("../assets/Montserrat/static/Montserrat-Bold.ttf"),
        'fsemibold': require("../assets/Montserrat/static/Montserrat-SemiBold.ttf"),
        'fmedbold': require("../assets/Montserrat/static/Montserrat-Medium.ttf"),
        'fregular': require("../assets/Montserrat/static/Montserrat-Regular.ttf")
    })

    const {  refreshChild, childLogout, child} = useContext(UserContext)

    // Modal States and Methods
    const [amount,setAmount] = useState(0)
    const [why,setWhy] = useState("")
    const [transactions,setTransactions] = useState([])

    // fetch the transactions whenever the child will change
    useEffect(() => {
        // creating a query
        const trasRef = collection(db, "transactions");
        const q = query(trasRef, where("madeBy", "==",child && child.userId),orderBy("date",'desc'));
        // excecuting query
        getDocs(q)
        .then((querySnapshot) => {
          
          let trans = []
          querySnapshot.forEach((doc) => { // fetching individual transactions
            trans.push(doc.data())
          });
          setTransactions(trans) // updating the state
         
  
        })
        .catch((err) => alert("Something went Wrong! "))
     
  
      },[child])

    if(!fontsLoaded)
    {
        return <AppLoading />
    }

    
    const handleModalSubmit = async () => {

        if(amount <= 0 || why.length < 3)
        {
            alert("Enter valid details !")
            return;
        }
        if(amount > child.wallet)
        {
            alert("Insufficeint Funds")
            return
        }
        // checking chil's account is activated or blocked from direct database inroder to get the correct detials
        // not use the current child details fetch the new child details because it may be blocked by it's parent immedeatily so everytime child make payment first fetch the update account stats
        setLoading(true)
        const childRef= doc(db,"childs",child && child.userId)
        const sanpShot  = await getDoc(childRef)
        const childData = sanpShot.data();

        if(childData.active == false)
        {
            setLoading(false)
            refreshChild() // refresh child to show updated details
            alert("Your account is blocked by your parent")
            return
        }
        // checkin the max amount
        if(parseInt(childData.transationAmountLimit) < amount)
        {
            setLoading(false)
            alert("You exceeded your higher amount limit for this transaction!")
        }
        // add entery in transactions
        addDoc(collection(db,"transactions"),{
            madeBy: child.userId,
            stripePaymentId: "nil",
            amount:  "-"+amount,
            success: true,
            type: why,
            date:  serverTimestamp()
          })
        .then(() => {
            // when transaction is added then decrease the child baalance in database
            const childRef= doc(db,"childs",child && child.userId)
            updateDoc(childRef,{
                wallet: parseInt(child.wallet)-parseInt(amount)
            })
            .then(() => {
                // when wallet of child is decrease then refresh the child details so that transaction and active status can be reloaded
                refreshChild()
                setAmount(0)
                setWhy("")
                setLoading(false)
                closeModal()
            } )
            .catch((err) => {
                setLoading(false)
                alert("Error Occured ")})
        } )
        .catch(() => {
            setLoading(false)
            alert("Error Occured")})
    }
  

  return (

    <SafeAreaView style={styles.main}>

        <View style={styles.upperHalf}>
            <Text style={styles.loginText}>Hey, {child && child.name}</Text>
        </View>
   
        <View style={styles.homeCard}>

            <View style={{display : "flex",flexDirection:"row",justifyContent:"space-between"}}>  
                    <Text style={[child && child.active ? styles.active : styles.deactive]}>
                    {
                        child && child.active ? "Active" : "Blocked"
                    }</Text>
                    
                    <TouchableOpacity onPress={refreshChild}>
                    <Ionicons name="refresh-circle-outline" size={24} color="black" />
                    </TouchableOpacity>
            </View>
           

         

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
                   
                    <Text style={styles.balance}>₹ {child && child.wallet}</Text>
                    <Text style={styles.balanceP}>Your Pocket Money</Text>
                </View>
            </View>
            
            <View style={styles.btnRow}>
                    

                    <TouchableOpacity style={styles.btn} onPress={openModal}>
                     
                        <Text style={styles.btnText}>Pay Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={childLogout} style={[styles.btn, {backgroundColor:"#6cc366"}]}>
                        <MaterialIcons name="logout" size={24} color="white" />
                        <Text style={styles.btnText}>Log out</Text>
                     </TouchableOpacity>
             
            </View>

        </View>

        <Text style={styles.title}>Transactions</Text>

     
        <Modal isVisible={isModalVisible}>
                <View style={{backgroundColor:"white",padding: 20, borderRadius: 10 }}>
                
                <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row", marginBottom: 20,marginTop: 10}}>
                    <Text style={{fontFamily:"fsemibold",fontSize: 16,color:"grey"}}>Pay Now</Text>
                    <TouchableOpacity onPress={() => closeModal()}>
                        <AntDesign name="close" size={24} color="grey" />
                    </TouchableOpacity>
                </View>

                <TextInput 
                keyboardType='numeric'
                onChangeText={val =>  setAmount(val)}
                style={styles.modalInput}
                placeholder="Amount" />

                <TextInput 
                onChangeText={val =>  setWhy(val)}
                style={styles.modalInput}
                placeholder="Why are you paying ?" />
                
                {
                    loading ?     
                    <Button  disabled={true} title="Please Wait...."  />
                    :
                    <Button  onPress={() => handleModalSubmit()} title="Make Payment"  />
                }

             
                </View>
        </Modal>

        <ScrollView style={styles.lowerHalf}>

          {
            transactions.map((transaction,index) => 
                <View key={index} style={styles.transRow}>
                <View>
                  <Text style={styles.transTitle}>{transaction.type}</Text>
                  <Text style={styles.transP}>{transaction.date.toDate().toLocaleDateString()}, {transaction.date.toDate().toLocaleTimeString()}</Text>
                </View>
                <View>
                  <Text 
                  style={[styles.transTitle, {textAlign:"right"},
                    transaction.amount[0]=='-' ? {color:"red"}:{color:"#6cc366"}]}
                  >
                  ₹ {transaction.amount}</Text>
                  <Text style={[styles.transP,{textAlign:"right"}]}>{transaction.stripePaymentId}</Text>
                </View>
              </View>
          )
          }
          

        </ScrollView>
        

    </SafeAreaView>

  )
}

export default ChildHome

const styles = StyleSheet.create({
    lowerHalf:{
        padding: 15
    },
    title: {
        textAlign:"center",
        fontSize: 19,
        fontFamily:"fbold" ,
        margin: 10,
        marginTop: 30
    },
    active:{
        fontFamily:"fbold",
        backgroundColor:"#6cc366",
        color:"white",
        paddingHorizontal: 10, 
        borderRadius: 13, 
        paddingVertical: 3,
        opacity:0.8,
        alignSelf:"flex-start"
    },
    deactive: {
        fontFamily:"fbold",
        backgroundColor:"#dc3545",
        color:"white",
        alignSelf:"flex-start",
        paddingHorizontal: 10, 
     
        borderRadius: 13, 
        paddingVertical: 3,
        opacity:0.8
    },
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

  innerText:{
    fontFamily:"fsemibold",
    fontSize: 10
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
        paddingHorizontal:20,
        display:"flex",
        flexDirection:"row",
        gap: 5,
        alignItems:"center"
        
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
    },
    transRow: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        margin: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor:"#d5d5d5",
        borderRadius: 20,
        
      },
      transTitle: {
        fontFamily:"fsemibold",
        fontSize: 16,
     
      },
      transP: {
        fontSize: 12,
        fontFamily:"fregular",
        color:"grey"
      }
    
})
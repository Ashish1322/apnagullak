import { StyleSheet, Text, View,  SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {useFonts} from 'expo-font'
import { Entypo } from '@expo/vector-icons'; 
import { UserContext } from '../context';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '../firebase';

const Transactions = ({navigation}) => {

    let [fontsLoaded] = useFonts({
        'fbold': require("../assets/Montserrat/static/Montserrat-Bold.ttf"),
        'fsemibold': require("../assets/Montserrat/static/Montserrat-SemiBold.ttf"),
        'fmedbold': require("../assets/Montserrat/static/Montserrat-Medium.ttf"),
        'fregular': require("../assets/Montserrat/static/Montserrat-Regular.ttf")
    })
    
    const {user} = useContext(UserContext)
    const [transactions,setTransactions] = useState([])
    const [transLoading, setTransLoading] = useState(false);

    // loading the transactions when screen is opened
    useEffect(() => {

      setTransLoading(true)
      // creating a query
      const trasRef = collection(db, "transactions");
      const q = query(trasRef, where("madeBy", "==", user.id),orderBy("date",'desc'));

      // excecuting query
      getDocs(q)
      .then((querySnapshot) => {
        
        let trans = []
        querySnapshot.forEach((doc) => { // fetching individual transactions
          trans.push(doc.data())
        });
        setTransactions(trans) // updating the state
        setTransLoading(false)

      })
      .catch((err) => navigation.navigate("Home"))
   

    },[])


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
        
            <Text style={styles.loginText}>Transactions</Text>

  
        </View>

        <ScrollView style={styles.lowerHalf}>

        {transLoading && <Text style={{fontFamily:"fbold",textAlign:"center",color:"grey",fontSize:20}}>Fetching Transactions ...</Text>}
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
                  <Text style={[styles.transP,{textAlign:"right"}]}>{transaction.razorpayOrderid}</Text>
                </View>
              </View>
          )
          }
          

        </ScrollView>

        

    </SafeAreaView>
  )
}

export default Transactions

const styles = StyleSheet.create({
    goBack: {
        position:"absolute",
        left: 20,  
    },
    main: {
        height: "100%",
        backgroundColor:"#F5F5F5",
    },
    upperHalf: {
        backgroundColor: "#5cadff",
        height: "25%",
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
    
    lowerHalf : {
        marginTop: 40,
        padding: 15,
        overflow:"scroll"
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
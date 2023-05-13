import { StyleSheet, Text, View,  SafeAreaView, TouchableOpacity, TextInput,ScrollView, Switch, Button} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppLoading from 'expo-app-loading'
import {useFonts} from 'expo-font'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { getDocs, collection,query,where , doc, updateDoc, getDoc, setDoc} from 'firebase/firestore';
import { db } from '../firebase';
import { UserContext } from '../context';
import { Entypo } from '@expo/vector-icons'; 
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons'; 



const Child = ({route,navigation}) => {

    const [child,setChild] = useState(null)
    const [transLoading, setTransLoading] = useState(false);
    const [transactions,setTransactions] = useState([])
    const [isEnabled, setIsEnabled] = useState(true);
    const [amount,setAmount] = useState(0)

    const {addMoneyToChild,loading}  = useContext(UserContext)

    // active deactive function of child accounts
    const toggleSwitch = () => 
    {
        const docRef = doc(db,"childs",child.userId)
        updateDoc(docRef,{active: !child.active})
        .then(() => {
            setChild({...child, active: !child.active})
            setIsEnabled(previousState => !previousState);
        })
        .catch(() => alert("Error Occured"))
        
        
    }
    
    // Modal to edit Child Details
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => setModalVisible(true)
    const closeModal = () => setModalVisible(false);
    const [modalname,setmodalnameName] = useState("")
    const [modalnamepassword,setmodalnamePassword] = useState("")
    const [modalAmountLimit,setModalAmountLimit] = useState(0)

    // setting the child details by fetching it's value from database, ( id of the child is passed by parent component using router)
    useEffect(()=>{
        setTransLoading(true)
        const docRef = doc(db,"childs",route.params.childId)
        getDoc(docRef)
        .then(snapshot => {
            // once we fetch the child then load it's transactons
            loadTransactions()
            setChild(snapshot.data())

            // populating the intiial values of child on the modal
            setmodalnameName(snapshot.data().name)
            setmodalnamePassword(snapshot.data().password)
            setModalAmountLimit(snapshot.data().transationAmountLimit)

            // setting teh sweith
            if(snapshot.data().active)
            {
                setIsEnabled(true)
            }
            else
            setIsEnabled(false)
        })
        .catch(() => navigation.navigate("Home"))




    },[])

    
    // method to load the transactions when the child details are fetch from database
    const loadTransactions = () => {

        // creating a query
        const trasRef = collection(db, "transactions");
        const q = query(trasRef, where("madeBy", "==",route.params.childId ));
  
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
      }

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

    const handleModalSubmit = async  () => {
        // updating the child details
        await setDoc(doc(db, "childs", child.userId), {
            ...child,
            name: modalname,
            password: modalnamepassword,
            transationAmountLimit: modalAmountLimit
          });
        
        alert("Details Updated")
    }
    console.log(child)

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
            <Text style={styles.loginText}>{child && child.name}</Text>
        </View>
        {
            transLoading ? <Text style={{fontFamily:"fbold",textAlign:"center",color:"grey",fontSize:20, marginTop: 30}}>Fetching Data ...</Text> :
            <>
            <View style={styles.homeCard}>
    
            <View style={styles.activeToggleContainer}>
                <Text style={[ child && child.active ? styles.active : styles.deactive]}>{child && child.active ? "Active" : "Blocked"}</Text>
                <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={ '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                />

                <TouchableOpacity style={{position:"absolute",right:0}} onPress={openModal}>
                    <MaterialCommunityIcons name="lead-pencil" size={24} color="white" />
                </TouchableOpacity>
            </View>
    
                <View style={{display:"flex",flexDirection:"row",gap:20}}>
                    <View>
                        <MaterialCommunityIcons 
                        name="piggy-bank" 
                    
                        size={70} 
                        color="white"
                  
                       />
                    </View>
                    <View>
                       
                        <Text style={styles.balance}>₹ {child && child.wallet}</Text>
                        <Text style={styles.balanceP}>Child Balance</Text>
                    </View>
                </View>
                
                
               
                <View style={styles.btnRow}>
                    <TextInput keyboardType='numeric' onChangeText={e => setAmount(e)}  style={styles.input} />
                        <TouchableOpacity
                        onPress={() => addMoneyToChild(child,amount)}
                        disabled={amount <= 0 || loading}
                        style={styles.btn}
                        >
                            <Text
                             style={styles.btnText}>{ loading ? "Please Wait...." :"Give Pocket Money"}</Text>
                    </TouchableOpacity>
            
                         
                 
                </View>
    
            </View>
    
            <Modal isVisible={isModalVisible}>
            <View style={{backgroundColor:"white",padding: 20, borderRadius: 10 }}>
            
            <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row", marginBottom: 20,marginTop: 10}}>
                <Text style={{fontFamily:"fsemibold",fontSize: 16,color:"grey"}}>Update Details</Text>
                <TouchableOpacity onPress={() => closeModal()}>
                    <AntDesign name="close" size={24} color="grey" />
                </TouchableOpacity>
            </View>

            <TextInput 
            value={modalname}
            onChangeText={val =>  setmodalnameName(val)}
            style={styles.modalInput}
            placeholder="Name" />


            <TextInput 
            value={modalnamepassword}
            onChangeText={val =>  setmodalnamePassword(val)}
            style={styles.modalInput}
            placeholder="Password" />

            <TextInput 
            value={modalAmountLimit}
            onChangeText={val =>  setModalAmountLimit(val)}
            style={styles.modalInput}
            placeholder="Payment Amount Limit" 
        />
            
            <Button  onPress={() => handleModalSubmit()} title="Update Details"  />
            </View>
    </Modal>

            <Text style={styles.title}>Transactions</Text>
            <ScrollView style={styles.lowerHalf}>
    
    
            {
                transactions.map((item) =>  <View style={styles.transRow}>
                <View>
                  <Text style={styles.transTitle}>{item.type}</Text>
                  <Text style={styles.transP}>{item.date.toDate().toLocaleDateString()}, {item.date.toDate().toLocaleTimeString()}</Text>
                </View>
                <View>
                  <Text 
                  style={[styles.transTitle, {textAlign:"right"},
                    item.amount[0]=='-' ? {color:"red"}:{color:"#6cc366"}]}
                  >
                  ₹ {item.amount}</Text>
                  <Text style={[styles.transP,{textAlign:"right"}]}>{item.stripePaymentId}</Text>
                </View>
              </View> )
            }
                   
            
    
            </ScrollView>
            </>
        }
      
        
    </SafeAreaView>

  )
}

export default Child

const styles = StyleSheet.create({
    activeToggleContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
       
    },
    active:{
        fontFamily:"fbold",
        backgroundColor:"#6cc366",
        color:"white",
        
        paddingHorizontal: 10, 

        borderRadius: 13, 
        paddingVertical: 3,
        opacity:0.8
    },
    deactive: {
        fontFamily:"fbold",
        backgroundColor:"#dc3545",
        color:"white",
        
        paddingHorizontal: 10, 
     
        borderRadius: 13, 
        paddingVertical: 3,
        opacity:0.8
    },
    input:{
        borderStyle:"solid",
        borderColor:"#d5d5d5",
        borderWidth:1,
        flexGrow: 1,
        borderRadius:10,
        paddingHorizontal: 10,
        backgroundColor:"white"
       
    },
    goBack: {
        position:"absolute",
        left: 20,  
    },
    title: {
        textAlign:"center",
        fontSize: 19,
        fontFamily:"fbold" ,
        margin: 10,
        marginTop: 30
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
        backgroundColor: "black",
        width: "80%",
        padding: 15,
        borderRadius: 30,
        marginTop: -60,
        marginLeft: "auto",
        marginRight:"auto",
        elevation: 20,
        height: 200
      
    },
    balance :{
 
        fontFamily:"fbold",
        fontSize:28,
        color:"white"
 

    },
    balanceP: {
        fontFamily: "fregular",
        borderBottomWidth: 1,
        borderBottomColor:"#d5d5d5",
        paddingBottom: 10,
        color:"white"
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
        fontSize: 16
      },
      transP: {
        fontSize: 12,
        fontFamily:"fregular",
        color:"grey"
      },
      modalInput: {
        padding: 10,
        borderRadius: 8,
        borderColor: "#d3d3d3",
        borderStyle: 'solid',
        borderWidth: 1,
        marginVertical: 8
    } ,
    
})
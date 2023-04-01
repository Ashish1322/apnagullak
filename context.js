import React, { useState } from 'react';

export const UserContext = React.createContext();
import {signInWithEmailAndPassword, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signOut} from "firebase/auth"
import {auth,db} from "./firebase.js"


import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


import Landing from './screens/Landing.js';
import Login from './screens/Login.js';
import Register from './screens/Register.js';
import Home from './screens/Home.js';
import Transactions from './screens/Transactions.js';
import Statistics from './screens/Staticstics.js';

import Child from './screens/Child.js'; // child screen is the screen that will show the details and settings of child to it's parent
import ChildLogin from './screens/ChildLogin.js';
import ChildHome from './screens/ChildHome.js'; // Home screen when child logged in success

import { useNavigation } from '@react-navigation/native';

import {doc, setDoc, getDoc, updateDoc, addDoc, collection,serverTimestamp} from "firebase/firestore"



export default function AuthContext()
{
   
    // using the navigation to navigate
    const navigation = useNavigation();

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(false);
    const [child,setChild] = useState(null)

    // handle login
    const handleLogin =  (email,password) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then( async (userCredential) => {
            // if credentials are right then fetch the actual user from firestore and save in state
            const id = userCredential.user.uid;   // fetching the doc id 
            const docRef = doc(db,"parent",id);   // making ref to doc
            const docSnap = await getDoc(docRef); // fetching the doc
            if (docSnap.exists()) {               // validataing the doc
              setUser(docSnap.data())
              setLoading(false)
            } else {
              setLoading(false)
              alert("Please Try Again !")

            } 
        })
        .catch((err) => {
           setLoading(false)
            err = err.message
            if(err.includes("email"))
            {
                alert("Invalid Email")
            }
            else if(err.includes("password"))
            {
                alert("Invaid Password")
            }
            
        });
    }

    // logout
    const logout = () => {
        signOut(auth).then(() => setUser(null) ).catch((err) => console.log(err) )
    }

    // this method will run when the user signup will be successfull by auth ( this method will make an entry in th parent collection)
    const addParent = (email,name,phone,gender,id) => {
      const docRef = doc(db,"parent",id) // doc with custom id
      setDoc(docRef, {
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        id: id,
        wallet: 0,
      })
      .then(() => {
        alert("Account created successfully, Now you are read to login!")
        navigation.navigate("Login")
        setLoading(false)
      })
      .catch(() => setLoading(false))
      
    }

    // Method to signup the user by using using firebase auth ( on success it will call the addParent to add the same user in the parent colllection aslo)
    function signup(email, password,name,phone,gender) {
       setLoading(true);
       fetchSignInMethodsForEmail(auth,email).then(function(signInMethods) {
          if (signInMethods.length > 0) {
            // User already exists
            setLoading(false)
            alert('This email address is already registered. Please sign in instead.');
          } 
          else {
            // Create new user account
            createUserWithEmailAndPassword(auth,email, password).then(function(user) {
              // User created successfully and add it in the Parent collection then navigate to login
              addParent(email,name,phone,gender,user.user.uid);
            })
            .catch(function(error) {
              // Handle errors
              setLoading(false)
              var errorMessage = error.message;
              alert(errorMessage);
            });
          }
        }).catch(function(error) {
          // Handle errors
          setLoading(false)
          var errorMessage = error.message;
          alert(errorMessage);
        });
    }
      
    // method to refresh the user detials
    const refreshUser = async () => {
      const id = user.id;   // fetching the doc id 
      const docRef = doc(db,"parent",id);   // making ref to doc
      const docSnap = await getDoc(docRef); // fetching the doc
      if (docSnap.exists()) {               // validataing the doc
          setUser(docSnap.data())
          setLoading(false)
      } 
      else {
          setLoading(false)
          alert("Please Try Again !")

      } 
    }

    // 1. Method to add the transactions of parent account
    // 2. update the parent balance, 
    // 3. finally refresh teh parent so get the updated details
    const addParentTransaction = (amount,razorpayOrderid,success,type) => {
   
      setLoading(true)

      // making the transactions entry in transacton collection
      addDoc(collection(db,"transactions"),{
        madeBy: user.id,
        stripePaymentId: razorpayOrderid,
        amount:  amount,
        success: success,
        type:type,
        date:  serverTimestamp()

      })
      .then((data) => {
        //  updating the user with new wallte amount
        const userRef = doc(db,"parent",user.id)
        updateDoc(userRef, {
          wallet:  parseInt(user.wallet) + parseInt(amount)
        })
        .then(() =>  {
          // payemnt success
          refreshUser()
          alert("Money Added Successfully")
        }  )
        .catch(err => {
          setLoading(false)
          alert("Some error occured ! Please try again")
        })  // refresing the user to show the updated details
     
      })
      .catch(err => {
        setLoading(false)
        alert("Some error occured ! Please try again")
      })
    }

    // method to add money to the child wallet and deduct from parent wallet
    const addMoneyToChild = (child,amount) => {
      // check if the parent has sufficient money
      if(user.wallet < amount){
        alert("Insufficient Funds!\nPlease add Money to your account")
        return;
      }
      setLoading(true)
      // Add Money to child account
      const docRef = doc(db,"childs",child.userId)
      updateDoc(docRef,{wallet: parseInt(child.wallet) + parseInt(amount)})
      .then(() => {
          // once money is addded to child account then call the addParentTransaction method to add and update detials
          addParentTransaction("-"+amount,"nill",true,child.name+" "+"Pocket Money")
          navigation.navigate("Home")
      })
      .catch(() => {
        setLoading(false)
        alert("Error Occured")
      })
    }

    //////////////////////////////////////////////////// CHILD METHODS


    // Add Child 
    const addChild = (name,password,userId) => {
      const childRef = doc(db,"childs",userId)
      setDoc(childRef, {
        name: name,
        userId: userId,
        password: password,
        permissions: [],
        active: true,
        parent: user.id,
        wallet: 0
      })
      .then(() => refreshUser())
      .catch(() => alert("Something went Wrong !"))
    }


    // child login
    const childLogin = (childId,password) => {
      
      // empty submission of detials
      if(childId.length == 0 || password.length == 0)
      {
        alert("Invalid Details")
        return;
      }
      setLoading(true)
      // check if the child with this id exists
      const docRef = doc(db,"childs",childId)
      getDoc(docRef)
      .then(docSnapshot => {
        // if id is wrong
        setLoading(false)
        if(!docSnapshot.exists())
        {
          alert("Wrong Login Id")
         
          return
        }
        // if id is right verify password
        const data = docSnapshot.data();
        if(data.password != password)
        {
          alert("Invalid Password !")
          return;
        }
        // if password is right then update child
        setChild(data)
     
       
      })
      .catch(err => {
        setLoading(false)
        alert("Something went Wrong !")
      })
    }

    // child logut
    const childLogout = () => {
      setChild(null)
      setUser(null)
    }

    // refresh child details 
    const refreshChild = () => {
      const docRef = doc(db,"childs",child.userId)
      getDoc(docRef)
      .then(docSnapshot => setChild(docSnapshot.data()) )
    }

   
    return (
        <UserContext.Provider value={{user,handleLogin,signup,loading,addParentTransaction,addChild,logout,addMoneyToChild,childLogin,child,childLogout,refreshChild}}>
            <Stack.Navigator screenOptions={{ headerShown: false}}>
                {
                  child != null ?   <Stack.Screen name="ChildHome" component={ChildHome} /> : 
                  <>
                    {
                      user==null ?
                      <>
                      <Stack.Screen name="Landing" component={Landing} />
                      <Stack.Screen name="Login" component={Login} />
                      <Stack.Screen name="Register" component={Register} />
                      <Stack.Screen name="ChildLogin" component={ChildLogin} />
    
                      </>
                    
                      :
                      <>
                   
                      <Stack.Screen name='Home' component={Home} />
                      <Stack.Screen name='Transactions' component={Transactions} />
                      <Stack.Screen name="Child" component={Child} />
                      <Stack.Screen name="Statistics" component={Statistics} />
                    
                      </>
                     
                    }
                    </>
                }
                
                
               
            </Stack.Navigator>
        </UserContext.Provider>
    )
}
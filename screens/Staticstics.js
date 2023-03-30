import { StyleSheet, Text, View,  SafeAreaView, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import AppLoading from 'expo-app-loading'
import {useFonts} from 'expo-font'
import { collection ,getDocs} from 'firebase/firestore'
import { db } from '../firebase'


import {
    LineChart,
    BarChart,
  } from "react-native-chart-kit";

const Statistics = ({route,navigation}) => {

 
    const childs = route.params.childs
    const [childNames, setChildNames] = useState([])
    const [childExpense,setChlildExpense] = useState([])
    const [count,setcount] = useState([])

    // finding how much payment is done by every child
    useEffect(() => {
        const transRef = collection(db,"transactions")
        getDocs(transRef)
        .then((docsSnap) => {
            // storing all the childs id of current parent to match with transactions
            const childIds = {}
            const countPayments = {}
            for (id of childs) {
                childIds[id.userId] = 0
                countPayments[id.userId] = 0
            }

            docsSnap.forEach(doc => {
                let data = doc.data();
                if(childIds.hasOwnProperty(data.madeBy))
                {
                    childIds[data.madeBy] += Math.abs(parseInt(data.amount))
                    countPayments[data.madeBy] += 1
                }
            })
            // separting name and expeses to show in grpah
            let a = []
            let b = []

            let counts = []
            for( key in childIds)
            {
                a.push(key)
                b.push(childIds[key])
                counts.push(countPayments[key])
            }
            setChildNames(a)
            setChlildExpense(b)
            setcount(counts)


        } )
        
    },[])

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
    

 

      const chartConfig = {
        backgroundGradientFrom: "#d5d5d5",
        backgroundGradientTo: "#d5d5d5",
        backgroundGradientFromOpacity: 1,
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false // optional
      };

    return (

    <SafeAreaView style={styles.main}>

        <View style={styles.upperHalf}>
            <Text style={styles.loginText}>Statistics</Text>
        </View>
        

        <View style={styles.paymentChart}>
        
        <Text style={{fontFamily:"fregular", textAlign:"center", margin: 10}}>Payment Volumne of Childs</Text>
        <LineChart
        data={{
          labels: childNames,
          datasets: [
            {
              data: childExpense
            }
          ]
        }}
        width={Dimensions.get("window").width-30} // from react-native
        height={220}
        yAxisLabel="₹"
        
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          
            backgroundColor: "#d5d5d5",
            backgroundGradientFrom: "#d5d5d5",
            backgroundGradientTo: "#d5d5d5",
     
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "black"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          
        }}
         />

         <Text style={{fontFamily:"fregular", textAlign:"center", margin: 10}}>Number of Payments </Text>
         <BarChart
    
         data={{
            labels: childNames,
            datasets: [
                {
                    data: count
                }
            ]

         }}
         width={300}
         height={220}
         chartConfig={chartConfig}
         verticalLabelRotation={30}
       />

        </View>
      
        
    </SafeAreaView>

  )
}

export default Statistics

const styles = StyleSheet.create({
  
    paymentChart: {
        padding:20
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
        height: "20%",
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
      }
    
})
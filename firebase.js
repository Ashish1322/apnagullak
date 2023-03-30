import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDqD0-yrS7D3D9VbGaW1avvRq21sket3s0",
    authDomain: "apna-gullak.firebaseapp.com",
    projectId: "apna-gullak",
    storageBucket: "apna-gullak.appspot.com",
    messagingSenderId: "297632433645",
    appId: "1:297632433645:web:7b9f3f1fc1c32b829d13e4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {app,auth,db}


// <BarChart
    
// data={data}
// width={300}
// height={220}
// yAxisLabel="$"
// chartConfig={chartConfig}
// verticalLabelRotation={30}
// />




// <LineChart
// data={{
//   labels: childNames,
//   datasets: [
//     {
//       data: childExpense
//     }
//   ]
// }}
// width={Dimensions.get("window").width-30} // from react-native
// height={220}
// yAxisLabel="₹"

// yAxisInterval={1} // optional, defaults to 1
// chartConfig={{
  
//     backgroundColor: "#d5d5d5",
//     backgroundGradientFrom: "#d5d5d5",
//     backgroundGradientTo: "#d5d5d5",

//   decimalPlaces: 2, // optional, defaults to 2dp
//   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//   style: {
//     borderRadius: 16,
//   },
//   propsForDots: {
//     r: "6",
//     strokeWidth: "2",
//     stroke: "black"
//   }
// }}
// bezier
// style={{
//   marginVertical: 8,
//   borderRadius: 16,
  
// }}
//  />
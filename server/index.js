import express from "express";
import cors from "cors"
import boyd_parser from "body-parser"
import nodemailer from "nodemailer"

const app = express();
app.use(cors())
app.use(boyd_parser.json())

const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51LSvzlSDr67aca5VWkvF5mWBipmZ7q8Vq1dXxV2czrPJ7LzWQYEmVJXVCCER6wWahzkI0Xx8en09nvre4pgcqLQe00m6XOjPxq";
const SECRET_KEY = "sk_test_51LSvzlSDr67aca5VRvIMyAIQeSCHqaZW1Yf9rlQfpcRiJSWvsLxA8fZ737Ygbs6SBy27cGuNbuQvcSbcf1ERdlWT00fIkRLDp7";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });



app.get("/",(req,res) => res.send("Working"))

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(req.body.amount)*100, //lowest denomination of particular currency
      currency: "inr",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });

  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
const stripe = require('stripe')("sk_test_51NzC0aSByxnBODQJyEQ6fJ8IlVceuZ1T5NSI8bXVVDTSWv9LjNcY90jCBT90zrgWYZHVsPkqBFOVWSknh0cwonnk00EsVte3Dy");


exports.createPayment = async function (req, res, next) {
    try {
        //
        const charge = await stripe.charges.create({
            amount: 2000, // amount in cents
            currency: 'usd',
            source: 'tok_visa', // token obtained with Stripe.js
            description: 'Charge for test@example.com',
          });
          
          console.log(charge);
    

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "Fail",
            msg: "User not Found",
            error: error
        });
    }
}


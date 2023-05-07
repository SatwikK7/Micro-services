// sk_test_51N2xkMSG5mYIB3hTcOMIKdVI4hD9JYmdfaSWKzSjvgweKSOjS72WL8sA9SELAvxSSzlCqtjOBbQZ1wbYfzObuJGM00pUgyL8DF
// Coffee Cup: price_1N2yfHSG5mYIB3hTOxo9Vf7k
// Sunglasses: price_1N2ygnSG5mYIB3hTNIatfEtH
// Camera:price_1N2yhcSG5mYIB3hTGQEA7NQy

const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51N2xkMSG5mYIB3hTcOMIKdVI4hD9JYmdfaSWKzSjvgweKSOjS72WL8sA9SELAvxSSzlCqtjOBbQZ1wbYfzObuJGM00pUgyL8DF');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]

    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

app.listen(4000, () => console.log("Listening on port 4000!"));
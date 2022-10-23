const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dbConnect = require('./Utils/dbConnect');
const productsRoutes = require('./Routes/v1/tools.route');
const ViewCount = require('./Middleware/ViewCount');
const { default: rateLimit } = require('express-rate-limit');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// middleware
app.use(express.json());
app.use(cors());

// app.use(ViewCount);
// module.exports.limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

// app.use(limiter);

// Get JWT Token

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'UnAuthorized Aceess' })
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Forbidden Access' })
        }
        // console.log('decoded', decoded);
        req.decoded = decoded;
    })
    // console.log('Inside VerifyJWT',authHeader);
    next();
}




// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hmmg8.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

dbConnect();

app.use("/api/v1/products", productsRoutes);

const run = async () => {
    try {
        await client.connect();
        const productsCollection = client.db("PCHubBD").collection("Products");
        const usersCollection = client.db("PCHubBD").collection("Users");
        const profilesCollection = client.db("PCHubBD").collection("Profiles");
        const blogsCollection = client.db("PCHubBD").collection("Blogs");
        const ordersCollection = client.db("PCHubBD").collection("Orders");
        const reviewsCollection = client.db("PCHubBD").collection("Reviews");
        const paymentsCollection = client.db("PCHubBD").collection("Payments");


        // // get products
        // app.get('/products', async(req, res) => {
        //     const query = {};
        //     const products = productsCollection.find(query);
        //     const result = await products.toArray();
        //     res.send(result);
        // })

        // // get product by id
        // app.get('/product/:id', async(req, res) => {
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)};
        //     const product = await productsCollection.findOne(query);
        //     res.send(product);
        // })

        // // post product
        // app.post('/product', verifyToken, async(req, res) => {
        //     const product = req.body;
        //     const result = await productsCollection.insertOne(product);
        //     res.send(result)
        // })


        // // update product
        // app.put('/updateproduct/:id', verifyToken, async(req, res)=> {
        //     const id = req.params.id;
        //     const product = req.body;
        //     const filter = {_id: ObjectId(id)};
        //     const options = {upsert : true};
        //     const updatedDoc = {
        //         $set: product,
        //     };
        //     const result = await productsCollection.updateOne(filter, updatedDoc, options);
        //     res.send(result);

        // })

        // // delete product
        // app.delete('/product/:id', verifyToken, async(req, res) => {
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)};
        //     const result = await productsCollection.deleteOne(query);
        //     res.send(result);
        // })

        // // post order
        // app.post('/orders', async(req, res) => {
        //     const order = req.body;
        //     const result = await ordersCollection.insertOne(order);
        //     res.send(result)
        // })

        // // get order
        // app.get('/orders', async(req, res) => {
        //     const query = {};
        //     const result = await ordersCollection.find(query).toArray();
        //     res.send(result);
        // })

        // // get order by id
        // app.get('/order/:id', async(req, res) => {
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)};
        //     const result = await ordersCollection.findOne(query);
        //     res.send(result);
        // })

        // // delete order by id
        // app.delete('/order/:id', async(req, res) => {
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)};
        //     const result = await ordersCollection.deleteOne(query);
        //     res.send(result);
        // })

        // // get order by email
        // app.get('/orders/:email', async(req, res) => {
        //     const email = req.params.email;
        //     const query = {email: email};
        //     const result = await ordersCollection.find(query).toArray();
        //     res.send(result);
        // })

        // // // get order by email
        // // app.patch('/order/:id', verifyToken, async(req, res) => {
        // //     const id = req.params.id;
        // //     const payment = req.body;
        // //     const filter = {_id: ObjectId(id)};
        // //     const updatedDoc = {
        // //         $set: {
        // //             paid: true,
        // //             transactionId: payment.transactionId,
        // //         }
        // //     }
        // //     const result = await paymentsCollection.updateOne(payment);
        // //     const updateOrder = await ordersCollection.updateOne(filter, updatedDoc);
        // //     res.send(updatedDoc);
        // // })


        // // Post Admin Role
        // app.put('/user/admin/:email', verifyToken, async(req, res)=> {
        //     const email = req.params.email;
        //     const requester = req.decoded?.email;
        //     const recuesteraccount = await usersCollection.findOne({email: requester});
        //     if(recuesteraccount.role === 'admin'){
        //         const filter = {email: email};
        //         const updatedDoc = {
        //             $set: {role: 'admin'},
        //         };
        //         const result = await usersCollection.updateOne(filter, updatedDoc);
        //         res.send(result);
        //     }else{
        //         return res.status(403).send({message: 'Forbidden Aceess'})
        //     }

        // })



        // // Remove Admin
        // app.put('/user/removeadmin/:email', verifyToken, async(req, res)=> {
        //     const email = req.params.email;
        //     const filter = {email: email};
        //     const updatedDoc = {
        //         $set: {role: ''},
        //     };
        //     const result = await usersCollection.updateOne(filter, updatedDoc);
        //     res.send(result);

        // })


        // // get admin
        // app.get('/user/admin/:email', verifyToken, async(req, res) => {
        //     const email = req.params.email;
        //     const user = await usersCollection.findOne({email: email});
        //     const isAdmin = user.role === 'admin';
        //     res.send({admin: isAdmin});
        // })


        // // Post user by email
        // app.put('/user/:email', async(req, res)=> {
        //     const email = req.params.email;
        //     const user = req.body;
        //     const filter = {email: email};
        //     const options = {upsert : true};
        //     const updatedDoc = {
        //         $set: user,
        //     };
        //     const result = await usersCollection.updateOne(filter, updatedDoc, options);
        //     const token = jwt.sign({email:email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
        //     res.send({result, accessToken: token});

        // })


        // // get users
        // app.get('/users', verifyToken, async(req, res) => {
        //     const users = await usersCollection.find().toArray();
        //     res.send(users);
        // })


        // // delete user
        // app.delete('/removeuser/:email', verifyToken, async(req, res) => {
        //     const email = req.params.email;
        //     const query = {email: email};
        //     const result = await usersCollection.deleteOne(query);
        //     res.send(result);
        // })


        // // post profile by email
        // app.put('/profile/:email', verifyToken, async(req, res) => {
        //     const email = req.params.email;
        //     const profile = req.body;
        //     const filter = {email: email};
        //     const options = {upsert : true};
        //     const updatedDoc = {
        //         $set: profile,
        //     };
        //     const result = await profilesCollection.updateOne(filter, updatedDoc, options);
        //     res.send(result);
        // })

        // // get profile by email
        // app.get('/profile/:email', async(req, res) => {
        //     const email = req.params.email;
        //     const query = {email: email}
        //     const profile = await profilesCollection.findOne(query);
        //     res.send(profile);
        // })

        // // get blogs
        // app.get('/blogs', async(req, res) => {
        //     const blogs = await blogsCollection.find().toArray();
        //     res.send(blogs);
        // })

        // // get blog by id
        // app.get('/blog/:id', async(req, res) => {
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)};
        //     const blog = await blogsCollection.findOne(query);
        //     res.send(blog);
        // })

        // // get reviews
        // app.get('/reviews', async(req, res) => {
        //     const reviews = await reviewsCollection.find().toArray();
        //     res.send(reviews);
        // })

        // // post reviews
        // app.post('/review', verifyToken, async(req, res) => {
        //     const review = req.body;
        //     const result = await reviewsCollection.insertOne(review);
        //     res.send(result)
        // })

        // // get reviews by email
        // app.get('/reviews/:email', async(req, res) => {
        //     const email = req.params.email; 
        //     const query = {email: email}
        //     const reviews = await reviewsCollection.find(query).toArray();
        //     res.send(reviews);
        // })

        // // delete review
        // app.delete('/review/:id', verifyToken, async(req, res) => {
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)};
        //     const result = await reviewsCollection.deleteOne(query);
        //     res.send(result);
        // })


        // // get payment intent
        // app.post('/create-payment-intent', verifyToken, async(req, res) => {
        //     const {orderValue} = req.body;
        //     const amount = orderValue * 100;
        //     const paymentIntent = await stripe.paymentIntents.create({
        //         amount: amount,
        //         currency: 'usd',
        //         payment_method_types: ['card']

        //     });
        //     res.send({clientSecret: paymentIntent.client_secret})
        // })

    } finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Running PC Hub BD Server");
});

app.all("*", (req, res) => {
    res.send("No Routes Found");
})

app.listen(port, () => {
    console.log("Listen to Port", port);
})
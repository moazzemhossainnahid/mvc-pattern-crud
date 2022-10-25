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


// middleware
// app.use(express.text());
app.use(express.json());
app.use(cors());
app.use(express.static("Public"));
app.set("view engine", "ejs");




// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hmmg8.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

dbConnect();

app.use("/api/v1/products", productsRoutes);


app.get('/', (req, res) => {
    // res.send("Running PC Hub BD Server");
    // res.send(__dirname + "./Public/test.html");
    res.render("home.ejs", {
        id: 3,
        user:{
            name:"test"
        }
    })
});

app.all("*", (req, res) => {
    res.send("No Routes Found");
})

app.listen(port, () => {
    console.log("Listen to Port", port);
})
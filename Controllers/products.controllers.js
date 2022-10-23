/*
const getAllProducts = (req, res) => {
    res.send("Tools Found");
};


// For Exports a Function
module.exports = {
    getAllProducts,
}


*/

module.exports.getAllProducts = (req, res, next) => {
    const { ip, query, params, body, headers } = req;
    console.log(ip, query, params, body, headers);
    // res.send("Got It");
    // res.download(__dirname + "/products.controllers.js");
    // res.json({"Name" : "ABC"});
    res.redirect("/signin");
};


// Another way to Export Function
module.exports.SaveAProducts = (req, res) => {
    res.send("Product Added");
};

module.exports.getProductDetails = async (req, res, next) => {
    res.send("Get Tools Details");
}
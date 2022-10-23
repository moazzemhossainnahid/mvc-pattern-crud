const products = [
    {id: 1, name: "Nahid"},
    {id: 2, name: "Ashiq"},
    {id: 3, name: "Jahid"},
]

module.exports.getAllProducts = (req, res, next) => {
    const {limit, page} = req.query;
    console.log(limit, page);
res.json(products);
};

// Another way to Export Function
module.exports.SaveAProducts = (req, res) => {
    res.send("Product Added");
};

module.exports.getProductDetails = async (req, res, next) => {
    res.send("Get Tools Details");
}
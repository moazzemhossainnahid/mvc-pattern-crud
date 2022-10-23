let count = 0;
const ViewCount = (req, res, next) => {
    count++;
    console.log(count);
    res.send("Tools Found");
};

module.exports = ViewCount;
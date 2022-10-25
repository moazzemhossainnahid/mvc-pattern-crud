const express = require('express');
// const { getAllProducts, SaveAProducts } = require('../../Controllers/products.controllers');
const ToolsController = require('../../Controllers/products.controllers');
const limiter = require('../../Middleware/limiter');
const ViewCount = require('../../Middleware/ViewCount');

const router = express.Router();


// router.get("/", (req, res) => {
//     res.send("Tools Found");
// })


// router.get("/:id", (req, res) => {
//     res.send("Tools Found by ID");
// })


// router.post("/products", (req, res) => {
//     res.send("Tool Added");
// })


// altarnative

/**
router.route("/").get((req, res) => {
    res.send("Tools Found");
}).post((req, res) => {
    res.send("Tool Added");
})
*/

router.route("/")
    /**
     * @api {get} /tools All tools
     * @apiDescription Get all the tools
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiParam  {Number{1-}}         [page=1]     List page
     * @apiParam  {Number{1-100}}      [limit=10]  Users per page
     *
     * @apiSuccess {Object[]} all the tools.
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
     * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
     */

    .get(ToolsController.getAllProducts)
    /**
     * @api {post} /tools save a tool
     * @apiDescription Get all the tools
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiParam  {Number{1-}}         [page=1]     List page
     * @apiParam  {Number{1-100}}      [limit=10]  Users per page
     *
     * @apiSuccess {Object[]} all the tools.
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
     * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
     */

    .post(ToolsController.SaveAProducts)

router
.route("/:id")
.get( ToolsController.getProductDetails)
.patch(ToolsController.UpdateTool)
.delete(ToolsController.DeleteTool)


module.exports = router;
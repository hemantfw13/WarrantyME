const express = require('express');
const router = express.Router();
const apicache = require("apicache");
let cache = apicache.middleware;

const News = require("../models/news.model");

router.post("", async (req, res) => {
    try {
        const news = await News.create(req.body);
        return res.status(201).send(news)
    } catch (err) {
        return res.status(500).send(err.message)
    }

})

router.get("", cache("5 minutes"),async (req, res) => {
    const page= req.query.page || 1
    const size = req.query.size || 5
    try {
        const news = await News.find().skip((page - 1)*size).limit(size).lean().exec()
        return res.send(news)

    } catch (err) {
        return res.status(500).send(err.message);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const news = await News.find({"$or":[{"title":{$regex:req.params.id}},{"author":{$regex:req.params.id}}]}).lean().exec();
        return res.send(news);
    } catch (err) {
        return res.status(500).send(err.message)
    }
})
module.exports = router;
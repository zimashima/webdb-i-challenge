const express = require("express")

const db = require("../data/dbConfig")

const router = express.Router()

router.get("/", async (req,res,next) => {
    try {
        res.status(200).json(await db('accounts').select())
    } 
    catch (err){
        next(err)
    }
})

router.get("/:id", async (req,res,next) => {
    try {
        const account = await db('accounts').where( "id", req.params.id).first()
        res.status(200).json(account)
    } 
    catch (err){
        next(err)
    }
})


router.post("/", async (req,res,next) => {
    try{
        const [id] = await db('accounts').insert({ name: req.body.name, budget: req.body.budget })
        res.status(200).json(await db("accounts").where("id", id).first())
    }
    catch (err){
        next(err)
    }
})

router.delete("/:id", async (req,res,next) => {
    try{
        await db('accounts').where("id", req.params.id).del()
        res.status(204).end()
    }
    catch (err){
        next(err)
    }
})

router.put("/:id", async (req,res,next) => {
    try{
        await db('accounts').where("id", req.params.id).update({ name: req.body.name, budget: req.body.budget })
        res.status(200).json(await db("accounts").where("id", req.params.id).first())
    }
    catch (err){
        next(err)
    }
})

module.exports = router
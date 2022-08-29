const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const urlModel = require('./db')
const app = express();

app.use(express.json());
app.use(express.static('public'))
app.set('view engine', "ejs")

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {

    const url = urlModel.find(function(error,results){
        res.render('home',{
            urlResults:results
        })
    

    })

})

app.get('/:urlId',function(req,res){
    urlModel.findOne({sortUrl:req.params.urlId},function(err,data){
        if(err) throw err;
        urlModel.findByIdAndUpdate({_id:data.id},{$inc:{ClickCount:1}},function(err,data){
            if(err) throw err;
            res.redirect(data.LongUrl)

        })
    })
})

app.get('/delete/:id',function(req,res){
    urlModel.findByIdAndDelete({_id:req.params.id},function(err,data){
        if(err) throw err;
        res.redirect('/')
    })
})
app.post('/create',async (req, res) => {
    try {
        // console.log(GenerateUrl())
        let url = new urlModel({
            LongUrl: req.body.longurl,
            sortUrl: GenerateUrl()
        })
        const saveUrl = await url.save()
        console.log(url)
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

mongoose.connect("mongodb+srv://banu:banu1999@cluster0.rr0ch8p.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log("db connected")
})
app.listen(3000, () => {
    console.log("server is running")
})

function GenerateUrl(params) {
    var rndResult = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz12346789";
    var length = characters.length
    for (var i = 0; i < 5; i++) {
        rndResult += characters.charAt(
            Math.floor(Math.random() * length)
        )
    }
    return rndResult;
}




























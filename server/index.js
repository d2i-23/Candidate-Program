const express = require("express")
const jsonLoad = require("./getJson")
const jsonWrite = require("./updateJson")
var bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

app.get("/candidates", (req, res) => {

    jsonFile = jsonLoad()

    res.json(jsonFile.candidates);
})


app.get("/questions", (req, res) => {

    jsonFile = jsonLoad()

    res.json(jsonFile.questions)
})

app.get("/applications", (req, res) => {

    jsonFile = jsonLoad()

    res.json(jsonFile.applications)
})


//Get the post dta then apply the change 
app.post("/comment", (req, res) => {

    const postData = req.body

    console.log(req.body)

    jsonWrite(postData.personId, postData.questionId, postData.newComment)

    res.send("Success")

})


app.listen(5000, () => {console.log("listening at 5000")});
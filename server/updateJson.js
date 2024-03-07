const jsonLoad = require("./getJson")
const fs = require("fs")

const filePath = "./db.json";

//function that reads the jsonFile, saves it to a var, applies the comment change to the appropriate section, 
//then rewrites the file to save it .
function writeJson(personId, questionId, newComment){

    //get current json file 
    currentJson = jsonLoad()

    //find appropriate comment 
    index = currentJson["applications"].findIndex(items => items["id"] == personId)
    questionIndex = currentJson["applications"][index]["videos"].findIndex(items => items["questionId"] == questionId )
    
    //change it 
    currentJson["applications"][index]["videos"][questionIndex].comments = newComment

    currentJson = JSON.stringify(currentJson, null, 2) 

    //write the file 
    fs.writeFile(filePath, currentJson, (err) => {
        if (err) {
          console.error('Error writing JSON file:', err);
        } else {
          console.log('Data has been written to', filePath);
        }
      })
}

module.exports = writeJson
const fs = require("fs");

const filePath = "./db.json";

var jsonData;
// Reading the JSON file

//I export a function instead of what the file has read so everytime it is called, the user will get the most 
//updated information 


//Function that reads the databse 
function readJson(){
  try {
    jsonData = fs.readFileSync(filePath, 'utf8')
  }
  
  catch (err){
      console.log(err);
  }

  return JSON.parse(jsonData)
}

module.exports = readJson; 







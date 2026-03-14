const mongoose = require("mongoose");

const db_url = process.env.DB_URL
const db_name = process.env.DB_NAME

console.log(db_url+db_name)

async function db_con(){
  try{
    await mongoose.connect(db_url+db_name)
    console.log("database connect success!")
  }catch(error){
    console.log(error)
    console.log('database connection faild the error message is: '+error.message)
  }
}


db_con()
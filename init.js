const mongoose = require("mongoose");
const Chat = require("./models/chat")

main().then(()=>console.log("connection sucessful!"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

let allChats = [
  {
    from: "neha",
    to: "priya",
    msg: "hello kaisi hain.",
    created_at: new Date()
  },
  {
    from: "priya",
    to: "neha",
    msg: "main theek hoon, tum sunao?",
    created_at: new Date()
  },
  {
    from: "rahul",
    to: "amit",
    msg: "kal ka match dekha?",
    created_at: new Date()
  },
  {
    from: "amit",
    to: "rahul",
    msg: "haan bhai, bahut zabardast tha!",
    created_at: new Date()
  },
  {
    from: "anita",
    to: "sunita",
    msg: "tu office kab aa rahi hai?",
    created_at: new Date()
  },
  {
    from: "sunita",
    to: "anita",
    msg: "main Monday ko aaungi.",
    created_at: new Date()
  },
  {
    from: "vikas",
    to: "neha",
    msg: "project ka update mila?",
    created_at: new Date()
  },
  {
    from: "neha",
    to: "vikas",
    msg: "haan, client ne feedback diya hai.",
    created_at: new Date()
  },
  {
    from: "priya",
    to: "rahul",
    msg: "party kab rakh rahe ho?",
    created_at: new Date()
  },
  {
    from: "rahul",
    to: "priya",
    msg: "isi weekend plan karte hain!",
    created_at: new Date()
  }
];

Chat.insertMany(allChats)
    .then(()=>{
    console.log("Database Initialised, chats inserted successfully.")
    })
    .catch(err => console.error("Error inserting chats:", err));
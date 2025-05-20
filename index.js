const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => console.log("connection sucessful!"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  console.log(chats);
  res.render("chats.ejs", { chats });
});

let chat1 = new Chat({
  from: "neha",
  to: "priya",
  msg: "hello kaisi hain.",
  created_at: new Date(),
});
chat1.save();

//New Route
app.get("/chats/new", (req, res) => {
  console.log("new route working!");
  res.render("createChat.ejs");
});

//Create Route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then(() => console.log("Chat saved!"))
    .catch((err) => console.log("Chat not saved. Error Occured!"));
  res.redirect("/chats");
});

//EDIT Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg },
    {
      runValidators: true,
      new: true,
    }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});
//Delete route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  await Chat.findByIdAndDelete(id);
  console.log(`Deleted chat with ID: ${id}`);
  res.redirect("/chats");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("Listening on port 8080");
});

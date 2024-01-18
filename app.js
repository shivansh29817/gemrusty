const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/generate", async function (req, res) {
  const { userInput } = req.body;

  try {
    const genAI = new GoogleGenerativeAI('AIzaSyCIgcXZQwNM6V1BUSWZl2OYa_6LG-tp9oY');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(userInput);
    const response = await result.response;
    const text = response.text();

    

    res.send({ response: text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Succesfuly Server is ready");
});

app.get("/api/jokes", (req, res) => {
  const jokes = [
    { id: 1, title: "A joke", content: "Why don't scientists trust atoms?Because they make up everything!" },
    { id: 2, title: "Another joke", content: "What did one wall say to the other wall?I'll meet you at the corner." },
    { id: 3, title: "A third joke", content: "Why did the scarecrow win an award?Because he was outstanding in his field!" },
    { id: 4, title: "A fourth joke", content: "How do you organize a space party?You planet!" },
    { id: 5, title: "A fifth joke", content: "Why did the bicycle fall over?Because it was two-tired!" },
    { id: 6, title: "A sixth joke", content: "Why did the bicycle stops?Because it need Petrol!" },
    { id: 7, title: "A seventh joke", content: "Dummy Jokes" },
    { id: 8, title: "A eighth joke", content: "Dummy Jokes" },
  ];

  res.send(jokes)
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});

const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // index.html ishlashi uchun

// JSON-dan o‘qish
app.get("/api/movies", (req, res) => {
    const data = JSON.parse(fs.readFileSync("movies.json"));
    res.json(data);
});

// JSON-ga yozish
app.post("/api/add", (req, res) => {
    const db = JSON.parse(fs.readFileSync("movies.json"));
    db.push(req.body);
    fs.writeFileSync("movies.json", JSON.stringify(db, null, 2));
    res.json({ status: "ok" });
});

// DELETE qilish
app.post("/api/delete", (req, res) => {
    let db = JSON.parse(fs.readFileSync("movies.json"));
    db = db.filter(m => m.id !== req.body.id);
    fs.writeFileSync("movies.json", JSON.stringify(db, null, 2));
    res.json({ status: "deleted" });
});

app.listen(3000, () => console.log("Server: http://localhost:3000"));

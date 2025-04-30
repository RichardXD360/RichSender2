import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Conectado");
});

app.listen(4400, "127.0.0.1", () => {
    console.log("App conectado com o IP 127.0.0.1:4400")
});
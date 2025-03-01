import express from 'express';
import os from "os"; 
import cors from 'cors';
import { router } from "./routes/index.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || "3000";
const HOSTNAME = os.hostname();  

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Request from ${req.url} ${req.hostname}`);
    next();
});

app.use('/api/v1', router);

// Corrected app.listen syntax
app.listen(PORT, () => {
    console.log(`Listening on ${HOSTNAME} at port ${PORT}`);
});

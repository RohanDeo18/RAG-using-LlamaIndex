// file: src/index.ts

import "dotenv/config";
import express, { Express, Request, Response } from "express";
import path from "path";
import multer, { Multer } from "multer";

const app: Express = express();
const port = 3000;

app.use(express.json());

// set up EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// set up multer for file uploads
const storage = multer.memoryStorage();
const upload: Multer = multer({ storage }); 


// Handle file upload
app.post(
    "/upload",
    upload.single("document"),
    async (req: Request, res: Response) => {
        if (!req.file) return;

        try {
            // Access the file content from req.file.buffer
            const content: string = req.file.buffer.toString();
            console.log(content);

            // Send a response to the client
            res.status(200).json({ message: "Document uploaded successfully." });
        } catch (error) {
            res.status(500).json({ message: "Error uploading document." });
        }
    }
);
import * as express from 'express';
import * as cors from "cors";
import * as database from "./services/database"
import * as multer from "multer"

const app = express();

app.use(cors());

app.use(express.static("./packages/server/public"));
app.use(express.static("./user_content"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is active");
});

app.get("/database", (req, res) => {
  res.send(database.get());
});

app.put("/database", (req, res) => {
  res.send("Received PUT request in /database");
  // temporarily disabled to avoid adding constantly to database during tests
  // database.set(req.body);
});

app.post("/user_content/images", (req, res) => {
  res.send("Received POST request in /user_content/images")
  console.log(req)
  database.postImage(req)
})


const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

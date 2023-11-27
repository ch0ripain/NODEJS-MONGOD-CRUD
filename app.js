import express from "express";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";
import router from "./Routes/Customer.route.js";
import connectToDatabase from './db.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//intialize DB
connectToDatabase();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// Monta el enrutador en la ruta raíz
app.use('/', router);

// routes
app.use('/customers', router);

// static files
app.use(express.static(path.join(__dirname, "public")));

// starting the server
export default app;

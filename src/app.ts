import express from 'express';
const app = express();
const port = 3000;
import bodyParser from "body-parser";
import cors from "cors";
import morgan from './config/loggger';


app.use(express.json()); // Middleware to parse JSON bodies

// Use morgan middleware for logging requests
app.use(morgan(':time :method :url :status :response-time ms - :res[content-length] - :req-body'));

app.use(cors());
http: app.options("*", cors());

// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));

app.use('/api/v1', require('./api'))

export const startApp = (port: number) => app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

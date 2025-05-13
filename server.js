const express = require("express");
const mongoose = require("mongoose");
const apiRouter = require("./src/routes/index");
const cors = require("cors"); 

// const morgan = require("morgan");
// const rateLimit = require("express-rate-limit");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
// app.use(morgan('combined'));
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));

mongoose.connect("mongodb://localhost:27017/inventoryapp", { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

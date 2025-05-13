const express = require("express");
const mongoose = require("mongoose");
const apiRouter = require("./src/routes/index");
const morgan = require("morgan");
const cors = require("cors"); 

// const rateLimit = require("express-rate-limit");

const app = express();
const port = 3000;

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});


// Middleware
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));


// MongoDB Atlas URI
const uri = "mongodb+srv://bbanikarimi:n4eRxYnPszQjo9Gf@cluster-beh.4nka11h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-beh";

// Connect and start server
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Connected to MongoDB Atlas");
  app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

app.use('/api', apiRouter);
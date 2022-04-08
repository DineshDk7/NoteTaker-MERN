const express = require("express");
const app = express();
const dotenv = require("dotenv");
const usersRouter = require("./routers/users");
const tasksRouter = require("./routers/tasks");
const path = require('path');
const mongoose = require("mongoose");
var cors = require('cors')


dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology : true,
      // useCreateIndex : true,
    })
    .then(()=>{
      console.log("Connected to DB")
    })

app.use(express.urlencoded({ extended: false }));
app.use(cors())

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/notes", tasksRouter);

// -------------------------------Deployment---------------------------------
const _dirname = path.resolve()
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(_dirname, '/frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html'))
  })
}else{
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});
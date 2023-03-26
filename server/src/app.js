const express = require("express");
const PORT = process.env.PORT || 3001;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors()); 

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(morgan("dev"));

const userRoutes = require("./services/auth/userRoutes");
app.use("/user", userRoutes);

const itemRoutes = require("./services/items/itemsRoutes");
app.use("/item", itemRoutes);

app.get("/", (req, res) => {
  console.log("Server is alive.");
});

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});

require("./config/db")(app);

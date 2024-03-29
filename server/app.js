let express = require("express"), 
    cors = require("cors"), 
    mongoose = require("mongoose"), 
    database = require("./database"), 
    bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected");
}, error => {
    console.log("can not connect to database" + error);
});

const postApi = require("../server/routes/post.route");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// API
app.use("/api", postApi);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log("Connected to port", + port);
});

app.use(function(err, req, res, next) {
    console.error(err.message);
    if(!err.statusCode) {
        err.statusCode == 500;
    }
    res.status(err.statusCode).send(err.message);
});
const mongoose = require("mongoose");
module.exports = function (app) {
    mongoose.set('strictQuery', true);
    mongoose.connect("mongodb://localhost:27017/angular-auth", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(connrction => console.log("Application is connected to db")).catch(err => console.log(err))
    mongoose.Promise = global.Promise;
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);
    if (app) {
        app.set("mongoose", mongoose);
    }
};
function cleanup() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
}

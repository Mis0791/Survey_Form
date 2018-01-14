var express = require("express");
var app = express();
var port = 8000;
var bp = require("body-parser");
var path = require("path");
var session = require("express-session");

app.use(bp.urlencoded());
app.use(express.static(path.join(__dirname,'/client')));
app.use(session({secret:"cat"}));
app.set("views", path.join(__dirname, "/views"));
app.set("view.engine", "ejs");

app.get("/", function(req, res){
    res.render("survey.ejs")
});
app.get("/result", function(req, res){

    var context = {
        "name" : req.session.name,
        "location" : req.session.location,
        "language" : req.session.language,
        "comment" : req.session.comment,
    }

    res.render("result.ejs", context)
});
app.post("/result", function(req, res){

    req.session.name = req.body.name,
    req.session.location = req.body.location,
    req.session.language = req.body.language,
    req.session.comment = req.body.comment

    res.redirect("/result")
});

app.listen(port,function(){
    console.log("listening");
})

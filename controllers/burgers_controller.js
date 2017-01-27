
// Requiring our models
var db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.redirect("/burgers");
    });

    app.get("/burgers", function(req, res) {
        db.burgers.findAll({}).then(function(data) {
            var hbsObject = {
                burgers: data
            };
            console.log(hbsObject);
            res.render("index", hbsObject);
        });
    });

    app.post("/burgers/add", function(req, res) {
        db.burgers.create({
            burger_name: req.body.burger_name
        }).then(function() {
            res.redirect("/burgers");
        });
    });

    app.put("/burgers/update/:id", function(req, res) {
        var condition = "id = " + req.params.id;

        console.log("condition", condition);
        db.burgers.update({
            devoured: req.body.devoured
        }, {
            where: {
                id: condition
            }
        }).then(function() {
            res.redirect("/burgers");
        });
    });
};
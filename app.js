// Create express app
const express = require("express");
const app = express();
const db = require("./database.js");
const md5 = require("md5");
const cors = require('cors');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Server port
const HTTP_PORT = 8000;
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/api/universe", (req, res, next) => {
    const sql = "SELECT * FROM mapUniverse";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    })
});

app.get("/api/universe/:id", (req, res, next) => {
    const sql = "SELECT * FROM mapUniverse WHERE universeID = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
             "message":"success",
             "data":row
         })
    })
});

app.get("/api/regions", (req, res, next) => {
    const sql = "SELECT * FROM mapRegions WHERE RegionID < 10000005";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    })
});

app.get("/api/regionsBox", (req, res, next) => {
    const sql = "SELECT xMin as x, xMax-xMin as width, zMin as z, zMax-zMin as height FROM mapRegions WHERE RegionID < 10000005;";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    })
});

app.get("/api/regions/bounds", (req, res, next) => {
    const sql = "SELECT min(x), max(x), min(y), max(y), min(z), max(z) FROM mapRegions";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    })
});

app.get("/api/regions/:id", (req, res, next) => {
    const sql = "SELECT * FROM mapRegions WHERE regionID = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    })
});

app.get("/api/systems", (req, res, next) => {
    const sql = "SELECT * FROM mapSolarSystems WHERE regionID < 11000000";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    })
});

app.get("/api/jumps", (req, res, next) => {
    const sql = "SELECT fromSystem.x as fx, fromSystem.z as fz, toSystem.x as tx, toSystem.z as tz FROM mapSolarSystemJumps INNER JOIN mapSolarSystems as fromSystem ON mapSolarSystemJumps.fromSolarSystemID=fromSystem.solarSystemID inner join mapSolarSystems as toSystem ON mapSolarSystemJumps.toSolarSystemID = toSystem.solarSystemID";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    })
});


// Default response for any other request

app.use(express.static('public'))
app.use(function(req, res){
    res.status(404);
});

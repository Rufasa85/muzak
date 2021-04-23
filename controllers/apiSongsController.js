const express = require('express');
const connection = require("../config/connection")
const router = express.Router();


router.get("/artist/:artist",(req,res)=>{
    connection.query(`SELECT * FROM top5000 WHERE artist = ?`, req.params.artist, (err, data) => {
        if (err) {
            throw err
        } else {
            res.json(data);
        }
    })
})

router.get("/title/:song",(req,res)=>{
    connection.query(`SELECT * FROM top5000 WHERE song = ?`, req.params.song, (err, data) => {
        if (err) {
            throw err
        } else {
            res.json(data);
        }
    })
})

router.get("/yearrange/:start/:end",(req,res)=>{
    connection.query(`SELECT * FROM top5000 WHERE year BETWEEN ? AND ? ORDER BY year`, [req.params.start, req.params.end], (err, data) => {
        if (err) {
            throw err
        } else {
            res.json(data);
        }
    })
})

router.get("/multihit/:min",(req,res)=>{
    connection.query(`SELECT artist, count(*) AS hits FROM top5000 GROUP BY artist HAVING hits>= ? ORDER BY hits DESC`, req.params.min, (err, data) => {
        if (err) {
            throw err
        } else {
            res.json(data);
        }
    })
})

router.get("/albums/bothcharted/:artist",(req,res)=>{
    connection.query(`
    SELECT top5000.artist,song,album,top5000.year FROM top5000 
    JOIN top_albums
    ON top5000.artist = top_albums.artist
    AND top5000.year = top_albums.year
    WHERE top5000.artist = ?
    ORDER BY year
    `, req.params.artist, (err, data) => {
        if (err) {
            throw err
        } else {
            res.json(data);
        }
    })
})

module.exports = router;
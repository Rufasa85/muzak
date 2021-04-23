const express = require('express');
const connection = require("../config/connection")
const router = express.Router();


router.get("/artist/:artist",(req,res)=>{
    connection.query(`SELECT * FROM top_albums WHERE artist = ?`, req.params.artist, (err, data) => {
        if (err) {
            throw err
        } else {
            res.json(data);
        }
    })
})

router.get("/title/:album",(req,res)=>{
    connection.query(`SELECT * FROM top_albums WHERE album = ?`, req.params.album, (err, data) => {
        if (err) {
            throw err
        } else {
            res.json(data);
        }
    })
})

router.get("/yearrange/:start/:end",(req,res)=>{
    connection.query(`SELECT * FROM top_albums WHERE year BETWEEN ? AND ? ORDER BY year`, [req.params.start, req.params.end], (err, data) => {
        if (err) {
            throw err
        } else {
            res.json(data);
        }
    })
})

router.get("/multihit/:min",(req,res)=>{
    connection.query(`SELECT artist, count(*) AS hits FROM top_albums GROUP BY artist HAVING hits>= ? ORDER BY hits DESC`, req.params.min, (err, data) => {
        if (err) {
            throw err
        } else {
            res.json(data);
        }
    })
})


module.exports = router;
 
// src/routes/url.js
const express = require('express');
const router = express.Router();

const dbs = require('../db');
let db;
(async () => {
    try {
        // Wait for the database connection to be ready before proceeding
        db = await dbs.dbReadyPromise;
    } catch (err) {
        console.error('Error in server.js:', err);
    }
})();

const validUrl = require('valid-url');
const { generateShortCode } = require('../utils/shortener');

// Create a new short URL
router.post('/shorten', async (req, res) => {
    const { target_url } = req.body;

    if (!validUrl.isUri(target_url)) {
        return res.status(401).json('Invalid URL');
    }

    const short_code = generateShortCode();
    const title = new URL(target_url).hostname;

    await db.query('INSERT INTO urls (target_url, short_code, title) VALUES (?, ?, ?)', 
        [target_url, short_code, title]); 

    res.status(201).json({ short_url: `${req.protocol}://${req.get('host')}/c/${short_code}`, target_url, title });


});


const axios = require('axios');
async function getGeolocation(ip) {
    try {
        const response = await axios.get(`https://ipinfo.io/${ip}/json?token=${process.env.IP_TOKEN}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching geolocation:', error);
        return null;
    }
}

// Redirect to the target URL
router.get('/:c', async (req, res) => {
    const code = req.params.c;

    const [result, fields] = await db.query('SELECT target_url FROM urls WHERE short_code = ?', [code]);
    
        const target_url = result[0].target_url;

        const ip = req.ip;

                // Fetch geolocation data based on the IP address
                const geoData = await getGeolocation(ip);

                // Insert visit details into the database
                db.query(
                    `INSERT INTO url_visits (short_code, ip_address, city, region, country) VALUES (?, ?, ?,?,?)`,
                    [code, ip,geoData.city,geoData.region,geoData.country]
                );
        
                
    
        res.redirect(target_url);
    });

    

module.exports = router;

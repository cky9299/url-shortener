require('dotenv').config()

const path = require("path"); 
// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const urlRoutes = require('./routes/url');



const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get("/public/twcss.js", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/twcss.js"));
})


app.use('/api', urlRoutes);

app.use('/c', urlRoutes);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/index.html"));
})


app.get("/rpt", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/rptAuth.html"));
})



let docHead = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report</title>
    <script src="public/twcss.js"></script>
    <style>
        body {
            padding: 10px;
            font-size: 200%;
            text-align: center;
            background-color: #f7fafc; /* Tailwind's 'bg-gray-100' equivalent */
    color: #1a202c; /* Tailwind's 'text-gray-900' equivalent */
    font-family: sans-serif; /* Tailwind's 'font-sans' equivalent */
        }

        .custom-table {
            min-width: 100%;
            background-color: white;
            border: 1px solid #E5E7EB;
            
            border-collapse: separate;
            
            border-spacing: 5000px 0;
            
        }

        .custom-table thead {
            background-color: #E5E7EB;
            
            color: #4B5563;
            
        }

        .custom-table th,
        .custom-table td {
            padding: 0.5rem 1rem;
            
            text-align: left;
            
        }

        .custom-table tbody tr {
            border-top: 1px solid #E5E7EB;
            
        }

        table th,
        td {
            padding: 5px 30px;
        }


        @keyframes moveHue {
            100% {
                background-position: -100% 0;
            }

            0% {
                background-position: 100% 0;
            }
        }

        .animate-hue {
            background: linear-gradient(90deg, rgba(173, 216, 230, 0.5), rgba(135, 206, 250, 0.5));
            background-size: 200% 100%;
            animation: moveHue 3s linear infinite;
        }

        a {
            color: aqua !important;
        }
    </style>
</head>

<body>
    <h1 class="text-4xl font-semibold text-gray-700">Generated Report</h1>
`;

let doc = docHead;

let tableHead = `   <table>
<thead>
    <tr>
        <th>click timestamp</th>
        <th>ip address</th>
        <th>City</th>
        <th>Region</th>
        <th>Country</th>
    </tr>
</thead>

<tbody>
    `

let tableEnd = `</tbody>
</table>`;

let docEnd = `</body>
</html>`;


const dbs = require('./db');
let db;
(async () => {
    try {
        // Wait for the database connection to be ready before proceeding
        db = await dbs.dbReadyPromise;
    } catch (err) {
        console.error('Error in server.js:', err);
    }
})();


app.post('/authpw', async (req, res) => {
    const pw = req.body.target_url;
  if (pw == process.env.USAGE_RPT_PW)
    {

        
    db.query(
        `INSERT INTO clicks (short_code, clicks)
        SELECT short_code, COUNT(*) AS clicks
        FROM url_visits
        GROUP BY short_code
        ON DUPLICATE KEY UPDATE clicks = VALUES(clicks);
        `
    );  



    const [result, fields] = await db.query(`select short_code from clicks
order by short_code;`);

    let urlShort = result;
    for (i=0; i<urlShort.length; i++)
        {
            doc += `<h3 style='padding-top:100px;'>short_code: ${urlShort[i].short_code}</h3>`;

            const [urlShortCode, fields] = await db.query(`
            select clicks from clicks 
            where short_code = '${urlShort[i].short_code}'
            order by short_code;`);
            
                doc += `<h3 style='padding-bottom:10px;'>clicks: ${urlShortCode[0].clicks}</h3>`;


                const [clicks, fields1] = await db.query(`select click_timestamp,ip_address,city,region,country 
            from url_visits
            where short_code = '${urlShort[i].short_code}'
            order by short_code;`);
            
            doc += tableHead;
            for (j=0;j<clicks.length;j++)
                {
                let tableRows = `<tr>
                    <td>${clicks[j].click_timestamp}</td>
                    <td>${clicks[j].ip_address}</td>
                    <td>${clicks[j].city}</td>
                    <td>${clicks[j].region}</td>
                    <td>${clicks[j].country}</td>
                </tr>`
                doc += tableRows;
                }

               doc += tableEnd;
    }

  doc += docEnd;

    if (doc) {        
        res.setHeader('Content-Type', 'text/html');

        res.send(doc); // Send the HTML content stored in the variable
        doc = docHead;
        
    } else {
        res.send('HTML content not available.');
    }
    

    }
    else
    {
        res.json('Invalid password'); 
    }
  
});







app.listen(process.env.PORT, '::', () => {
    console.log(`Server is publoic running on http://localhost:${process.env.PORT}`);
});
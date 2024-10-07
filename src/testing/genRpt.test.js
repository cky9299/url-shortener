describe('generate report', () => {
    test('generate report', async () => {

        r='';
        th = `   <table>
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

te = `</tbody>
</table>`;

 
    us = [{short_code: 'G3FXLG'}, {short_code: 'jR7YHC'}];//3,2
    usc = [{clicks: 3},{clicks: 2}];
    c = [[{click_timestamp: 'Thu Oct 03 2024 11:33:21 GMT+0800 (Malaysia Time)', ip_address: '::1', city: 'null' , region: 'null', country: 'null'}, {click_timestamp: 'Thu Oct 03 2024 11:34:00 GMT+0800 (Malaysia Time)', ip_address: '::1', city: 'null' , region: 'null', country: 'null'}, {click_timestamp: 'Thu Oct 03 2024 11:34:06 GMT+0800 (Malaysia Time)', ip_address: '::1', city: 'null' , region: 'null', country: 'null'}], [{click_timestamp: 'Thu Oct 03 2024 17:36:28 GMT+0800 (Malaysia Time)', ip_address: '::1', city: 'null' , region: 'null', country: 'null'},{click_timestamp: 'Thu Oct 03 2024 17:36:40 GMT+0800 (Malaysia Time)', ip_address: '::1', city: 'null' , region: 'null', country: 'null'}]]; 
    

    for (i=0; i<us.length; i++)
        {
            r += `<h3>short_code: ${us[i].short_code}</h3>`;
            
                r += `<h3>clicks: ${usc[i].clicks}</h3>`;

        
            
            r += th;
            for (j=0;j<c[i].length;j++)
                {
                tr = `<tr>
                    <td>${c[i][j].click_timestamp}</td>
                    <td>${c[i][j].ip_address}</td>
                    <td>${c[i][j].city}</td>
                    <td>${c[i][j].region}</td>
                    <td>${c[i][j].country}</td>
                </tr>`
                r += tr;
                }

               r += te;
    }

let a = `<h3>short_code: G3FXLG</h3><h3>clicks: 3</h3>   <table>
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
    <tr>
                    <td>Thu Oct 03 2024 11:33:21 GMT+0800 (Malaysia Time)</td>
                    <td>::1</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                </tr><tr>
                    <td>Thu Oct 03 2024 11:34:00 GMT+0800 (Malaysia Time)</td>
                    <td>::1</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                </tr><tr>
                    <td>Thu Oct 03 2024 11:34:06 GMT+0800 (Malaysia Time)</td>
                    <td>::1</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                </tr></tbody>
</table><h3>short_code: jR7YHC</h3><h3>clicks: 2</h3>   <table>
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
    <tr>
                    <td>Thu Oct 03 2024 17:36:28 GMT+0800 (Malaysia Time)</td>
                    <td>::1</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                </tr><tr>
                    <td>Thu Oct 03 2024 17:36:40 GMT+0800 (Malaysia Time)</td>
                    <td>::1</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                </tr></tbody>
</table>`;

  expect(r).toBe(a);
  
  rh = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
    </style>
</head>

<body>
    <h1>Generated Report</h1>
`;

    if (r) {        

        r = rh;
        expect(r).toBe(rh);
        
    } 

});


});



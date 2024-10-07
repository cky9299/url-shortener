# Documentation

## Limitations
1. The `Usage Report` may be viewed by unauthorized personnel
2. If a html template is sent to the frontend from a url endpoint on http get, the frontend has to send additional fetches to the server to retrieve the data, incurring additional network overhead, and resulting in slower response times. In addition, the url is prone to being shared to unauthorized personnel.
3. The actual data encountered during deployment is unknown as they may differ in terms of format and number of rows, rendering it impossible to validate the acutal data.
4. No free dynamic web hosting services for nodejs + mysql are available.
5. The visibility of a GitLab repo in a free account may not be set to public 

## Workarounds
1. Set and share the password with authorized personnel only
2. After a client has provided a valid password, the report is fully generated server-side and returned to the frontend in a single http response.
3. The data is mocked to mimic data that will likely be encountered in order to ensure that the test cases may be run independently.
4. Host the website with my own hardware and networking setup.
5. Commit the code to GitHub, a similar version control service

# installation guide
## download files
1. download mysql at https://dev.mysql.com/downloads/
2. download project files
3. cd to the root folder of project files
4. enter this in the terminal:
```
mysql -u root -p < schema.sql
```
5.
```
npm install
```

## configure environment variables        
1. config your env var in the .envTemplate file
2. rename .envTemplate to .env

## run the server        
1. cd ./src/app.js
2.
```
node app.js
```
3. open a browser and head to http://localhost:${process.env.PORT}

## perform automated unit and integration tests
1. open another terminal
2. cd ./src/testing
3.
```
npm test
```

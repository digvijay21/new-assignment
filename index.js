const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {
    jsonUpload,
    convertCsvToJSONController,
    insertDataController,
    getReportsController
} = require('./controller/csvToJsonController');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const path = require('path');
const dbConnection = require('./db/db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

dbConnection.authenticate().then(() => {
    console.log(`Connected to ${dbConnection.options.host} ${dbConnection.config.database}`)
}).catch(err => {
    console.log(
        `Error occurred while connecting to DB : ${err.message}`
    );
});

app.get('/api/csvToJson', convertCsvToJSONController);
app.post('/api/uploadJson', jsonUpload, insertDataController);
app.get('/api/getReport', getReportsController);

app.listen(PORT, () => {
    console.log(`App listening at ${PORT}`);
});
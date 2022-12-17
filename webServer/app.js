const CosmosClient = require('@azure/cosmos').CosmosClient
const config = require('./config')
const TaskList = require('./routes/tasklist')
const TaskDao = require('./models/taskDao')

const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()

// Blobbies
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config()

const accountName = 'soafeedbackpagestorage';
const sasToken = 'sp=r&st=2022-12-17T14:50:53Z&se=2023-02-27T22:50:53Z&sv=2021-06-08&sr=c&sig=28n%2Ba912n9apiuXuGiRIW7VtSAtm%2Blz5xP8GcrTwncI%3D';
if (!accountName) throw Error('Azure Storage accountName not found');
if (!sasToken) throw Error('Azure Storage accountKey not found');

const blobServiceUri = `https://${accountName}.blob.core.windows.net`;

// https://YOUR-RESOURCE-NAME.blob.core.windows.net?YOUR-SAS-TOKEN
const blobServiceClient = new BlobServiceClient(
  `${blobServiceUri}?${sasToken}`,
  null
);
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//App:
const cosmosClient = new CosmosClient({
  endpoint: config.host,
  key: config.authKey
})
const taskDao = new TaskDao(cosmosClient, config.databaseId, config.containerId)
const taskList = new TaskList(taskDao)
taskDao
  .init(err => {
    console.error(err)
  })
  .catch(err => {
    console.error(err)
    console.error(
      'Shutting down because there was an error setting up the database.'
    )
    process.exit(1)
  })

app.get('/', (req, res, next) => taskList.showTasks(req, res).catch(next))
app.post('/addFeedback', (req, res, next) => taskList.addTask(req, res).catch(next))

app.get(
  '/logo', async (req, res) => {
    let i = 1;
const iter = blobServiceClient.findBlobsByTags("tagkey='tagvalue'");
let blobItem = await iter.next();
while (!blobItem.done) {
  console.log(`Blob ${i++}: ${blobItem.value.name}`);
  blobItem = await iter.next();
}
  }
);

app.set('view engine', 'jade')

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send(err)
})

module.exports = app

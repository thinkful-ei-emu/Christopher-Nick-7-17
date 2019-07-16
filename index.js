const express = require('express');
const server = express();
const morgan = require('morgan');
const apps = require('./google-play');
server.use(morgan('dev'));

function titlize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

server.get('/apps', (req, res) => {
  const {sort} = req.query;
  console.log(sort);
  

  let filteredApps = [...apps];
  if (req.query.hasOwnProperty('sort') && ((sort !== 'rating') || (sort !== 'app' ))){
    return res.status(400).json({error: "Sort must be 'rating' or 'app'"})
  }
  if (sort){
    let convertedSort = titlize(sort);
    filteredApps.sort((a , b) => a[convertedSort] > b[convertedSort] ? 1 : -1);
  }
  res.json(filteredApps);

});

server.listen(8080, () => console.log('Server on 8080 is running'))

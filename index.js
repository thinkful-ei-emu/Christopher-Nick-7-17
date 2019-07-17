const express = require('express');
const server = express();
const morgan = require('morgan');
const apps = require('./google-play');
server.use(morgan('dev'));

function titlize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

server.get('/apps', (req, res) => {
  const {sort, genres} = req.query;
  
  console.log('genres log', genres);
  

  let filteredApps = [...apps];
  //right now condition is if object has property sort and sort does not equal rating or app
  if (req.query.hasOwnProperty('sort') && ((sort !== 'rating' ) && (sort !== 'app' ))){
    return res.status(400).json({error: "Sort must be 'rating' or 'app'"})
  }
  if (sort){
    let convertedSort = titlize(sort);
    filteredApps.sort((a , b) => a[convertedSort] > b[convertedSort] ? 1 : -1);
  }
  if (req.query.hasOwnProperty('genres') && ((genres !== 'action' ) && (genres !== 'puzzle' ) && (genres !== 'strategy' ) && (genres !== 'casual' ) && (genres !== 'arcade') && (genres !== 'card'))){
    return res.status(400).json({error: "Please enter valid genres, ex: action"})
  }

  if(genres){
    let convertedGenres = titlize(genres)
    filteredApps= filteredApps.filter(app => app['Genres'] === convertedGenres)
    console.log(filteredApps)
    
    
  }




  res.json(filteredApps);

});

module.exports = server;

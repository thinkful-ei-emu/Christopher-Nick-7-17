const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

function sort(list) {
  const newList = list.map(item => typeof item === 'number' ? item : 0);
  for(let i = 1; i < newList.length; i++){
    let j = i;
    while(j > 0 && newList[j - 1] > newList[j]){
      let temp = newList[j];
      newList[j] = newList[j - 1];
      newList[j - 1] = temp;
      j--;
    }
  }
  return newList;
}

module.exports = sort;
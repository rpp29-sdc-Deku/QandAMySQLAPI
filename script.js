import http from "k6/http";
//import {randomNumber} from "./randomNumber.js";
const randomNumber = require('./randomNumber.js')


const numtest = randomNumber();
console.log(numtest);

export default function () {
    var params = {
        headers: {
          'Content-Type': 'application/json',
          'product_id': randomNumber()
        },
      };
    let response = http.get("http://localhost:3030/qa/questions", params);
}
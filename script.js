import http from "k6/http";
import {randomNumber} from "./randomNumber.js";

// export default function() {
//     let response = http.get("http://localhost:3030/qa/questions");
// };

export default function () {
    var params = {
        headers: {
          'Content-Type': 'application/json'
        //    'product_id': randomNumber()
        },
      };
    let response = http.get("http://localhost:3030/qa/questions", params);
}
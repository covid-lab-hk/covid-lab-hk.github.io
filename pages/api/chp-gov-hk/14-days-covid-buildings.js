import Cors from "cors";

import csv from "csvtojson";
import axios from "axios";
import moment from "moment-timezone";
// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise(async (resolve, reject) => {
    fn(req, res, async (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

function map_key_to_eng(rows) {
  let keys_map = {
    地區: "district",
    大廈名單: "building_name",
    個案最後到訪日期: "last_date_of_visit",
    相關個案編號: "related_cases",
    District: "district",
    "Building name": "building_name",
    "Last date of visit of the case(s)": "last_date_of_visit",
    "Related cases": "related_cases",
  };
  return rows.map((r) => {
    let res = {};
    Object.keys(r).forEach((key) => {
      res[keys_map[key]] = r[key];
    });
    return res;
  });
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  let response = await axios.get(
    "http://www.chp.gov.hk/files/misc/building_list_chi.csv",
    { responseType: "blob" }
  );
  let csv_file = response.data;
  let chi_csv = {};
  try {
    // console.log(csv_file);
    if (csv_file) {
      let csv_str = csv_file;
      chi_csv = await csv().fromString(csv_str);
    }
  } catch (err) {
    //console.log(err);
  }

  response = await axios.get(
    "http://www.chp.gov.hk/files/misc/building_list_eng.csv",
    { responseType: "blob" }
  );
  csv_file = response.data;
  let eng_csv = {};
  try {
    if (csv_file) {
      let csv_str = response.data;
      eng_csv = await csv().fromString(csv_str);
    }
  } catch (err) {
    console.log(err);
  }
  let curr_time = moment().tz("Asia/Hong_Kong").format("L LTS") + " HKT";

  let result = {
    chi_csv: map_key_to_eng(chi_csv),
    eng_csv: map_key_to_eng(eng_csv),
    curr_time,
  };
  // Rest of the API logic
  res.json(result);
}

export default handler;

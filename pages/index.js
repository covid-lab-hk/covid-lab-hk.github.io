import { React, useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import csv from "csvtojson";
import axios from "axios";
import moment from "moment-timezone";

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

export default function Home(props) {
  //let all_csv_data = map_key_to_eng([...props.chi_csv, ...props.eng_csv]);
  //let curr_time = props.curr_time;

  let [currTime, setCurrTime] = useState(props.curr_time);
  let [csvData, setCsvData] = useState(
    map_key_to_eng([...props.chi_csv, ...props.eng_csv])
  );

  let [districtData, setDistrictData] = useState([]);
  let [selectedDistrict, setSelectedDistrict] = useState("");
  useEffect(() => {
    //console.log("get props", props.chi_csv[0], props.eng_csv[0]);
    //axios.get("/chp-gov-hk-files-api/building_list_chi.csv");
    //setCurrTime(moment().tz("Asia/Hong_Kong").format("L LTS") + " HKT");
    //fetchCsvFiles();
    axios.get("/api/chp-gov-hk/14-days-covid-buildings").then((response) => {
      //console.log(response);
      if (response.status == 200) {
        setCurrTime(response.data.curr_time);
        let all_csv = [...response.data.chi_csv, ...response.data.eng_csv];
        setCsvData(all_csv);

        let district_data = {};

        all_csv.forEach((item) => {
          if (item.district in district_data) {
            district_data[item.district] += 1;
          } else {
            district_data[item.district] = 1;
          }
        });

        setDistrictData(
          Object.entries(district_data).map((item) => {
            return { text: item[0], count: item[1] };
          })
        );
      }
    });
  }, []);

  let fetchCsvFiles = async () => {
    let res = await axios.get("/api/chp-gov-hk-files/building_list_chi.csv", {
      responseType: "blob",
    });
    let csv_file = res.data;
    let chi_csv = {};
    try {
      console.log(csv_file);
      if (csv_file) {
        let csv_str = csv_file;
        chi_csv = await csv().fromString(csv_str);
      }
    } catch (err) {
      console.log(err);
    }
    res = await axios.get("/api/chp-gov-hk-files/building_list_eng.csv", {
      responseType: "blob",
    });
    csv_file = res.data;
    let eng_csv = {};
    try {
      if (csv_file) {
        let csv_str = res.data;
        eng_csv = await csv().fromString(csv_str);
      }
    } catch (err) {
      console.log(err);
    }

    setCsvData(map_key_to_eng([...chi_csv, ...eng_csv]));
  };

  const [inputText, setInputText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    //console.log(lowerCase);

    setInputText(lowerCase);
  };
  let changeFilteredList = () => {
    let text = inputText;
    if (!text || text.trim() == "") return <></>;
    //console.log("trim text: ", text);
    setSelectedDistrict("");
    const filteredData = csvData.filter((row) => {
      return row["building_name"].toLowerCase().includes(text);
    });
    setFilteredData(filteredData);
  };

  let changeFilteredListByDistrict = (district) => {
    const filteredData = csvData.filter((row) => {
      return row["district"].toLowerCase().includes(district.toLowerCase());
    });
    setInputText("");

    setFilteredData(filteredData);
    setSelectedDistrict(district);
  };

  function SearchList({ data }) {
    return (
      <>
        <h2>總共{data.length}筆結果</h2>
        <div className="grid grid-cols-1  gap-2  p-5">
          {data.map((item, index) => (
            <div key={index} className="flex">
              <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-14 rounded-lg">
                {item.district}
              </div>

              <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-14 rounded-lg">
                {item.building_name}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  function DistrictList({ data }) {
    return (
      <div>
        {data.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              changeFilteredListByDistrict(item.text);
            }}
            className={`${
              selectedDistrict == item.text
                ? "bg-purple-300"
                : "bg-gradient-to-r"
            } ring-purple-300 text-white  from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
          >
            {item.text}
            <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
              {item.count}
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-auto bg-slate-900 min-h-screen">
      <Head>
        <title>Covid Lab HK</title>
        <meta
          name="description"
          content="過去 14 天內有嚴重急性呼吸綜合症冠狀病毒 2
            的陽性檢測個案曾居住的住宅大廈名單搜尋噐"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <div
          className={` flex flex-col justify-center align-items-center text-white`}
        >
          <h3>
            過去 14 天內有嚴重急性呼吸綜合症冠狀病毒 2
            的陽性檢測個案曾居住的住宅大廈名單搜尋噐
          </h3>
          <h2>最後更新時間 ： {currTime} </h2>

          <div className="flex flex-col justify-center align-items-center">
            <DistrictList data={districtData}></DistrictList>

            <div className="">
              <input
                type="text"
                value={inputText}
                onChange={inputHandler}
                className=" rounded-lg border-transparent appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Search"
              />
              <button
                type="button"
                onClick={() => {
                  changeFilteredList();
                }}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
              >
                Search
              </button>
            </div>
            {/* <div className=" ">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Blue
              </button>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Green
              </button>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Cyan
              </button>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Teal
              </button>
              <button
                type="button"
                className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Lime
              </button>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Red
              </button>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Pink
              </button>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Purple
              </button>
            </div> */}

            <SearchList data={filteredData}></SearchList>
          </div>
        </div>
      </main>

      {/* <footer className={styles.footer}></footer> */}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   // Call an external API endpoint to get posts
//   let res = await axios.get(
//     "http://www.chp.gov.hk/files/misc/building_list_chi.csv",
//     { responseType: "blob" }
//   );
//   let csv_file = res.data;
//   let chi_csv = {};
//   try {
//     console.log(csv_file);
//     if (csv_file) {
//       let csv_str = csv_file;
//       chi_csv = await csv().fromString(csv_str);
//     }
//   } catch (err) {
//     console.log(err);
//   }

//   res = await axios.get(
//     "http://www.chp.gov.hk/files/misc/building_list_eng.csv",
//     { responseType: "blob" }
//   );
//   csv_file = res.data;
//   let eng_csv = {};
//   try {
//     if (csv_file) {
//       let csv_str = res.data;
//       eng_csv = await csv().fromString(csv_str);
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   let curr_time = moment().tz("Asia/Hong_Kong").format("L LTS") + " HKT";

//   return {
//     props: {
//       chi_csv,
//       eng_csv,
//       curr_time,
//     },
//   };
// }

export async function getStaticProps(context) {
  // Call an external API endpoint to get posts
  let res = await axios.get(
    "http://www.chp.gov.hk/files/misc/building_list_chi.csv",
    { responseType: "blob" }
  );
  let csv_file = res.data;
  let chi_csv = {};
  try {
    //console.log(csv_file);
    if (csv_file) {
      let csv_str = csv_file;
      chi_csv = await csv().fromString(csv_str);
    }
  } catch (err) {
    //console.log(err);
  }

  res = await axios.get(
    "http://www.chp.gov.hk/files/misc/building_list_eng.csv",
    { responseType: "blob" }
  );
  csv_file = res.data;
  let eng_csv = {};
  try {
    if (csv_file) {
      let csv_str = res.data;
      eng_csv = await csv().fromString(csv_str);
    }
  } catch (err) {
    //console.log(err);
  }
  let curr_time = moment().tz("Asia/Hong_Kong").format("L LTS") + " HKT";

  return {
    props: {
      chi_csv,
      eng_csv,
      curr_time,
    },
    revalidate: 1,
  };
}

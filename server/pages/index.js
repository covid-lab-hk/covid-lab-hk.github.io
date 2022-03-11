"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 445:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(675);
;// CONCATENATED MODULE: external "csvtojson"
const external_csvtojson_namespaceObject = require("csvtojson");
var external_csvtojson_default = /*#__PURE__*/__webpack_require__.n(external_csvtojson_namespaceObject);
;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: external "moment-timezone"
const external_moment_timezone_namespaceObject = require("moment-timezone");
var external_moment_timezone_default = /*#__PURE__*/__webpack_require__.n(external_moment_timezone_namespaceObject);
;// CONCATENATED MODULE: ./pages/index.js








function map_key_to_eng(rows) {
    let keys_map = {
        地區: "district",
        大廈名單: "building_name",
        個案最後到訪日期: "last_date_of_visit",
        相關個案編號: "related_cases",
        District: "district",
        "Building name": "building_name",
        "Last date of visit of the case(s)": "last_date_of_visit",
        "Related cases": "related_cases"
    };
    return rows.map((r)=>{
        let res = {};
        Object.keys(r).forEach((key)=>{
            res[keys_map[key]] = r[key];
        });
        return res;
    });
}
function Home(props) {
    let all_csv_data = map_key_to_eng([
        ...props.chi_csv,
        ...props.eng_csv
    ]);
    let curr_time = props.curr_time;
    (0,external_react_.useEffect)(()=>{
    //console.log("get props", props.chi_csv[0], props.eng_csv[0]);
    //   axios
    //     .get("http://www.chp.gov.hk/files/misc/building_list_chi.csv")
    //     .then((response) => {
    //       console.log(response);
    //       return;
    //       csv()
    //         .fromStream()
    //         .then((csvRow) => {
    //           console.log(csvRow); // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
    //         });
    //     });
    }, []);
    const { 0: inputText , 1: setInputText  } = (0,external_react_.useState)("");
    const { 0: filteredData1 , 1: setFilteredData  } = (0,external_react_.useState)([]);
    let inputHandler = (e)=>{
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        //console.log(lowerCase);
        setInputText(lowerCase);
    };
    let changeFilteredList = ()=>{
        let text = inputText;
        if (!text || text.trim() == "") return(/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {}));
        //console.log("trim text: ", text);
        const filteredData = all_csv_data.filter((row)=>{
            return row["building_name"].toLowerCase().includes(text);
        });
        setFilteredData(filteredData);
    };
    function SearchList({ data  }) {
        return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                    children: [
                        "總共",
                        data.length,
                        "筆結果"
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "grid grid-cols-1 gap-2 p-5",
                    children: data.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "bg-green-100 text-green-500 text-lg font-bold text-center p-14 rounded-lg",
                                    children: item.district
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "bg-green-100 text-green-500 text-lg font-bold text-center p-14 rounded-lg",
                                    children: item.building_name
                                })
                            ]
                        }, index)
                    )
                })
            ]
        }));
    }
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "overflow-auto bg-slate-900 min-h-screen",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "Create Next App"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "Generated by create next app"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("main", {
                className: "container mx-auto",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: ` flex flex-col justify-center align-items-center text-white`,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                            children: "過去 14 天內有嚴重急性呼吸綜合症冠狀病毒 2 的陽性檢測個案曾居住的住宅大廈名單搜尋噐"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                            children: [
                                "最後更新時間 ： ",
                                curr_time,
                                " "
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex flex-col justify-center align-items-center",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            type: "text",
                                            onChange: inputHandler,
                                            className: " rounded-lg border-transparent appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent",
                                            placeholder: "Search"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                changeFilteredList();
                                            },
                                            className: "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ",
                                            children: "Search"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(SearchList, {
                                    data: filteredData1
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    }));
};
async function getServerSideProps(context) {
    // Call an external API endpoint to get posts
    let res = await external_axios_default().get("http://www.chp.gov.hk/files/misc/building_list_chi.csv", {
        responseType: "blob"
    });
    let csv_file = res.data;
    let chi_csv = {};
    try {
        console.log(csv_file);
        if (csv_file) {
            let csv_str = csv_file;
            chi_csv = await external_csvtojson_default()().fromString(csv_str);
        }
    } catch (err) {
        console.log(err);
    }
    res = await external_axios_default().get("http://www.chp.gov.hk/files/misc/building_list_eng.csv", {
        responseType: "blob"
    });
    csv_file = res.data;
    let eng_csv = {};
    try {
        if (csv_file) {
            let csv_str = res.data;
            eng_csv = await external_csvtojson_default()().fromString(csv_str);
        }
    } catch (err1) {
        console.log(err1);
    }
    let curr_time = external_moment_timezone_default()().tz("Asia/Hong_Kong").format("L LTS") + " HKT";
    return {
        props: {
            chi_csv,
            eng_csv,
            curr_time
        }
    };
}


/***/ }),

/***/ 28:
/***/ ((module) => {

module.exports = require("next/dist/server/image-config.js");

/***/ }),

/***/ 957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [675], () => (__webpack_exec__(445)));
module.exports = __webpack_exports__;

})();
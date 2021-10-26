const json = {
    "planInfo": ["A strategy which can only be deployed / viewed by you ; not listed on the marketplace","A strategy which you can list on the marketplace and others can subscribe to. Only you can view/edit the strategy conditions / positions. The subsribers can only choose the position size (multiplier) and the type of execution (Paper Trading / Live)","Abc","bcd"],
   "cols": [
      {
        "col" : ["Features / Plans Price", "Price", "No. of ChartInk Actions you can create", "No. of ChartInk Actions you can deploy","No. of Triggers per day", "Trade Execution Notification"],
        "planInfo" : ["A strategy which can only be deployed / viewed by you ; not listed on the marketplace","A strategy which you can list on the marketplace and others can subscribe to. Only you can view/edit the strategy conditions / positions. The subsribers can only choose the position size (multiplier) and the type of execution (Paper Trading / Live)","Abc","bcd"],
      },
      {
        "col" : ["Free Trial for 15 days","₹ 0","1","1","1","Email"],
        "Tier": ["FREE_TIER"]
      },
      {
        "col" : ["Starter","₹ 249","5","2","4","Email"],
        "Tier": ["STARTER_TIER"]
      },
      {
        "col" : ["Basic","₹ 489","10","5","10","Email"],
        "Tier": ["BASIC_TIER"]
      },
      // {
      //   "col" : ["Basic","₹ 500","10","2","50","5","Y","Email"]
      // },
      
      ]
        
  // "cols": [
  //   {
  //     "col1": [
  //       {
  //         "row1": {
  //           "name": "",
  //           "value": "",
  //           "type": ""
  //         }
  //       },
  //       {
  //         "row2": {}
  //       },
  //       {
  //         "row3": {}
  //       }
  //     ]
  //   },
  //   {
  //     "col2": [
  //       {
  //         "row1": {
  //           "name": "",
  //           "value": "",
  //           "type": ""
  //         }
  //       },
  //       {
  //         "row2": {}
  //       },
  //       {
  //         "row3": {}
  //       }
  //     ]
  //   }
  // ]
}

var price = JSON.stringify(json);
var plist = {json};
export const p = JSON.parse(price);
export const priceList = plist.json.cols;
console.log(priceList);
export const list = p.cols;
// export const listQ = p.colsQuarterly;
// export const listY = p.colsYearly;
export const pinfo = p.planInfo;
//console.log(price.cols);
//console.log(price);
// console.log(p.cols[0]);
// console.log(p.cols[0].col[0])
// console.log("Holaa");
//console.log(p.planInfo);



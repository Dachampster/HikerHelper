const fs = require("fs")
var request = require('request');
let airlineCodes = require('./airlinecode');
let airportCodes = require('./airportcodes');
var SabreDevStudioFlight = require('sabre-dev-studio/lib/sabre-dev-studio-flight');
var sabre_dev_studio_flight = new SabreDevStudioFlight({
  client_id: 'VjE6MzFoM242aGt3cXZsOWV4azpERVZDRU5URVI6RVhU',
  client_secret: 'azdMZFY0S2U=',
  uri: 'https://api.test.sabre.com',
  access_token: 'T1RLAQJi+lOF0OSzc4KCAHSHoxDRrlbxXBCJrTIelL0GJdihtCYk9azbAADAzfh3PfrdfBUh2XAJLbm7QOp2iKqjFJx06mXDZXt+WZh4JLwdvC3Y1EJjcVxGhROES3aJCGBBjvTTJTsnYizNHPmoI7bH6pJULRdpi/kGR2HPY0wl+A1Wj7LJfPMe9BX2xMz0NfCNmdjY3ekA/sfYfwgups+0pqJDv1D5uTibyYFDW5xPUXx7uC4slavTwXSHzK2ROwa8PrTEx+98acfSNQQGWhmwj0E1H8p5IcUMpfKX30NR3U7VlXsXxcQ6UGgf'
});
var callback = function (error, data) {
  if (error) {
    // Your error handling here
    console.log(error);
  } else {
    // Your success handling here
    var resultObj = JSON.parse(data);
    //console.log(Object.keys(resultObj))
    // console.log(JSON.stringify(resultObj, null, 2));

    fs.writeFileSync("./result.json", JSON.stringify(resultObj, null, 2), "utf-8")

    var response = JSON.stringify(resultObj, null, 2);
    printFlight(resultObj);

    // console.log(resultObj.PricedItineraries[0])
    // console.log(resultObj.PricedItineraries[0].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].ElapsedTime);
  }
};
//sabre_dev_studio_flight.travel_theme_lookup(callback);
//sabre_dev_studio_flight.theme_airport_lookup('BEACH', callback);
sabre_dev_studio_flight.instaflights_search({
  origin: "CLT",
  destination: "TPA",
  departuredate: "2018-07-07",
  returndate: "2018-07-09",
  limit: 1
}, callback);


function printFlight(flightInfo) {
  // Variables:
  var bookingCode;
  var depDateTime;
  var arrivalTime;
  var flightNumber;
  var elapsedTime;
  var departureAirportCode;
  var departureDestAirportCode;

  // Return Flight
  var returnDateTime;
  var returnArrivalTime;
  var returnFlightNumber;
  var returnElapsedTime;
  var returnDepartureAirportCode;
  var returnDestAirportCode;

  var S;
  var fare;
  var R;

  // var S = flightInfo.PricedItineraries[0].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0];
  // var fare = flightInfo.PricedItineraries[0].AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount;
  // console.log(flightInfo.PricedItineraries[0]);

  // Each returned flight in the array of results updated into the variables for printing
  for (let i = 0; i < flightInfo.PricedItineraries.length; i++) {
    let ii = 1;
    S = flightInfo.PricedItineraries[i].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0];
    fare = flightInfo.PricedItineraries[i].AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount;
    R = flightInfo.PricedItineraries[i].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[0];
    bookingCode = flightInfo.PricedItineraries[i].AirItineraryPricingInfo.PTC_FareBreakdowns.PTC_FareBreakdown.FareBasisCodes.FareBasisCode[0].content;
    ii++;

    // Departure Flight
    depDateTime = S.DepartureDateTime;
    arrivalTime = S.ArrivalDateTime;
    flightNumber = S.FlightNumber;
    elapsedTime = S.ElapsedTime;
    departureAirlineCode = S.MarketingAirline.Code;
    departureAirportCode = S.DepartureAirport.LocationCode;
    departureDestAirportCode = S.ArrivalAirport.LocationCode;

    // Return Flight
    returnDateTime = R.DepartureDateTime;
    returnArrivalTime = R.ArrivalDateTime;
    returnFlightNumber = R.FlightNumber;
    returnElapsedTime = R.ElapsedTime;
    returnAirlineCode = R.MarketingAirline.Code;
    returnDepartureAirportCode = R.DepartureAirport.LocationCode;
    returnDestAirportCode = R.ArrivalAirport.LocationCode;

    // Finding airport names
    function findObjectByKey(array, key, value) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
          return array[i];
        }
      }
      return null;
    }

    var departureAirport = findObjectByKey(stationCodes.response, 'code', departureAirportCode);

    var arrivalAirport = findObjectByKey(stationCodes.response, 'code', returnDepartureAirportCode);

    // Finding airline names
    var responseDepart = {
      "MarketingAirline": {
        "Code": departureAirlineCode
      }
    }

    var responseReturn = {
      "MarketingAirline": {
        "Code": returnAirlineCode
      }
    }

    var departureAirline = airlineCodes[responseDepart.MarketingAirline.Code];
    var returnAirline = airlineCodes[responseReturn.MarketingAirline.Code]
    // var airlineCodes = airlineCodes[response.MarketingAirline.Code]

    // console.log(flight.PricedItineraries);
    // console.log(departureAirlineCode + '\n' + returnAirlineCode);
    console.log("\n");
    console.log("Your Fare: $" + fare);
    console.log("Your Booking Code: " + bookingCode);
    console.log('Your departure airport is: ' + departureAirport.name);
    console.log("Your departure airline is: " + departureAirline);
    console.log("Your Departure Flight Number: " + flightNumber);
    console.log("Your Departure Time: " + depDateTime);
    console.log("Your Arrival Time: " + arrivalTime);
    console.log("Your Flight's Elapsed Time (H:M) " + Math.trunc(elapsedTime / 60) + ":" + elapsedTime % 60, '\n');

    console.log('Your arrival airport is: ' + arrivalAirport.name);
    console.log("Your return airline is: " + returnAirline);
    console.log("Your Return Flight Number: " + returnFlightNumber);
    console.log("Your Return Departure Time: " + returnDateTime);
    console.log("Your Return Arrival Time: " + returnArrivalTime);
    console.log("Your Return Flight's Elapsed Time (H:M) " + Math.trunc(returnElapsedTime / 60) + ":" + returnElapsedTime % 60);
  }
  console.log("\n");
}


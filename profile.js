// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use node.js to connect to Treehouse's API to get profile information to print out

var https = require("https");
var http = require("http");


//Print out message
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
};

//Print out error messages
function printError(error) {
  console.error(error.message);
}

function get(username) {
  //Connect to the API URL (http://teamtreehouse.com/username.json)
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
    var body = "";
    
    //Read the data
    response.on('data', function(chunk) {
      body += chunk;
    });
    
    //Parse the data
    response.on('end', function() {
      if (response.statusCode == "200") {
        try {
          var profile = JSON.parse(body);
        } catch(error) {
          //Parse error
          printError(error);
        }
        //Print the data
        printMessage(username, profile.badges.length, profile.points.JavaScript);
        var numBadges = profile.badges.length;
      } else {
        //Status Code error
        printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });
  });
  
  //Connection error
  request.on("error", printError);
 
}

module.exports.get = get;
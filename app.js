// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBN7wbJqE3M23psbzC9Ths4KSVdflXW1AY",
    authDomain: "paintrain-ecd1d.firebaseapp.com",
    databaseURL: "https://paintrain-ecd1d.firebaseio.com",
    storageBucket: "paintrain-ecd1d.appspot.com",
    messagingSenderId: "598750297150"
  };
  firebase.initializeApp(config); 


var database = firebase.database(); 

//var name = "ben";
//var destination = "";
//var trainTime = "";
//var frequency = ""; 
// Current Time
//var currentTime = moment().format("hh:mm");  
//console.log(currentTime); 




$("#submit").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      var name = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var trainTime = $("#trainTime").val().trim();
      var frequency = $("#frequency").val().trim();

      // Code for handling the push
      database.ref().push({
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency 

      }); 

      console.log(name); 
      console.log(destination); 
      console.log(trainTime); 
      console.log(frequency);

    });

database.ref().on("child_added", function(snapshot) {

    var storedName = snapshot.val().name; 
    var storedDestination = snapshot.val().destination; 
    var storedFrequency = snapshot.val().frequency;
    var storedTrainTime = snapshot.val().trainTime;



    var firstTime = moment(storedTrainTime, "HH:mm").subtract(1, "years"); 
    console.log("first time: " + firstTime);
    // Time is trainTime input
    //var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    //console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
      // Difference between the times
    var diffTime = moment().diff(moment(firstTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % storedFrequency;
    console.log(tRemainder);
    // Minute Until Train
   var minutesAway = storedFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);
    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
      
      // Change the HTML to reflect
      $("#trainSchedule").append("<tr><td>" + storedName + "</td><td>" + storedDestination + "</td><td>" + storedFrequency + "</td><td>" 
      	+ moment(nextArrival).format("hh:mm") + "</td><td>" + minutesAway + "</td></tr>");
      
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
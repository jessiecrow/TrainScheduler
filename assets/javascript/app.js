var database = firebase.database();
var trainReference = database.ref("/trainData");

var name = "";
var destination = "";
var time = "";
var frequency = "";

$("#submit-button").on("click", function() {
    event.preventDefault();
    var trnName = $("#train-name").val().trim();
    var trnDestination = $("#destination").val().trim();
    var trnTime = moment($("#train-time").val().trim(), "HH:mm").format();
    var trnFrequency = parseInt($("#frequency").val().trim());

    var newTrain = {
        name: trnName,
        destination: trnDestination,
        time: trnTime,
        frequency: trnFrequency
    };
        database.ref("/trainData").push(newTrain);

    alert("Train added to schedule");

    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");

    return false;
});

database.ref("/trainData").on("child_added", function(childSnapshot, prevChildKey) {
    var trnName = childSnapshot.val().name;
    var trnDestination = childSnapshot.val().destination;
    var trnTime = childSnapshot.val().time;
    var trnFrequency = childSnapshot.val().frequency;

        var trainTimeConverted = moment(trnTime, "HH:mm").subtract(1, "years");
        var currentTime = moment();
        var differentTime = moment().diff(moment(trainTimeConverted), "minutes");
        var trnRemainder = differentTime % trnFrequency;
        var trainMinTill = trnFrequency - trnRemainder;
        var nextTrain = moment().add(trainMinTill, "minutes");

    $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" + trnFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + trainMinTill + "</td><td>" + "" + "</td></tr>");
});
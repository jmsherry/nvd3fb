$(function(){

  var happy = null;
  var ok = null;
  var sad = null;

  var getData = function(){
    // return [{
    //   label: "Happy",
    //   value: happy
    // }, {
    //   label: "OK",
    //   value: ok
    // }, {
    //   label: "Sad",
    //   value: sad
    // }];
    return [
    {
      key: "Cumulative Return",
      values: [{
        label: "Happy",
        value: happy
      }, {
        label: "OK",
        value: ok
      }, {
        label: "Sad",
        value: sad
      }]
    }
  ]
  };

  // Initialize Firebase - ADD YOUR CREDS HERE!!
  var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
  firebase.initializeApp(config);

  function drawGraph(data){
    //Regular pie chart example
    // nv.addGraph(function() {
    //   var chart = nv.models.pieChart()
    //       .x(function(d) { return d.label })
    //       .y(function(d) { return d.value })
    //       .showLabels(true);
    //
    //     d3.select("#graph svg")
    //         .datum(data)
    //         .transition().duration(350)
    //         .call(chart);
    //
    //   return chart;
    // });

    // Bar Chart
    nv.addGraph(function() {
      var chart = nv.models.discreteBarChart()
      .options({
        duration: 350,
        tooltips: false
      })
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .staggerLabels(true)
      .showValues(true);

      d3.select('#graph svg')
        .datum(data)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });
  }

  var query = firebase.database().ref();

  query.on("value", function(snapshot) {

      var data = snapshot.val();
      happy = data.happy;
      ok = data.ok;
      sad = data.sad;


      drawGraph(getData());
    });

    // DOM SECTION
    var $happyButton = $('#happy');
    var $okButton = $('#ok');
    var $sadButton = $('#sad');

    $happyButton.on('click.happy', function(){
      firebase.database().ref().child('happy').set(happy+=1);
    });

    $okButton.on('click.ok', function(){
      firebase.database().ref().child('ok').set(ok+=1);
    });

    $sadButton.on('click.sad', function(){
      firebase.database().ref().child('sad').set(sad+=1);
    });

});

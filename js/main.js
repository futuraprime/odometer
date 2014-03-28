/*global Big, Odometer, _gaq*/
(function() {
  'use strict';

  // var age_el = document.getElementById('age');
  var age_form = document.getElementById('age_form');
  var dob_el = document.getElementById('dob');
  var rel_to_sun = document.getElementById('rel_to_sun');
  var rel_to_galaxy = document.getElementById('rel_to_galaxy');
  var rel_to_cbe = document.getElementById('rel_to_cbe');

  if(window.innerWidth > 480) {
    // this is a clunky performance fix for mobile devices, basically
    var odometers = {
      sun : new Odometer({
        el : rel_to_sun,
        value : 0
      }),
      galaxy : new Odometer({
        el : rel_to_galaxy,
        value : 0
      }),
      cbe : new Odometer({
        el : rel_to_cbe,
        value : 0
      })
    };
    // just making jshint shut up with this line
    odometers.jshint = 'stop complaining';
  }

  var baseTime = {
    time : new Date()
  };

  var year_length = new Big(8766); // in hours

  // speeds are in mph
  var speed_vs_cbe = new Big(872405); // 390.000 km/s;
  var speed_vs_galaxy = new Big(500864); //223.907 km/s;
  var speed_vs_sun = new Big(67735); // 30.28 km/s;
  // var speed_at_equator = 1037.6; // 0.463 km/s;

  function calculateStellarDistances(hours) {
    hours = new Big(hours);
    rel_to_sun.innerHTML = Math.round(speed_vs_sun.times(year_length).times(hours));
    rel_to_galaxy.innerHTML = Math.round(speed_vs_galaxy.times(year_length).times(hours));
    rel_to_cbe.innerHTML = Math.round(speed_vs_cbe.times(year_length).times(hours));
  }

  function calculateStellarDistancesFromMS(milliseconds) {
    calculateStellarDistances(milliseconds / 1000 / 60 / 60);
  }

  setInterval(function() {
    var timeDelta = new Date() - baseTime.time;
    calculateStellarDistancesFromMS(timeDelta);
  }, 750);


  age_form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    var dob = dob_el.value;
    var age = new Date() - new Date(dob); // now we have it in milliseconds!
    baseTime.time = new Date(dob);
    age = Math.round(age / 1000 / 60 / 60); // now we have it in hours
    calculateStellarDistances(age);
    _gaq.push(['_trackEvent', 'odometer', 'setDate']);
  });
})();

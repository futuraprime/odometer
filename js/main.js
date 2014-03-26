/*global console*/
(function() {
  'use strict';

  // var age_el = document.getElementById('age');
  var age_form = document.getElementById('age_form');
  var dob_el = document.getElementById('dob');
  var rel_to_sun = document.getElementById('rel_to_sun');
  var rel_to_galaxy = document.getElementById('rel_to_galaxy');
  var rel_to_cbe = document.getElementById('rel_to_cbe');

  var baseTime = new Date();

  var year_length = 8766; // in hours

  // speeds are in mph
  var speed_vs_cbe = 872405; // 390.000 km/s;
  var speed_vs_galaxy = 500864; //223.907 km/s;
  var speed_vs_sun = 67735; // 30.28 km/s;
  // var speed_at_equator = 1037.6; // 0.463 km/s;

  function calculateStellarDistances(hours) {
    rel_to_sun.innerHTML = speed_vs_sun * year_length * hours;
    rel_to_galaxy.innerHTML = speed_vs_galaxy * year_length * hours;
    rel_to_cbe.innerHTML = speed_vs_cbe * year_length * hours;
  }

  function calculateStellarDistancesFromMS(milliseconds) {
    calculateStellarDistances(milliseconds / 1000 / 60 / 60);
  }

  setInterval(function() {
    var timeDelta = new Date() - baseTime;
    calculateStellarDistancesFromMS(timeDelta);
  }, 750);


  age_form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    var dob = dob_el.value;
    var age = new Date() - new Date(dob); // now we have it in milliseconds!
    baseTime = age;
    age = Math.round(age / 1000 / 60 / 60); // now we have it in hours
    console.log(age);
    calculateStellarDistances(age);
  });
})();

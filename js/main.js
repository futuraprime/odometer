/*global console, _*/
var age_el = document.getElementById('age');
var dob_el = document.getElementById('dob');
var rel_to_sun = document.getElementById('rel_to_sun');
var rel_to_galaxy = document.getElementById('rel_to_galaxy');
var rel_to_cbe = document.getElementById('rel_to_cbe');

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

age_el.addEventListener('change', function() {
  var age = parseInt(age_el.value, 10);
  console.log(parseInt(age_el.value, 10));
  calculateStellarDistances(age);
  // console.log('cbe', speed_vs_cbe * year_length * age);
  // console.log('galaxy', speed_vs_galaxy * year_length * age);
  // console.log('sun', speed_vs_sun * year_length * age);
});

dob_el.addEventListener('change', _.throttle(function() {
  var dob = dob_el.value;
  var age = new Date() - new Date(dob); // now we have it in milliseconds!
  age = Math.round(age / 1000 / 60 / 60); // now we have it in hours
  console.log(age);
  calculateStellarDistances(age);
}, 1000));


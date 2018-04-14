let test = "";

$(document).ready(function () {
  $(function () {
    $('#travel_button').on('click', function () {
      var n_input = $('#origin-code').val();
      test = n_input;
      trial(test);
      console.log("Samuel");
    });
  });
});

function trial(testing) {
  console.log(testing);
};
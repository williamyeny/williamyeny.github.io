$(document).ready(function() {
  var a;
  $("#submit").click(function() {
    if ($.isNumeric($("#num").val())) {
      for (i = 0; i < $("#num").val(); i++) {
        $("#output").val(($("#output").val() + Math.random().toString(36).substr(2, 5) + "-" + Math.random().toString(36).substr(2, 5) + "-" + Math.random().toString(36).substr(2, 5) + "\n").toUpperCase());
      }
      $("#output").val($("#output").val().toUpperCase());
    } else {
      $("#output").val("Please enter a valid number >:(");
    }
  })
});
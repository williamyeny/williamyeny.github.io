$(document).ready(function () {
    $("#submit").click(function() {
//         $.post("https://docs.google.com/forms/d/1oHu_jq1caLN4ggKwbnh1KD1ntzXtqINiyAHX6c6JDZs/formResponse",
//         {
//             "entry.950472274": "ayy",
//             "fbzx": "2199171180584603931"
//         },
//         function(data, status){
        
//         });
        $.ajax({
                url: "https://docs.google.com/forms/d/1oHu_jq1caLN4ggKwbnh1KD1ntzXtqINiyAHX6c6JDZs/formResponse",
                data: {"entry.950472274": "ayy"},
                type: "POST",
                dataType: "xml",
            });
    });

}) ;
$(document).ready(function () {
    var html = "";
    var name = "";
    $.getJSON("https://spreadsheets.google.com/feeds/cells/1eM7cYEGYzCCwE-q9UaDD72CYrdjNJ1hzOTs0FQfA56I/1/public/values?alt=json", function(data) {
        for (i = data["feed"]["entry"].length - 1; i >= 0 ; i--) {
            console.log(i);
            realData = data["feed"]["entry"][i]["gs$cell"];
            if (realData["col"] == 2 && realData["row"] != 1) {
                name = realData["$t"]; 
            } else {
                name = "";
            }
            
            html += ("<p>" + name + "</p>");
        }
        $("#output").html(html);
    });
    $("form").submit(function(e) {
        $("#output").prepend("<p class=\"fade-in\">" + $(".ss-q-short").val() + "</p>");
        setTimeout(function(){ // Delay for Chrome
            $(".ss-q-short").val('');
        }, 100);
        this.submit();        

        
    });
}) ;
$(document).ready(function () {
    var names = [];
    var html = "";
    $.getJSON("https://spreadsheets.google.com/feeds/list/1q_kFId0K_2jZU9SlZ-iNcC6ZLmcXWhR7_LU8rtLhzTo/od6/public/values?alt=json", function(data) {
        for (i = 0; i < 5; i++) {
            name = data["feed"]["entry"][i]["title"]["$t"]; 
            html += ("<div class=\"player\">" + name + "</div>");
        }
        $("#league").append(html);
        html = "";
        for (i = 5; i < 10; i++) {
            name = data["feed"]["entry"][i]["title"]["$t"]; 
            html += ("<div class=\"player\">" + name + "</div>");
        }
        $("#csgo").append(html);
    });
    //$(".faq-sec:nth-of-type(" + 0 + ")").html("none");
});
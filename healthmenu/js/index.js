var foods = ["Stuffed Potato Skins", "French Fries", "Chicken Wings"];
var calories = ['372','245.8','1,992'];
var carbs = ['43.3g','32.8g','32g'];
var fat = ['15.9g','12.00g','165g'];
var protein = ['17.6g','3.8g','18g'];

$(document).ready(function() {
    $(".nutri").click(function() {
        var p = $(this).parent().parent().parent().offset();
        var inf = $(".info").clone().appendTo(".content");
        inf.css("left",p.left);
        inf.css("top",p.top);
        inf.css("display", "block");
        var num = 0;
        for (i = 0; i < foods.length; i++) {
            var name = $(this).parent().parent().parent().find("h3").html();
            console.info(name);
            if (foods[i] == name) {
                num = i;
                break;
            }
        }
        inf.find("ul").html('<li><span>Calories: </span>' + calories[num] + '</li><li><span>Carbs: </span>' + carbs[num] + '</li><li><span>Fat: </span>' + fat[num] + '<li><li><span>Protein: </span>' + protein[num] + '</li>');
    });
    $(document).on('click', '.back', function () {
        $(this).parent().parent().remove();
    });
});
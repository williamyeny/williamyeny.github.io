$( document ).ready(function() {

//     $("#drive").click(function() {
//         window.location.href = "nodatabase.html"; 
//     });
    
    $(".project-sec").hover(function() {
        $(this).find(".project-text").addClass("project-text-hover"); //moves the text
        $(this).find(".project-text h2").addClass("project-text-h2-hover"); //fades away the top text
        $(this).find(".button-container").addClass("button-container-hover"); //brings the buttons to view
//         $(this).append("<div class=\"button-container\"><a href=\"#\" class=\"button\">VIEW PROJECT</a><a href=\"#\" class=\"button\">SOURCE</a></div>");
    }, function() {
        $(this).find(".project-text").removeClass("project-text-hover");
        $(this).find(".project-text h2").removeClass("project-text-h2-hover");
        $(this).find(".button-container").removeClass("button-container-hover");
    
    })
    
//     $("#gaming-club").click(function() {
//         window.location.href = "gamingclub.html"; 
//     });
    
});
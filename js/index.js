$( document ).ready(function() {

    $(".project-sec").click(function() {
        //remove classes
        $(".project-sec").not(this).find(".project-text").removeClass("project-text-hover");
        $(".project-sec").not(this).find(".project-text h2").removeClass("project-text-h2-hover");
        $(".project-sec").not(this).find(".button-container").removeClass("button-container-hover");
        $(".project-sec").not(this).removeClass("project-sec-hover");
        $(".project-sec").not(this).find(".button").addClass("button-hidden");
        //toggle classes
        $(this).find(".project-text").toggleClass("project-text-hover");
        $(this).find(".project-text h2").toggleClass("project-text-h2-hover");
        $(this).find(".button-container").toggleClass("button-container-hover");
        $(this).toggleClass("project-sec-hover");
        $(this).find(".button").toggleClass("button-hidden");
    })
    
//     $(".expandable").click(function() {
//         var projectName = $(this).find("h2").text().replace(/ /g, "_").toLowerCase();
//         console.log(projectName);
//         $(".expandable").not(this).remove("canvas");
//         $(".expandable").not(this).find(".canvas-container").removeClass("canvas-container-hover");

//         $(this).find(".canvas-container").toggleClass("canvas-container-hover");
//         if ($(this).find(".canvas-container").hasClass("canvas-container-hover")) {
//             $(this).find(".canvas-container").append("<canvas data-processing-sources=\"pde/" + projectName + ".pde\"></canvas>");
//         } else {
//             $(this).find(".canvas-container").remove("canvas");
//         }
        
//     });
    $(".processing").click(function() {
        console.log("clickeroony");
        var projectName = $(this).parent().parent().find("h2").text().replace(/ /g, "_").toLowerCase();   
        console.log(projectName);
        var canvasRef = document.createElement('canvas');
        var p = Processing.loadSketchFromSources(canvasRef, ['/pde/' + projectName + '.pde']);
        $(this).parent().parent().after("<div class=\"canvas-container\"></div>");
        $(this).parent().parent().parent().find(".canvas-container").append(canvasRef);

    });
    
});
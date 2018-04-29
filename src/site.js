// Delay loading any function until the html dom has loaded. All functions are
// defined in this top level function to ensure private scope.
jQuery(document).ready(function () {

  // Installs error handling.
  jQuery.ajaxSetup({
  error: function(resp, e) {
    if (resp.status == 0){
      alert('You are offline!!\n Please Check Your Network.');
      } else if (resp.status == 404){
        alert('Requested URL not found.');
      } else if (resp.status == 500){
        alert('Internel Server Error:\n\t' + resp.responseText);
      } else if (e == 'parsererror') {
        alert('Error.\nParsing JSON Request failed.');
      } else if (e == 'timeout') {
        alert('Request timeout.');
      } else {
        alert('Unknown Error.\n' + resp.responseText);
      }
    }
  });  // error:function()


  var generate_btn = jQuery('#generate_btn');
  var sample_1_btn = jQuery('#sample_1_btn');
  var sample_2_btn = jQuery('#sample_2_btn');
  var sample_3_btn = jQuery('#sample_3_btn');
  var sample_4_btn = jQuery('#sample_4_btn');
  var sample_5_btn = jQuery('#sample_5_btn');

  var svg_div = jQuery('#graphviz_svg_div');
  var graphviz_data_textarea = jQuery('#graphviz_data');

  function InsertGraphvizText(text) {
    graphviz_data_textarea.val(text);
  }

/*
  function UpdateGraphviz() {
	svg_div.html("");
    var data = graphviz_data_textarea.val();
    // Generate the Visualization of the Graph into "svg".
    var svg = Viz(data, "svg");
    svg_div.html("<hr>"+svg);
  }
*/

  function UpdateGraphviz() {
    svg_div.html("");
    // process the model and produce graphViz data
    var graphTxt = "digraph \"Model\" { \n";
    graphTxt += "  graph [	fontname = \"Helvetica-Oblique\", \n";
    graphTxt += "        fontsize = 16, \n";
    graphTxt += "        label = \"Model\", \n";
    graphTxt += "        size = \"12,12\" ]; \n";
    graphTxt += "    node [	shape = polygon, \n";
    graphTxt += "        sides = 4, \n";
    graphTxt += "        distortion = \"0.0\", \n";
    graphTxt += "        orientation = \"0.0\", \n";
    graphTxt += "        skew = \"0.0\", \n";
    graphTxt += "        color = white, \n";
    graphTxt += "        style = filled, \n";
    graphTxt += "        fontname = \"Helvetica-Outline\" ]; \n";

    for(var i = 0; i < model.vertex.length; ++i){

      graphTxt += "\"" + model.vertex[i].name + "\" [sides=4, distortion=\"0.0\", orientation=0, skew=\"0.0\", color=\"" + model.vertex[i].color.red +" " + model.vertex[i].color.green + " " + model.vertex[i].color.blue + "\"]; \n";
    }

    for(var i = 0; i < model.vertex.length; ++i){
      graphTxt += "\"" + model.edges[i].src  + "\" -> \"" + model.edges[i].trg + "\" [ label = \"" + model.edges[i].name + "\" ]; \n";
    }

    graphTxt += "}";

    /*
      "A" [sides=4, distortion="0.0", orientation=0, skew="0.0", color=salmon2];
      "B" [sides=4, distortion="0.0", orientation=0, skew="0.0", color=deepskyblue];
      "C" [sides=4, distortion="0.0", orientation=0, skew="0.0", color=salmon2];
      "D" [sides=4, distortion="0.0", orientation=0, skew="0.0", color= "0.650 0.700 0.700"];
      "E" [sides=4, distortion="0.0", orientation=0, skew="0.0", color= "0.150 0.700 0.700"];
      "A" -> "B";
      "A" -> "C" [ label = "ac" ];
      "B" -> "C";
      "A" -> "D";
      "D" -> "B";
      "E" -> "C";
      "C" -> "E";
    }
*/
    // display graphviz graph
    var data = graphTxt;
    // Generate the Visualization of the Graph into "svg".
    var svg = Viz(data, "svg");
    svg_div.html(svg);
  }

  // Startup function: call UpdateGraphviz
  jQuery(function() {
	// The buttons are disabled, enable them now that this script
	// has loaded.
    generate_btn.removeAttr("disabled")
                .text("Show Model");

    sample_1_btn.removeAttr("disabled");
    sample_2_btn.removeAttr("disabled");
    sample_3_btn.removeAttr("disabled");
    sample_4_btn.removeAttr("disabled");
    sample_5_btn.removeAttr("disabled");
  });

  // Bind actions to form buttons.
  generate_btn.click(UpdateGraphviz);

  sample_1_btn.click(function(){
    InsertGraphvizText(jQuery("#sample1_text").html().trim());
  });

  sample_2_btn.click(function(){
    InsertGraphvizText(jQuery("#sample2_text").html().trim());
  });

  sample_3_btn.click(function(){
    InsertGraphvizText(jQuery("#sample3_text").html().trim());
  });

  sample_4_btn.click(function(){
    InsertGraphvizText(jQuery("#sample4_text").html().trim());
  });

  sample_5_btn.click(function(){
    InsertGraphvizText(jQuery("#sample5_text").html().trim());
  });

});

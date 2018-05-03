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


  var generate_pred_btn = jQuery('#generate_pred_btn');
  var generate_const_btn = jQuery('#generate_const_btn');

  var svg_div = jQuery('#graphviz_svg_div');
  var svg_div_rule_X = jQuery('#graphviz_svg_div_rule_X');
  var svg_div_rule_LHS = jQuery('#graphviz_svg_div_rule_LHS');
  var svg_div_rule_K = jQuery('#graphviz_svg_div_rule_K');
  var svg_div_rule_RHS = jQuery('#graphviz_svg_div_rule_RHS');

  var svg_div_pred_arity = jQuery('#graphviz_svg_div_pred_arity');
  var svg_div_pred_L = jQuery('#graphviz_svg_div_pred_L');
  var svg_div_pred_R = jQuery('#graphviz_svg_div_pred_R');
  var svg_div_pred_NegR = jQuery('#graphviz_svg_div_pred_NegR');



  function UpdateGraphviz() {
    svg_div.html("");
    // process the model and produce graphViz data
    var graphTxt = "digraph \"Model\" { \n";
    graphTxt += "  graph [	fontname = \"Helvetica-Oblique\", \n";
    graphTxt += "        fontsize = 10, \n";
    graphTxt += "        label = \"Model\", \n";
    graphTxt += "        size = \"3,3\" ]; \n";
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

    for(var i = 0; i < model.edges.length; ++i){
      graphTxt += "\"" + model.edges[i].src  + "\" -> \"" + model.edges[i].trg + "\" [ label = \"" + model.edges[i].name + "\" ]; \n";
    }

    graphTxt += "}";


    // display graphviz graph
    var data = graphTxt;
    // Generate the Visualization of the Graph into "svg".
    var svg = Viz(data, "svg");
    svg_div.html(svg);
  }


 function getTxtBasic(caption){
   var graphTxt_basic = "digraph \""+ caption + "\" { \n";
   graphTxt_basic += "  graph [	fontname = \"Helvetica-Oblique\", \n";
   graphTxt_basic += "        fontsize = 10, \n";
   graphTxt_basic += "        label = \"" + caption + "\", \n";
   graphTxt_basic += "        size = \"3,3\" ]; \n";
   graphTxt_basic += "    node [	shape = polygon, \n";
   graphTxt_basic += "        sides = 2, \n";
   graphTxt_basic += "        distortion = \"0.0\", \n";
   graphTxt_basic += "        orientation = \"0.0\", \n";
   graphTxt_basic += "        skew = \"0.0\", \n";
   graphTxt_basic += "        color = white, \n";
   graphTxt_basic += "        style = filled, \n";
   graphTxt_basic += "        fontname = \"Helvetica-Outline\" ]; \n";
   return graphTxt_basic;
 }

 function getSVGTxt(vertex, edges){
   var graphTxt = "";
   if(rules.length == 0) return "";

   for(var i = 0; i < vertex.length; ++i){

     var typeName = vertex[i].type;
     var typeNode;
     for(var t = 0; t < model.vertex.length; ++t){
       if(model.vertex[t].name == typeName){
         typeNode = model.vertex[t];
         break;
       }
     }
     graphTxt += "\"" + vertex[i].name + ":" + typeName + "\" [sides=4, distortion=\"0.0\", orientation=0, skew=\"0.0\", color=\"" + typeNode.color.red +" " + typeNode.color.green + " " + typeNode.color.blue + "\"]; \n";
   }

   for(var i = 0; i < edges.length; ++i){
     var typeName = edges[i].type;
     var srcNode,  trgNode;
     for(var j = 0; j < vertex.length; ++j){
       if(vertex[j].name == edges[i].src){
         srcNode = vertex[j];
         break;
       }
     }
     for(var j = 0; j < vertex.length; ++j){
       if(vertex[j].name == edges[i].trg){
         trgNode = vertex[j];
         break;
       }
     }
     graphTxt += "\"" + edges[i].src + ":" + srcNode.type  + "\" -> \"" + edges[i].trg + ":" + trgNode.type + "\" [ label = \"" + edges[i].name + ":" + typeName + "\" ]; \n";
   }

   graphTxt += "}";
   return graphTxt;
 }

  function getSVGPredTxt(arity, vertex, edges, constFlag){
    var graphTxt = "";
    if(rules.length == 0) return "";

    for(var i = 0; i < vertex.length; ++i){

      var typeName = vertex[i].type;
      var typeNode;
      for(var t = 0; t < arity.vertex.length; ++t){
        if(arity.vertex[t].name == typeName){
          typeNode = arity.vertex[t];
          break;
        }
      }
      if(constFlag)
        graphTxt += "\"" + vertex[i].name + ":" + typeName + "\" [sides=4, distortion=\"0.0\", orientation=0, skew=\"0.0\", color=\"" + typeNode.modelcolor.red +" " + typeNode.modelcolor.green + " " + typeNode.modelcolor.blue + "\"]; \n";
      else
        graphTxt += "\"" + vertex[i].name + ":" + typeName + "\" [sides=4, distortion=\"0.0\", orientation=0, skew=\"0.0\", color=\"" + typeNode.color.red +" " + typeNode.color.green + " " + typeNode.color.blue + "\"]; \n";
    }

    for(var i = 0; i < edges.length; ++i){
      var typeName = edges[i].type;
      var srcNode,  trgNode;
      for(var j = 0; j < vertex.length; ++j){
        if(vertex[j].name == edges[i].src){
          srcNode = vertex[j];
          break;
        }
      }
      for(var j = 0; j < vertex.length; ++j){
        if(vertex[j].name == edges[i].trg){
          trgNode = vertex[j];
          break;
        }
      }
      graphTxt += "\"" + edges[i].src + ":" + srcNode.type  + "\" -> \"" + edges[i].trg + ":" + trgNode.type + "\" [ label = \"" + edges[i].name + ":" + typeName + "\" ]; \n";
    }

    graphTxt += "}";
    return graphTxt;
  }


  function UpdateGraphvizRule() {
    svg_div_rule_LHS.html("");

    if(rules.length == 0) return;


    if(rules[0].X.vertex) {
      var graphTxt_X = getTxtBasic("X") + getSVGTxt(rules[0].X.vertex, rules[0].X.edges);
      svg_div_rule_X.html( Viz(graphTxt_X, "svg"));
    }

    if(rules[0].L.vertex) {
      var graphTxt_LHS = getTxtBasic("LHS") + getSVGTxt(rules[0].L.vertex, rules[0].L.edges);
      svg_div_rule_LHS.html( Viz(graphTxt_LHS, "svg"));
    }

    if(rules[0].K.vertex) {
      var graphTxt_K = getTxtBasic("K") + getSVGTxt(rules[0].K.vertex, rules[0].K.edges);
      svg_div_rule_K.html( Viz(graphTxt_K, "svg"));
    }

    if(rules[0].R.vertex) {
      var graphTxt_RHS = getTxtBasic("RHS") + getSVGTxt(rules[0].R.vertex, rules[0].R.edges);
      svg_div_rule_RHS.html( Viz(graphTxt_RHS, "svg"));
    }

  }




  function UpdateGraphvizPred() {
    svg_div_pred_arity.html("");
    svg_div_pred_L.html("");
    svg_div_pred_R.html("");
    svg_div_pred_NegR.html("");
    // process the model and produce graphViz data


    if (predicates.length == 0) return;
    var select = document.getElementById('selectPredicates');
    var index = select.selectedIndex;


    if (predicates[index].arity.vertex) {
      var graphTxt_arity = getTxtBasic("Arity");

      for (var i = 0; i < predicates[index].arity.vertex.length; ++i) {
        graphTxt_arity += "\"" + predicates[index].arity.vertex[i].name + "\" [sides=4, distortion=\"0.0\", orientation=0, skew=\"0.0\", color=\"" + predicates[index].arity.vertex[i].color.red + " " + predicates[index].arity.vertex[i].color.green + " " + predicates[index].arity.vertex[i].color.blue + "\"]; \n";
      }

      for (var i = 0; i < predicates[index].arity.edges.length; ++i) {
        graphTxt_arity += "\"" + predicates[index].arity.edges[i].src + "\" -> \"" + predicates[index].arity.edges[i].trg + "\" [ label = \"" + predicates[index].arity.edges[i].name + "\" ]; \n";
      }
      graphTxt_arity += "}";
      svg_div_pred_arity.html(Viz(graphTxt_arity, "svg"));


      if (predicates[index].semantics[0].L.vertex) {
        var graphTxt_L = getTxtBasic("Condition Pattern") + getSVGPredTxt(predicates[index].arity, predicates[index].semantics[0].L.vertex, predicates[index].semantics[0].L.edges);
        svg_div_pred_L.html(Viz(graphTxt_L, "svg"));
      }

      if (predicates[index].semantics[0].R.vertex) {
        var graphTxt_R = getTxtBasic("Required Pattern") + getSVGPredTxt(predicates[index].arity, predicates[index].semantics[0].R.vertex, predicates[index].semantics[0].R.edges);
        svg_div_pred_R.html(Viz(graphTxt_R, "svg"));
      }

      if (predicates[index].semantics[0].NegR.vertex) {
        var graphTxt_NegR = getTxtBasic("Forbidden Pattern") + getSVGPredTxt(predicates[index].arity, predicates[index].semantics[0].NegR.vertex, predicates[index].semantics[0].NegR.edges);
        svg_div_pred_NegR.html(Viz(graphTxt_NegR, "svg"));
      }


      var selectConst = document.getElementById('selectConstraints');
      for (var c=0; c<selectConst.length; c++){
        selectConst.remove(c);
      }

      for (var i = 0; i < constraints.length; i++) {
        if (constraints[i].srcPredicate == predicates[index].name) {
          var opt = document.createElement("option");
          opt.value = i;
          opt.innerHTML = i;
          opt.text = constraints[i].name;
          selectConst.add(opt);
        }
      }

    }
  }
    function UpdateGraphvizConst() {
      svg_div_pred_arity.html("");
      svg_div_pred_L.html("");
      svg_div_pred_R.html("");
      svg_div_pred_NegR.html("");
      // process the model and produce graphViz data


      if(predicates.length == 0) return;
      var select = document.getElementById('selectPredicates');
      var index = select.selectedIndex;

      var selectedConst = document.getElementById('selectConstraints').textContent;
      console.log('selected constraint : ' + selectedConst);
      var selectedConstObj;

      for(var c = 0; c < constraints.length; ++c){
        if(constraints[c].name == selectedConst){
          selectedConstObj = constraints[c];
          break;
        }
      }


      if(predicates[index].arity.vertex) {
        var graphTxt_arity = getTxtBasic("Arity");
        var modelElement;

        for(var i = 0; i < predicates[index].arity.vertex.length; ++i){
          // use the mapping for color...
          for(var c = 0; c < selectedConstObj.nodeMaps.length; ++c){
            if(selectedConstObj.nodeMaps[c].src == predicates[index].arity.vertex[i].name){
              for(var m = 0; m < model.vertex.length; ++m){
                if(model.vertex[m].name == selectedConstObj.nodeMaps[c].trg){
                  modelElement = model.vertex[m];
                  break;
                }
              }
              break;
            }
          }

          predicates[index].arity.vertex[i].modelcolor = modelElement.color;
          graphTxt_arity += "\"" + predicates[index].arity.vertex[i].name + "\" [sides=4, distortion=\"0.0\", orientation=0, skew=\"0.0\", color=\"" + predicates[index].arity.vertex[i].modelcolor.red +" " + predicates[index].arity.vertex[i].modelcolor.green + " " + predicates[index].arity.vertex[i].modelcolor.blue + "\"]; \n";
        }

        for(var i = 0; i < predicates[index].arity.edges.length; ++i){
          graphTxt_arity += "\"" + predicates[index].arity.edges[i].src  + "\" -> \"" + predicates[index].arity.edges[i].trg + "\" [ label = \"" + predicates[index].arity.edges[i].name + "\" ]; \n";
        }
        graphTxt_arity += "}";
        svg_div_pred_arity.html( Viz(graphTxt_arity, "svg"));


        if(predicates[index].semantics[0].L.vertex) {
          var graphTxt_L = getTxtBasic("Condition Pattern") + getSVGPredTxt(predicates[index].arity, predicates[index].semantics[0].L.vertex, predicates[index].semantics[0].L.edges, true );
          svg_div_pred_L.html( Viz(graphTxt_L, "svg"));
        }

        if(predicates[index].semantics[0].R.vertex) {
          var graphTxt_R = getTxtBasic("Required Pattern") + getSVGPredTxt(predicates[index].arity, predicates[index].semantics[0].R.vertex, predicates[index].semantics[0].R.edges, true);
          svg_div_pred_R.html( Viz(graphTxt_R, "svg"));
        }

        if(predicates[index].semantics[0].NegR.vertex) {
          var graphTxt_NegR = getTxtBasic("Forbidden Pattern") + getSVGPredTxt(predicates[index].arity, predicates[index].semantics[0].NegR.vertex, predicates[index].semantics[0].NegR.edges, true);
          svg_div_pred_NegR.html( Viz(graphTxt_NegR, "svg"));
        }

      }



  }



  // Startup function: call UpdateGraphviz
  jQuery(function() {
	// The buttons are disabled, enable them now that this script
	// has loaded.

    generate_pred_btn.removeAttr("disabled").text("Show Predicate");
    generate_const_btn.removeAttr("disabled").text("Display constraint");

  });

  UpdateGraphviz();
  UpdateGraphvizRule();

  // Bind actions to form buttons.

  generate_pred_btn.click(UpdateGraphvizPred);
  generate_const_btn.click(UpdateGraphvizConst);

});

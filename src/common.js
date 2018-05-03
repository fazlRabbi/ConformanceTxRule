/**
 * Created by rabbi on 2018-03-19.
 */
var requiredPatternFlag = false;
var thePredicate = null;
var theConst = null;
var violatedConstraints = [];


function getPredicateByName(predName){
    for(var j = 0; j < predicates.length; ++j){
        if(predicates[j].name === predName)
            return predicates[j];
    }
}

function getNodeImageFromConstriant(theConst, nodeType){
    for(var i = 0; i < theConst.nodeMaps.length; ++i){
        if(theConst.nodeMaps[i].src === nodeType)
            return theConst.nodeMaps[i].trg;
    }
}

function getEdgeImageFromConstriant(theConst, edgeType){
    for(var i = 0; i < theConst.edgeMaps.length; ++i){
        if(theConst.edgeMaps[i].src === edgeType)
            return theConst.edgeMaps[i].trg;
    }
}

function isDuplicateRuleMapping3(array1, array2, index, newEntry){
    for(var i = 0; i < array1.length; ++i){
        if(array1[i].ruleEntry === newEntry)
            return true;
    }
    for(var i = 0; i < index; ++i){
        if(array2[i].supplimentRuleEntry === newEntry)
            return true;
    }
    return false;
}

function isDuplicateRuleMapping2(array1, array2, index, newEntry){
    for(var i = 0; i < array1.length; ++i){
        if(array1[i].ruleEntry === newEntry)
            return true;
    }
    for(var i = 0; i < index; ++i){
        if(array2[i].ruleEntry === newEntry)
            return true;
    }
    return false;
}

function isDuplicateRuleMapping(vertices, index_pred_Node, newEntry){
    for(var i = 0; i < index_pred_Node; ++i){
        if(vertices[i].ruleEntry === newEntry)
            return true;
    }
    return false;
}

function sortBasedOnTrgEdge(edge){
    if(edge){
        for(var i = 0; i < edge.length; ++i){
            for(var j = i+1; j < edge.length; ++j){
                if(edge[i].trgEdge > edge[j].trgEdge){
                    var tmp = edge[i];
                    edge[i] = edge[j];
                    edge[j] = tmp;
                }
            }
        }
    }
    return edge;
}



function sortBasedOnType(theArray){
    if(theArray){
        for(var i = 0; i < theArray.length; ++i){
            for(var j = i+1; j < theArray.length; ++j){
                if(theArray[i].type > theArray[j].type){
                    var tmp = theArray[i];
                    theArray[i] = theArray[j];
                    theArray[j] = tmp;
                }
            }
        }
    }
    return theArray;
}


function sortBasedOnTrgNode(vertex){
    if(vertex){
        for(var i = 0; i < vertex.length; ++i){
            for(var j = i+1; j < vertex.length; ++j){
                if(vertex[i].trgNode > vertex[j].trgNode){
                    var tmp = vertex[i];
                    vertex[i] = vertex[j];
                    vertex[j] = tmp;
                }
            }
        }
    }
    return vertex;
}


function setColorToModel(){
    if(model && model.vertex) {
        for (var i = 0; i < model.vertex.length; ++i) {
            var red = 0.3 + Math.random();
            var green = 0.2 + Math.random();
            var blue = 0.6 + Math.random();
            model.vertex[i].color = {"red": red, "green": green, "blue": blue};
        }
    }
}

function setColorToPredicates(){
    if(predicates) {
        for(var p = 0; p < predicates.length; ++p) {
            if(predicates[p].arity.vertex) {
                for (var i = 0; i < predicates[p].arity.vertex.length; ++i) {
                    var red = 0.4 + Math.random();
                    var green = 0.6 + Math.random();
                    var blue = 0.5 + Math.random();
                    predicates[p].arity.vertex[i].color = {"red": red, "green": green, "blue": blue};
                }
            }
        }
    }
}
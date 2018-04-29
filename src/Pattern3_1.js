/**
 * Created by rabbi on 2018-04-08.
 */

function PC3_1_Nodes(index_1, index_rule, vertexNegR, edgesNegR, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR){
    if(matchFlag == true) return;
    if(index_1 >= vertexNegR.length){
        // check for edges.
        console.log(vertexNegR);
        PC3_1_Edges(0, 0, vertexNegR, edgesNegR, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR);
        return;
    }
    if(index_rule >= vertexRuleX.length)
        return;
    else if(vertexRuleX[index_rule].type > vertexNegR[index_1].trgNode)
        return;

    var nextIndex = index_rule + 1;

    for(var i = index_1; i < vertexNegR.length; ++i){
        vertexNegR[i].ruleEntry = null;
    }

    if(vertexNegR[index_1].trgNode === vertexRuleX[index_rule].type){
        if(!isDuplicateRuleMapping(vertexNegR, index_1, vertexRuleX[index_rule].name)) {
            vertexNegR[index_1].ruleEntry = vertexRuleX[index_rule].name;
            PC3_1_Nodes(index_1+1, nextIndex, vertexNegR, edgesNegR, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR);
        }
    }
    PC3_1_Nodes(index_1, nextIndex, vertexNegR, edgesNegR, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR);

}

function PC3_1_Edges(index_1, index_rule, vertexNegR, edgesNegR, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR){
    if(matchFlag === true)
        return;

    if(index_1 >= edgesNegR.length){

        console.log("rule mapping complete for PC3_1.....");
        console.log(edgesNegR);
        var foundFlag = false;

        // vertexNegR + vertexRuleL = vertexRuleX && edgesNegR + edgesRuleL = edgesRuleX
        var count = vertexRuleL.length;
        for(var i = 0; i < vertexNegR.length; ++i){
            foundFlag = false;
            for(var j = 0; j < vertexRuleL.length; ++j){
                if(vertexRuleL[j].name === vertexNegR[i].ruleEntry){
                    foundFlag = true;
                    break;
                }
            }
            if(foundFlag === false)
                count++;
        }

        if(count != vertexRuleX.length)
            return;

        count = edgesRuleL.length;
        for(var i = 0; i < edgesNegR.length; ++i){
            foundFlag = false;
            for(var j = 0; j < edgesRuleL.length; ++j){
                if(edgesRuleL[j].name === edgesNegR[i].ruleEntry){
                    foundFlag = true;
                    break;
                }
            }
            if(foundFlag === false)
                count++;
        }

        if(count != edgesRuleX.length)
            return;

        // need to make sure that there exists at least one y in vertexNegR or edgesNegR such that y is not in R

        for(var i = 0; i < vertexNegR.length; ++i){
            foundFlag = false;
            for(var j = 0; j < vertexRuleR.length; ++j){
                if(vertexNegR[i].ruleEntry === vertexRuleR[j].name){
                    foundFlag = true;
                    break;
                }
            }

            if(foundFlag === false){
                matchFlag = true;
                return;
            }
        }

        for(var i = 0; i < edgesNegR.length; ++i){
            foundFlag = false;
            for(var j = 0; j < edgesRuleR.length; ++j){
                if(edgesNegR[i].ruleEntry === edgesRuleR[j].name){
                    foundFlag = true;
                    break;
                }
            }

            if(foundFlag === false){
                matchFlag = true;
                return;
            }
        }

        return;
    }

    if(index_rule >= edgesRuleX.length)
        return;
    else if(edgesRuleX[index_rule].type > edgesNegR[index_1].trgEdge)
        return;

    var nextIndex = index_rule + 1;

    for(var i = index_1; i < edgesNegR.length; ++i){
        edgesNegR[i].ruleEntry = null;
    }

    if(edgesNegR[index_1].trgEdge === edgesRuleX[index_rule].type){
        var srcNode = edgesNegR[index_1].src;
        var trgNode = edgesNegR[index_1].trg;
        var srcInstance, trgInstance;
        for(var j = 0; j < vertexNegR.length; ++j){
            if(vertexNegR[j].name === srcNode)
                srcInstance = vertexNegR[j].ruleEntry;

            if(vertexNegR[j].name === trgNode)
                trgInstance = vertexNegR[j].ruleEntry;
        }

        if(srcInstance === edgesRuleX[index_rule].src && trgInstance === edgesRuleX[index_rule].trg) {

            if (!isDuplicateRuleMapping(edgesNegR, index_1, edgesRuleX[index_rule].name)) {
                edgesNegR[index_1].ruleEntry = edgesRuleX[index_rule].name;
                PC3_1_Edges(index_1+1, nextIndex, vertexNegR, edgesNegR, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR);
            }
        }
    }

    PC3_1_Edges(index_1, nextIndex, vertexNegR, edgesNegR, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR);

}

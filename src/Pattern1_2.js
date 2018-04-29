/**
 * Created by rabbi on 2018-04-07.
 */



function PC1_2_Nodes(index_1, index_rule, vertexL, edgesL, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR){
    if(matchFlag === true)
        return;
    if(index_1 >= vertexL.length){
        // check for edges.
        console.log(vertexL);
        PC1_2_Edges(0, 0, vertexL, edgesL, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR);
        return;
    }
    if(index_rule >= vertexRuleX.length)
        return;
    else if(vertexRuleX[index_rule].type > vertexL[index_1].trgNode)
        return;

    var nextIndex = index_rule + 1;

    for(var i = index_1; i < vertexL.length; ++i){
        vertexL[i].ruleEntry = null;
    }

    if(vertexL[index_1].trgNode === vertexRuleX[index_rule].type){
        if(!isDuplicateRuleMapping(vertexL, index_1, vertexRuleX[index_rule].name)) {
            vertexL[index_1].ruleEntry = vertexRuleX[index_rule].name;
            PC1_2_Nodes(index_1+1, nextIndex, vertexL, edgesL, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR);
        }
    }
    PC1_2_Nodes(index_1, nextIndex, vertexL, edgesL, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR);

}

function PC1_2_Edges(index_1, index_rule, vertexL, edgesL, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR){
    if(matchFlag === true)
        return;
    if(index_1 >= edgesL.length){

        console.log("rule mapping complete ");
        console.log(edgesL);

        // vertexL + vertexRuleL = vertexRuleX && edgesL + edgesRuleL = edgesRuleX
        var count = vertexRuleL.length;
        for(var i = 0; i < vertexL.length; ++i){
            foundFlag = false;
            for(var j = 0; j < vertexRuleL.length; ++j){
                if(vertexRuleL[j].name === vertexL[i].ruleEntry){
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
        for(var i = 0; i < edgesL.length; ++i){
            foundFlag = false;
            for(var j = 0; j < edgesRuleL.length; ++j){
                if(edgesRuleL[j].name === edgesL[i].ruleEntry){
                    foundFlag = true;
                    break;
                }
            }
            if(foundFlag === false)
                count++;
        }

        if(count != edgesRuleX.length)
            return;

        // need to make sure that there exists at least one y in vertexL or edgesL such that y is not in L and R
        var foundFlag = false;
        for(var i = 0; i < vertexL.length; ++i){
            foundFlag = false;
            for(var j = 0; j < vertexRuleL.length; ++j){
                if(vertexL[i].ruleEntry === vertexRuleL[j].name){
                    foundFlag = true;
                    break;
                }
            }

            if(foundFlag === false){
                for(var j = 0; j < vertexRuleR.length; ++j){
                    if(vertexL[i].ruleEntry === vertexRuleR[j].name){
                        foundFlag = true;
                        break;
                    }
                }
            }
            if(foundFlag === false){
                matchFlag = true;
                return;
            }
        }

        for(var i = 0; i < edgesL.length; ++i){
            foundFlag = false;
            for(var j = 0; j < edgesRuleL.length; ++j){
                if(edgesL[i].ruleEntry === edgesRuleL[j].name){
                    foundFlag = true;
                    break;
                }
            }

            if(foundFlag === false){
                for(var j = 0; j < edgesRuleR.length; ++j){
                    if(edgesL[i].ruleEntry === edgesRuleR[j].name){
                        foundFlag = true;
                        break;
                    }
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
    else if(edgesRuleX[index_rule].type > edgesL[index_1].trgEdge)
        return;

    var nextIndex = index_rule + 1;

    for(var i = index_1; i < edgesL.length; ++i){
        edgesL[i].ruleEntry = null;
    }



    if(edgesL[index_1].trgEdge === edgesRuleX[index_rule].type){
        var srcNode = edgesL[index_1].src;
        var trgNode = edgesL[index_1].trg;
        var srcInstance, trgInstance;
        for(var j = 0; j < vertexL.length; ++j){
            if(vertexL[j].name === srcNode)
                srcInstance = vertexL[j].ruleEntry;

            if(vertexL[j].name === trgNode)
                trgInstance = vertexL[j].ruleEntry;
        }

        if(srcInstance === edgesRuleX[index_rule].src && trgInstance === edgesRuleX[index_rule].trg) {

            if (!isDuplicateRuleMapping(edgesL, index_1, edgesRuleX[index_rule].name)) {
                edgesL[index_1].ruleEntry = edgesRuleX[index_rule].name;
                PC1_2_Edges(index_1+1, nextIndex, vertexL, edgesL, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR);
            }
        }
    }

    PC1_2_Edges(index_1, nextIndex, vertexL, edgesL, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR);

}

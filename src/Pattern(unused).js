/**
 * Created by rabbi on 2018-04-08.
 */


function PC2_2_Nodes(index_1, index_rule, vertexR, edgesR, vertexL, edgesL, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR){

    if(index_1 >= vertexR.length){
        // check for edges.
        console.log(vertexR);
        PC2_2_Edges(0, 0, vertexR, edgesR, vertexL, edgesL, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR);
        return;
    }
    if(index_rule >= vertexRuleL.length)
        return;

    var nextIndex = index_rule + 1;
    PC2_2_Nodes(index_1, nextIndex, vertexR, edgesR, vertexL, edgesL, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR);

    if(vertexR[index_1].trgNode === vertexRuleL[index_rule].type){
        if(!isDuplicateRuleMapping(vertexR, index_1, vertexRuleL[index_rule].name)) {
            vertexR[index_1].ruleEntry = vertexRuleL[index_rule].name;
            index_1++;
            PC2_2_Nodes(index_1, nextIndex, vertexR, edgesR, vertexL, edgesL, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR);
        }
    }
}

function PC2_2_Edges(index_1, index_rule, vertexR, edgesR, vertexL, edgesL, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR){

    if(index_1 >= edgesR.length){

        console.log("rule mapping complete for PC2_2.....");
        console.log(edgesR);

        // need to make sure that there exists at least one y in vertexL or edgesL such that y is not in R
        var foundFlag = false;
        for(var i = 0; i < vertexL.length; ++i){
            foundFlag = false;
            var ruleEntry = null;

            for(var j = 0; j < vertexR.length; ++j){
                if(vertexL[i].name === vertexR[j].name){
                    ruleEntry = vertexR[j].ruleEntry;
                    break;
                }
            }

            for(var j = 0; j < vertexRuleR.length; ++j){
                if(vertexRuleR[j].name === ruleEntry){
                    foundFlag = true;
                    break;
                }
            }

            if(foundFlag === false){
                matchFlag = true;
                return;
            }
        }

        for(var i = 0; i < edgesL.length; ++i){
            foundFlag = false;
            var ruleEntry = null;

            for(var j = 0; j < edgesR.length; ++j){
                if(edgesR[j].name === edgesL[i].name){
                    ruleEntry = edgesR[j].ruleEntry;
                    break;
                }
            }

            for(var j = 0; j < edgesRuleR.length; ++j){
                if(edgesRuleR[j].name === ruleEntry){
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

    if(index_rule >= edgesRuleL.length)
        return;

    var nextIndex = index_rule + 1;
    PC2_2_Edges(index_1, nextIndex, vertexR, edgesR, vertexL, edgesL, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR);

    if(matchFlag === true)
        return;

    if(edgesR[index_1].trgEdge === edgesRuleL[index_rule].type){
        var srcNode = edgesR[index_1].src;
        var trgNode = edgesR[index_1].trg;
        var srcInstance, trgInstance;
        for(var j = 0; j < vertexR.length; ++j){
            if(vertexR[j].name === srcNode)
                srcInstance = vertexR[j].ruleEntry;

            if(vertexR[j].name === trgNode)
                trgInstance = vertexR[j].ruleEntry;
        }

        if(srcInstance === edgesRuleL[index_rule].src && trgInstance === edgesRuleL[index_rule].trg) {

            if (!isDuplicateRuleMapping(edgesR, index_1, edgesRuleL[index_rule].name)) {
                edgesR[index_1].ruleEntry = edgesRuleL[index_rule].name;
                index_1++;
                PC2_2_Edges(index_1, nextIndex, vertexR, edgesR, vertexL, edgesL, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR);
            }
        }
    }
}

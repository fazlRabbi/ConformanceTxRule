/**
 * Created by rabbi on 2018-04-07.
 */



function PC1_1_Nodes_R(index_1, index_rule, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR){

    if(matchFlag == true)
        return;

    if(index_1 >= vertexR.length){
        // check for edges.
        console.log(vertexR);
        PC1_1_Edges_R(0, 0, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR);
        return;
    }
    if(index_rule >= vertexRuleR.length)
        return;
    else if(vertexRuleR[index_rule].type > vertexR[index_1].trgNode)
        return;

    var nextIndex = index_rule + 1;

    for(var i = index_1; i < vertexR.length; ++i){
        vertexR[i].ruleEntry = null;
    }

    // found in vertexL, use that mapping
    var foundInL = false;
    for(var i = 0; i < vertexL.length; ++i){
        if(vertexR[index_1].name == vertexL[i].name){
            vertexR[index_1].ruleEntry = vertexL[i].ruleEntry;
            foundInL = true;
            break;
        }
    }

    if(foundInL){
        PC1_1_Nodes_R(index_1+1, nextIndex, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR);
    }
    else {
        if (vertexR[index_1].trgNode === vertexRuleR[index_rule].type) {
            if (!isDuplicateRuleMapping2(vertexL, vertexR, index_1, vertexRuleR[index_rule].name)) {
                vertexR[index_1].ruleEntry = vertexRuleR[index_rule].name;
                PC1_1_Nodes_R(index_1 + 1, nextIndex, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR);
            }
        }
        PC1_1_Nodes_R(index_1, nextIndex, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR);
    }
}

function PC1_1_Edges_R(index_1, index_rule, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR){
    if(matchFlag == true)
        return;
    if(index_1 >= edgesR.length){
        // check for edges.
        console.log("found corresponding injective match from R to RHS");
        console.log(edgesR);
        matchFlag = true;
        return;
    }
    if(index_rule >= edgesRuleR.length)
        return;
    else if(edgesRuleR[index_rule].type > edgesR[index_1].trgEdge)
        return;

    var nextIndex = index_rule + 1;


    for(var i = index_1; i < edgesR.length; ++i){
        edgesR[i].ruleEntry = null;
    }
// found in edgesL, use that mapping
    var foundInL = false;
    for(var i = 0; i < edgesL.length; ++i){
        if(edgesR[index_1].name == edgesL[i].name){
            edgesR[index_1].ruleEntry = edgesL[i].ruleEntry;
            foundInL = true;
            break;
        }
    }

    if(foundInL){
        PC1_1_Edges_R(index_1+1, nextIndex, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR);
    }
    else {
        if (edgesR[index_1].trgEdge === edgesRuleR[index_rule].type) {
            var srcNode = edgesR[index_1].src;
            var trgNode = edgesR[index_1].trg;
            var srcInstance, trgInstance;
            for (var j = 0; j < vertexR.length; ++j) {
                if (vertexR[j].name === srcNode)
                    srcInstance = vertexR[j].ruleEntry;

                if (vertexR[j].name === trgNode)
                    trgInstance = vertexR[j].ruleEntry;
            }

            if (srcInstance === edgesRuleR[index_rule].src && trgInstance === edgesRuleR[index_rule].trg) {

                if (!isDuplicateRuleMapping2(edgesL, edgesR, index_1, edgesRuleR[index_rule].name)) {
                    edgesR[index_1].ruleEntry = edgesRuleR[index_rule].name;
                    PC1_1_Edges_R(index_1 + 1, nextIndex, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR);
                }
            }
        }
        PC1_1_Edges_R(index_1, nextIndex, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR);
    }
}

function PC1_1_Nodes(index_1, index_rule, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR){

    if(index_1 >= vertexL.length){
        // check for edges.
        console.log(vertexL);
        PC1_1_Edges(0, 0, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR);
        return;
    }
    if(index_rule >= vertexRuleR.length)
        return;
    else if(vertexRuleR[index_rule].type > vertexL[index_1].trgNode)
        return;

    var nextIndex = index_rule + 1;

    for(var i = index_1; i < vertexL.length; ++i){
        vertexL[i].ruleEntry = null;
    }

    if(vertexL[index_1].trgNode === vertexRuleR[index_rule].type){
        if(!isDuplicateRuleMapping(vertexL, index_1, vertexRuleR[index_rule].name)) {
            vertexL[index_1].ruleEntry = vertexRuleR[index_rule].name;
            PC1_1_Nodes(index_1+1, nextIndex, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR);
        }
    }

    PC1_1_Nodes(index_1, nextIndex, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR);
}

function PC1_1_Edges(index_1, index_rule, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR){

    if(index_1 >= edgesL.length){
        // check for edges.
        matchCount1++;
        //console.log("found one injective match from L to RHS... Need to find corresponding injective match from R to RHS");
        console.log("matchcount1 :: " + matchCount1);
        console.log(edgesL);
        matchFlag = false;
        PC1_1_Nodes_R(0, 0, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR);

        if(matchFlag){
            matchCount2++;
        }
        console.log("matchcount2 :: " + matchCount2);
        return;
    }
    if(index_rule >= edgesRuleR.length)
        return;
    else if(edgesRuleR[index_rule].type > edgesL[index_1].trgEdge)
        return;

    var nextIndex = index_rule + 1;

    for(var i = index_1; i < edgesL.length; ++i){
        edgesL[i].ruleEntry = null;
    }

    if(edgesL[index_1].trgEdge === edgesRuleR[index_rule].type){
        var srcNode = edgesL[index_1].src;
        var trgNode = edgesL[index_1].trg;
        var srcInstance, trgInstance;
        for(var j = 0; j < vertexL.length; ++j){
            if(vertexL[j].name === srcNode)
                srcInstance = vertexL[j].ruleEntry;

            if(vertexL[j].name === trgNode)
                trgInstance = vertexL[j].ruleEntry;
        }

        if(srcInstance === edgesRuleR[index_rule].src && trgInstance === edgesRuleR[index_rule].trg) {

            if (!isDuplicateRuleMapping(edgesL, index_1, edgesRuleR[index_rule].name)) {
                edgesL[index_1].ruleEntry = edgesRuleR[index_rule].name;
                PC1_1_Edges(index_1+1, nextIndex, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR);
            }
        }
    }

    PC1_1_Edges(index_1, nextIndex, vertexL, edgesL, vertexR, edgesR, vertexRuleR, edgesRuleR);
}
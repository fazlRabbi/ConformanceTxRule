/**
 * Created by rabbi on 2018-04-08.
 */



function PC2_1_Nodes_suppliment(index_1, index_rule, vertexR, edgesR,  vertexRuleR, edgesRuleR) {
    if(matchFlag) return;
    if (index_1 >= vertexR.length) {
        // check for edges.
        console.log(vertexR);
        PC2_1_Edges_suppliment(0, 0, vertexR, edgesR, vertexRuleR, edgesRuleR);
        return;
    }
    if (index_rule >= vertexRuleR.length)
        return;
    else if (vertexRuleR[index_rule].type > vertexR[index_1].trgNode)
        return;

    var nextIndex = index_rule + 1;

    for(var i = index_1; i < vertexR.length; ++i){
        vertexR[i].supplimentRuleEntry = null;
    }

    if (vertexR[index_1].ruleEntry != null) {
        PC2_1_Nodes_suppliment(index_1 + 1, nextIndex, vertexR, edgesR, vertexRuleR, edgesRuleR);
    }
    else {
        if (vertexR[index_1].trgNode === vertexRuleR[index_rule].type) {
            if (!isDuplicateRuleMapping3(vertexR, vertexR, index_1, vertexRuleR[index_rule].name)) {
                vertexR[index_1].supplimentRuleEntry = vertexRuleR[index_rule].name;
                PC2_1_Nodes_suppliment(index_1 + 1, nextIndex, vertexR, edgesR, vertexRuleR, edgesRuleR);
            }
        }
        PC2_1_Nodes_suppliment(index_1, nextIndex, vertexR, edgesR,  vertexRuleR, edgesRuleR);
    }
}

function PC2_1_Edges_suppliment(index_1, index_rule, vertexR, edgesR, vertexRuleR, edgesRuleR){
    if(matchFlag) return;
    if(index_1 >= edgesR.length){
        matchFlag = true;
        matchCount2++;
        return;
    }

    if(index_rule >= edgesRuleR.length)
        return;
    else if(edgesRuleR[index_rule].type > edgesR[index_1].trgEdge)
        return;

    var nextIndex = index_rule + 1;

    for(var i = index_1; i < edgesR.length; ++i){
        edgesR[i].supplimentRuleEntry = null;
    }

    if(edgesR[index_1].ruleEntry != null){
        PC2_1_Edges_suppliment(index_1+1, nextIndex, vertexR, edgesR, vertexRuleR, edgesRuleR);
    }
    else{
        if(edgesR[index_1].trgEdge === edgesRuleR[index_rule].type){
            var srcNode = edgesR[index_1].src;
            var trgNode = edgesR[index_1].trg;
            var srcInstance, trgInstance;
            for(var j = 0; j < vertexR.length; ++j){
                if(vertexR[j].name === srcNode)
                    srcInstance = vertexR[j].ruleEntry;

                if(vertexR[j].name === trgNode)
                    trgInstance = vertexR[j].ruleEntry;
            }
            if(srcInstance == null){
                for(var j = 0; j < vertexR.length; ++j){
                    if(vertexR[j].name === srcNode)
                        srcInstance = vertexR[j].supplimentRuleEntry;
                }
            }
            if(trgInstance == null){
                for(var j = 0; j < vertexR.length; ++j){
                    if(vertexR[j].name === trgNode)
                        trgInstance = vertexR[j].supplimentRuleEntry;
                }
            }

            if(srcInstance === edgesRuleR[index_rule].src && trgInstance === edgesRuleR[index_rule].trg) {
                if (!isDuplicateRuleMapping3(edgesR, edgesR, index_1, edgesRuleR[index_rule].name)) {
                    edgesR[index_1].supplimentRuleEntry = edgesRuleR[index_rule].name;
                    PC2_1_Edges_suppliment(index_1+1, nextIndex, vertexR, edgesR, vertexRuleR, edgesRuleR);
                }
            }
        }
        PC2_1_Edges_suppliment(index_1, nextIndex, vertexR, edgesR, vertexRuleR, edgesRuleR);
    }
}

function PC2_1_Nodes(index_1, index_rule, vertexL, edgesL,  vertexR, edgesR, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR){

    if(index_1 >= vertexR.length){
        // check for edges.
        console.log(vertexR);
        PC2_1_Edges(0, 0, vertexL, edgesL, vertexR, edgesR, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR);
        return;
    }
    if(index_rule >= vertexRuleL.length)
        return;
    else if(vertexRuleL[index_rule].type > vertexR[index_1].trgNode)
        return;

    for(var i = index_1; i < vertexR.length; ++i){
        vertexR[i].ruleEntry = null;
    }

    var nextIndex = index_rule + 1;

    if(quit == true)
        return;

    if(vertexR[index_1].trgNode === vertexRuleL[index_rule].type){
        if(!isDuplicateRuleMapping(vertexR, index_1, vertexRuleL[index_rule].name)) {
            vertexR[index_1].ruleEntry = vertexRuleL[index_rule].name;
            PC2_1_Nodes(index_1+1, nextIndex, vertexL, edgesL, vertexR, edgesR, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR);
        }
    }

    PC2_1_Nodes(index_1, nextIndex, vertexL, edgesL, vertexR, edgesR, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR);

}

function PC2_1_Edges(index_1, index_rule, vertexL, edgesL, vertexR, edgesR, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR){
    if(quit === true) return;
    if(index_1 >= edgesR.length){


        console.log("rule mapping complete for PC2_1.....");
        //console.log("This is the thing we need to do for every injective match ");
        console.log(edgesR);

        // need to make sure that there exists another replacement of the required pattern.
        // the elements that have been deleted, there should be a suppliment of those elements in RHS.

        // first check that no elements from L is deleted.

        var foundFlag = false;
        for(var i = 0; i < vertexL.length; ++i){
            var ruleEntry = null;

            for(var j = 0; j < vertexR.length; ++j){
                if(vertexL[i].name === vertexR[j].name){
                    ruleEntry = vertexR[j].ruleEntry;
                    break;
                }
            }

            for(var j = 0; j < vertexRuleL.length; ++j){
                if(vertexRuleL[j].name === ruleEntry && vertexRuleL[j].deleteTag == true){
                    return;
                }
            }
        }

        for(var i = 0; i < edgesL.length; ++i){
            var ruleEntry = null;

            for(var j = 0; j < edgesR.length; ++j){
                if(edgesL[i].name === edgesR[j].name){
                    ruleEntry = edgesR[j].ruleEntry;
                    break;
                }
            }

            for(var j = 0; j < edgesRuleL.length; ++j){
                if(edgesRuleL[j].name === ruleEntry && edgesRuleL[j].deleteTag == true){
                    return;
                }
            }
        }


        var deleteFlag = false;

        for(var i = 0; i < vertexR.length; ++i) {
            ruleEntry = vertexR[i].ruleEntry;
            for (var j = 0; j < vertexRuleL.length; ++j) {
                if (vertexRuleL[j].name === ruleEntry && vertexRuleL[j].deleteTag == true) {
                    vertexR[i].ruleEntry = null;
                    deleteFlag = true;
                }
            }
        }

        for(var i = 0; i < edgesR.length; ++i) {
            ruleEntry = edgesR[i].ruleEntry;
            for (var j = 0; j < edgesRuleL.length; ++j) {
                if (edgesRuleL[j].name === ruleEntry && edgesRuleL[j].deleteTag == true) {
                    edgesR[i].ruleEntry = null;
                    deleteFlag = true;
                }
            }
        }

        if(deleteFlag){
            matchCount1++;
            matchFlag = false;
            PC2_1_Nodes_suppliment(0, 0, vertexR, edgesR,  vertexRuleR, edgesRuleR);

            // matchFlag must be true here in order to be conformance preserving.
            if(matchFlag != true)
                quit = true;
        }
        else{

        }



        return;
    }

    if(index_rule >= edgesRuleL.length)
        return;
    else if(edgesRuleL[index_rule].type > edgesR[index_1].trgEdge)
        return;

    var nextIndex = index_rule + 1;

    for(var i = index_1; i < edgesR.length; ++i){
        edgesR[i].ruleEntry = null;
    }



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
                PC2_1_Edges(index_1+1, nextIndex, vertexL, edgesL, vertexR, edgesR, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR);
            }
        }
    }

    PC2_1_Edges(index_1, nextIndex, vertexL, edgesL, vertexR, edgesR, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR);

}

/**
 * Created by rabbi on 2018-03-19.
 */

var matchFlag = false;
var quit = false;
var matchCount1 = 0;
var matchCount2 = 0;


function checkconformance(){
    console.log("Inside check_conformance() ");

    for(var i = 0; i < rules.length; ++i){
        theRule = rules[i];
        console.log("Processing rule " + theRule.name);

        var conformanceFlag = true;
        var RuleX = theRule.X;
        var RuleL = theRule.L;
        var RuleK = theRule.K;
        var RuleR = theRule.R;

        var vertexRuleX = RuleX.vertex;
        var edgesRuleX = RuleX.edges;
        var vertexRuleL = RuleL.vertex;
        var edgesRuleL = RuleL.edges;
        var vertexRuleK = RuleK.vertex;
        var edgesRuleK = RuleK.edges;
        var vertexRuleR = RuleR.vertex;
        var edgesRuleR = RuleR.edges;

        /* set flag to elements that the rule creates */
        for(var j = 0; j < vertexRuleR.length; ++j){
            var foundFlag = false;
            for(var k = 0; k < vertexRuleL.length; ++k){
                if(vertexRuleR[j].name === vertexRuleL[k].name && vertexRuleR[j].type === vertexRuleL[k].type ){
                    foundFlag = true;
                    break;
                }
            }
            if(foundFlag === false)
                vertexRuleR[j].createTag = true;
            else
                vertexRuleR[j].createTag = false;
            // copy this information in vertexRuleX
            if(vertexRuleX) {
                for (var k = 0; k < vertexRuleX.length; ++k) {
                    if (vertexRuleR[j].name === vertexRuleX[k].name && vertexRuleR[j].type === vertexRuleX[k].type) {
                        vertexRuleX[k].createTag = vertexRuleR[j].createTag;
                        break;
                    }
                }
            }
        }

        for(var j = 0; j < edgesRuleR.length; ++j){
            var foundFlag = false;
            for(var k = 0; k < edgesRuleL.length; ++k){
                if(edgesRuleR[j].name === edgesRuleL[k].name && edgesRuleR[j].type === edgesRuleL[k].type ){
                    foundFlag = true;
                    break;
                }
            }
            if(foundFlag === false)
                edgesRuleR[j].createTag = true;
            else
                edgesRuleR[j].createTag = false;
            // copy this information in edgesRuleX
            if(edgesRuleX) {
                for (var k = 0; k < edgesRuleX.length; ++k) {
                    if (edgesRuleR[j].name === edgesRuleX[k].name && edgesRuleR[j].type === edgesRuleX[k].type) {
                        edgesRuleX[k].createTag = edgesRuleR[j].createTag;
                        break;
                    }
                }
            }
        }


        /* set flag to elements that the rule deletes */
        for(var j = 0; j < vertexRuleL.length; ++j){
            var foundFlag = false;
            for(var k = 0; k < vertexRuleR.length; ++k){
                if(vertexRuleL[j].name === vertexRuleR[k].name && vertexRuleL[j].type === vertexRuleR[k].type ){
                    foundFlag = true;
                    break;
                }
            }
            if(foundFlag === false)
                vertexRuleL[j].deleteTag = true;
            else
                vertexRuleL[j].deleteTag = false;
        }

        for(var j = 0; j < edgesRuleL.length; ++j){
            var foundFlag = false;
            for(var k = 0; k < edgesRuleR.length; ++k){
                if(edgesRuleL[j].name === edgesRuleR[k].name && edgesRuleL[j].type === edgesRuleR[k].type ){
                    foundFlag = true;
                    break;
                }
            }
            if(foundFlag === false)
                edgesRuleL[j].deleteTag = true;
            else
                edgesRuleL[j].deleteTag = false;
        }

        console.log("vertexRuleL");
        console.log(vertexRuleL);
        console.log("edgesRuleR");
        console.log(edgesRuleR);

        for(var j = 0; j < constraints.length; ++j){
            theConst = constraints[j];
            console.log("checking constraint " + theConst.name);

            thePredicate = getPredicateByName(theConst.srcPredicate);
            console.log(thePredicate.name);

            for(var n = 0; n < thePredicate.semantics.length; ++n){
                var theSemantic = thePredicate.semantics[n];
                var L = theSemantic.L;
                var R = theSemantic.R;
                var negR = theSemantic.NegR;

                var vertexL = L.vertex;
                var edgesL = L.edges;
                var vertexR = R.vertex;
                var edgesR = R.edges;
                var vertexNegR = negR.vertex;
                var edgesNegR = negR.edges;


                for(var k = 0; k < vertexL.length; ++k){
                    var nodeName = vertexL[k].name;
                    var nodeType = vertexL[k].type;

                    var trgNodeName = getNodeImageFromConstriant(theConst, nodeType);
                    vertexL[k].trgNode = trgNodeName;
                    console.log(nodeName + "\t" + nodeType + "\t" + trgNodeName);
                }
                for(var k = 0; k < edgesL.length; ++k){
                    var edgeName = edgesL[k].name;
                    var edgeType = edgesL[k].type;

                    var trgEdgeName = getEdgeImageFromConstriant(theConst, edgeType);
                    edgesL[k].trgEdge = trgEdgeName;
                    console.log(edgeName + "\t" + edgeType + "\t" + trgEdgeName);
                }
                console.log(edgesL);

                if(vertexR) {
                    for (var k = 0; k < vertexR.length; ++k) {
                        var nodeName = vertexR[k].name;
                        var nodeType = vertexR[k].type;

                        var trgNodeName = getNodeImageFromConstriant(theConst, nodeType);
                        vertexR[k].trgNode = trgNodeName;
                        console.log(nodeName + "\t" + nodeType + "\t" + trgNodeName);
                    }
                    for (var k = 0; k < edgesR.length; ++k) {
                        var edgeName = edgesR[k].name;
                        var edgeType = edgesR[k].type;

                        var trgEdgeName = getEdgeImageFromConstriant(theConst, edgeType);
                        edgesR[k].trgEdge = trgEdgeName;
                        console.log(edgeName + "\t" + edgeType + "\t" + trgEdgeName);
                    }
                    console.log(edgesR);
                }

                if(vertexNegR) {
                    for (var k = 0; k < vertexNegR.length; ++k) {
                        var nodeName = vertexNegR[k].name;
                        var nodeType = vertexNegR[k].type;

                        var trgNodeName = getNodeImageFromConstriant(theConst, nodeType);
                        vertexNegR[k].trgNode = trgNodeName;
                        console.log(nodeName + "\t" + nodeType + "\t" + trgNodeName);
                    }
                    for (var k = 0; k < edgesNegR.length; ++k) {
                        var edgeName = edgesNegR[k].name;
                        var edgeType = edgesNegR[k].type;

                        var trgEdgeName = getEdgeImageFromConstriant(theConst, edgeType);
                        edgesNegR[k].trgEdge = trgEdgeName;
                        console.log(edgeName + "\t" + edgeType + "\t" + trgEdgeName);
                    }
                    console.log(edgesNegR);
                }


                // sort vertexL, vertexR, vertexNegR, etc based on trgNode..

                sortBasedOnTrgNode(vertexL);
                sortBasedOnTrgNode(vertexR);
                sortBasedOnTrgNode(vertexNegR);

                sortBasedOnTrgEdge(edgesL);
                sortBasedOnTrgEdge(edgesR);
                sortBasedOnTrgEdge(edgesNegR);

                sortBasedOnType(vertexRuleX);
                sortBasedOnType(vertexRuleL);
                sortBasedOnType(vertexRuleK);
                sortBasedOnType(vertexRuleR);

                sortBasedOnType(edgesRuleX);
                sortBasedOnType(edgesRuleL);
                sortBasedOnType(edgesRuleK);
                sortBasedOnType(edgesRuleR);

                /* If r creates an element x that partially matches with the condition pattern of gc */
                console.log("vertexL");
                console.log(vertexL);
                var cond1Flag = false;
                for(var k = 0; k < vertexRuleR.length; ++k){
                    if(vertexRuleR[k].createTag === true){
                        for(var m = 0; m < vertexL.length; ++m){
                            if(vertexRuleR[k].type === vertexL[m].trgNode){
                                cond1Flag = true;
                                break;
                            }
                        }
                        if(cond1Flag === true)
                            break;
                    }
                }

                console.log("cond1Flag :: " + cond1Flag);

                console.log("edgesL");
                console.log(edgesL);
                var cond1FlagE = false;
                for(var k = 0; k < edgesRuleR.length; ++k){
                    if(edgesRuleR[k].createTag === true){
                        for(var m = 0; m < edgesL.length; ++m){
                            if(edgesRuleR[k].type === edgesL[m].trgEdge){
                                cond1FlagE = true;
                                break;
                            }
                        }
                        if(cond1FlagE === true)
                            break;
                    }
                }
                console.log("cond1FlagE :: " + cond1FlagE);


                if((cond1Flag === true || cond1FlagE === true) && vertexR) {
                    /* r produces a match with the required pattern of gc */
                    /* find an injective match of vertexR & edgesR to vertexRuleR & edgesRuleR */
                    conformanceFlag = false;
                    matchFlag = false;
                    PC1_1_Nodes(0, 0, vertexL, edgesL,  vertexR, edgesR, vertexRuleR, edgesRuleR);
                    console.log("(PC1_1):: matchCount1 " + matchCount1 + " matchCount2 " + matchCount2);
                    if(matchCount1 > 0 && matchCount1 == matchCount2) {
                        matchFlag = true;
                        conformanceFlag = true;
                    }
                    else
                        matchFlag = false;

                    if(  matchFlag == false && vertexRuleX){
                        PC1_2_Nodes(0, 0, vertexL, edgesL, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR);
                        console.log("matchFlag (PC1_2):: " + matchFlag);
                        if(matchFlag) conformanceFlag = true;
                    }

                }


                /* If r creates an element x that partially matches with the forbidden pattern of gc */
                console.log("vertexNegR");
                console.log(vertexNegR);
                if( conformanceFlag == true && vertexNegR) {
                    var cond3Flag = false;
                    for (var k = 0; k < vertexRuleR.length; ++k) {
                        if (vertexRuleR[k].createTag === true) {
                            for (var m = 0; m < vertexNegR.length; ++m) {
                                if (vertexRuleR[k].type === vertexNegR[m].trgNode) {
                                    cond3Flag = true;
                                    break;
                                }
                            }
                            if (cond3Flag === true)
                                break;
                        }
                    }

                    console.log("cond3Flag :: " + cond3Flag);

                    var cond3FlagE = false;
                    for(var k = 0; k < edgesRuleR.length; ++k){
                        if(edgesRuleR[k].createTag === true){
                            for(var m = 0; m < edgesNegR.length; ++m){
                                if(edgesRuleR[k].type === edgesNegR[m].trgEdge){
                                    cond3FlagE = true;
                                    break;
                                }
                            }
                            if(cond3FlagE === true)
                                break;
                        }
                    }
                    console.log("cond3FlagE :: " + cond3FlagE);
                    if(cond3Flag === true || cond3FlagE === true) {
                        /* r has a NAC that forbids the existence of a forbidden pattern of gc */
                        /* find an injective match of vertexNegR & edgesNegR to vertexRuleX & edgesRuleX */
                        matchFlag = false;
                        conformanceFlag = false;

                        PC3_1_Nodes(0, 0, vertexNegR, edgesNegR, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR);
                        console.log("matchFlag (PC3_1):: " + matchFlag);
                        if(matchFlag) conformanceFlag = true;
                    }
                } // end if(vertexNegR)


                /* If r deletes an element y that partially matches with the required pattern of gc */
                /* todo: y in R \ L */
                console.log("Processing P2#");
                if(conformanceFlag == true && vertexR) {
                    console.log("vertexR");
                    console.log(vertexR);
                    var cond2Flag = false;
                    for (var k = 0; k < vertexRuleL.length; ++k) {
                        if (vertexRuleL[k].deleteTag === true) {
                            for (var m = 0; m < vertexR.length; ++m) {
                                if (vertexRuleL[k].type === vertexR[m].trgNode) {
                                    cond2Flag = true;
                                    break;
                                }
                            }
                            if (cond2Flag === true)
                                break;
                        }
                    }

                    console.log("cond2Flag :: " + cond2Flag);

                    console.log("edgesR");
                    console.log(edgesR);
                    var cond2FlagE = false;
                    for (var k = 0; k < edgesRuleL.length; ++k) {
                        if (edgesRuleL[k].deleteTag === true) {
                            for (var m = 0; m < edgesL.length; ++m) {
                                if (edgesRuleL[k].type === edgesR[m].trgEdge) {
                                    cond2FlagE = true;
                                    break;
                                }
                            }
                            if (cond2FlagE === true)
                                break;
                        }
                    }
                    console.log("cond2FlagE :: " + cond2FlagE);


                    if ((cond2Flag === true || cond2FlagE === true) && vertexR) {
                        /* r removes an existing match of a required pattern of gc but produces another for replacement */
                        /* find an injective match of vertexR & edgesR to vertexRuleL & edgesRuleL */
                        conformanceFlag = false;
                        matchFlag = false;
                        quit = false;
                        matchCount1 = 0; matchCount2 = 0;
                        PC2_1_Nodes(0, 0, vertexL, edgesL,  vertexR, edgesR, vertexRuleL, edgesRuleL, vertexRuleR, edgesRuleR);
                        console.log("matchFlag (PC2_1):: " + matchFlag);
                        console.log("matchcount1 :: " + matchCount1 + " matchcount2 :: " + matchCount2);
                        console.log("quitFlag :: " + quit);
                        if( matchCount1 > 0 &&  matchCount1 == matchCount2) {
                            matchFlag = true;
                            conformanceFlag = true;
                        }
                        else
                            matchFlag = false;
                        if ( matchFlag == false && vertexRuleX) {
                            /* r removes a match with the required pattern of gc; r has a NAC that forbids the existence of a condition pattern of gc
                             */
                            PC1_2_Nodes(0, 0, vertexL, edgesL, vertexRuleX, edgesRuleX, vertexRuleL, edgesRuleL,vertexRuleR, edgesRuleR);
                            console.log("matchFlag (PC2_2):: " + matchFlag);
                            if(matchFlag) conformanceFlag = true;
                        }
                    }
                } // end if(vertexR)

                if(conformanceFlag == false)
                    break;
            }
            if(conformanceFlag == false)
                break;
        }

        if(conformanceFlag)
            console.log("Rule " + theRule.name + " is conformant");
        else
            console.log("Rule " + theRule.name + " is not conformant");
    }
    console.log("done with conformance checking...")
}


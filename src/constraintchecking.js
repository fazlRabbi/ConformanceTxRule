/**
 * Created by rabbi on 2018-03-19.
 */



function addConstraintIntoViolatedList(){
    var i = 0
    for(; i < violatedConstraints.length; ++i){
        if(violatedConstraints[i] == theConst)
            return;
    }
    violatedConstraints[i] = theConst;
}


function checkConstraints(){
    console.log("Inside checkConstraints() ");

    for(var i = 0; i < constraints.length; ++i){
        theConst = constraints[i];
        console.log(theConst.name);

        thePredicate = getPredicateByName(theConst.srcPredicate);
        console.log(thePredicate.name);

        for(var j = 0; j < thePredicate.semantics.length; ++j){
            var theSemantic = thePredicate.semantics[j];
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

            /* Find injective match from the graph constraints to the instance */

            findInjectiveMatchForNodes_L(vertexL, edgesL, 0, 0, vertexR, edgesR, vertexNegR, edgesNegR);
        }
    }

    console.log("\nViolated constraints::")
    for(var i = 0; i < violatedConstraints.length; ++i){
        console.log(violatedConstraints[i].name);
    }
}

function isDuplicateNodeInstance(vertices, index_pred_Node, newEntry){
    for(var i = 0; i < index_pred_Node; ++i){
        if(vertices[i].nodeInstance === newEntry)
            return true;
    }
    return false;
}

function isDuplicateEdgeInstance(edges, index_pred_Edge, newEntry){
    for(var i = 0; i < index_pred_Edge; ++i){
        if(edges[i].edgeInstance === newEntry)
            return true;
    }
    return false;
}

function findInjectiveMatchForNodes_L(vertices, edges, index_pred_Node, index_instance_Node, vertexR, edgesR, vertexNegR, edgesNegR){

    if(index_pred_Node >= vertices.length){
        // check for edges.
        console.log(vertices);
        findInjectiveMatchForEdges_L(vertices, edges, 0, 0, vertexR, edgesR, vertexNegR, edgesNegR);
        return;
    }
    if(index_instance_Node >= instance.vertex.length)
        return;

    var nextIndex = index_instance_Node + 1;
    findInjectiveMatchForNodes_L(vertices, edges, index_pred_Node, nextIndex, vertexR, edgesR, vertexNegR, edgesNegR);

    if(vertices[index_pred_Node].trgNode === instance.vertex[index_instance_Node].type){
        if(!isDuplicateNodeInstance(vertices, index_pred_Node, instance.vertex[index_instance_Node].name)) {
            vertices[index_pred_Node].nodeInstance = instance.vertex[index_instance_Node].name;
            index_pred_Node++;
            findInjectiveMatchForNodes_L(vertices, edges, index_pred_Node, nextIndex, vertexR, edgesR, vertexNegR, edgesNegR);
        }
    }
}


function findInjectiveMatchForEdges_L(vertices, edges, index_pred_Edge, index_instance_Edge, vertexR, edgesR, vertexNegR, edgesNegR){


    if(index_pred_Edge >= edges.length){
        console.log("\nFound match with PRECONDITION");
        console.log(edges);
        /* copy mappings from L to R */
        if(vertexR) {
            for (var k = 0; k < vertexR.length; ++k) {
                    vertexR[k].nodeInstance = null;
            }
            for (var j = 0; j < vertices.length; ++j) {
                for (var k = 0; k < vertexR.length; ++k) {
                    if (vertices[j].name === vertexR[k].name && vertices[j].type === vertexR[k].type) {
                        vertexR[k].nodeInstance = vertices[j].nodeInstance;
                        break;
                    }
                }
            }

            for (var k = 0; k < edgesR.length; ++k) {
                edgesR[k].edgeInstance = null;
            }
            for (var j = 0; j < edges.length; ++j) {
                for (var k = 0; k < edgesR.length; ++k) {
                    if (edges[j].name === edgesR[k].name && edges[j].type === edgesR[k].type &&
                        edges[j].src == edgesR[k].src && edges[j].trg === edgesR[k].trg ) {
                        edgesR[k].edgeInstance = edges[j].edgeInstance;
                        break;
                    }
                }
            }
            requiredPatternFlag = false;
            findInjectiveMatchForNodes_R(vertices, edges, vertices.length, 0, vertexR, edgesR);
            if (requiredPatternFlag)
                console.log("\nConstraint satisfied for predicate " + thePredicate.name + ". Found match with the REQUIRED PATTERN");
            else {
                console.log("\nConstraint is not satisfied for predicate " + thePredicate.name + ". No match found with the REQUIRED PATTERN");
                console.log(vertexR);
                console.log(edgesR);
                addConstraintIntoViolatedList();
            }
            return;
        }
        if(vertexNegR){
            for (var k = 0; k < vertexNegR.length; ++k) {
                    vertexNegR[k].nodeInstance = null;
            }
            for (var j = 0; j < vertices.length; ++j) {
                for (var k = 0; k < vertexNegR.length; ++k) {
                    if (vertices[j].name === vertexNegR[k].name && vertices[j].type === vertexNegR[k].type) {
                        vertexNegR[k].nodeInstance = vertices[j].nodeInstance;
                        break;
                    }
                }
            }

            for (var k = 0; k < edgesNegR.length; ++k) {
                    edgesNegR[k].edgeInstance = null;
            }
            for (var j = 0; j < edges.length; ++j) {
                for (var k = 0; k < edgesNegR.length; ++k) {
                    if (edges[j].name === edgesNegR[k].name && edges[j].type === edgesNegR[k].type &&
                        edges[j].src === edgesNegR[k].src && edges[j].trg === edgesNegR[k].trg) {
                        edgesNegR[k].edgeInstance = edges[j].edgeInstance;
                        break;
                    }
                }
            }
            requiredPatternFlag = false;

            console.log("before calling findInjectiveMatchForNodes_NegR");
            console.log(edgesNegR);
            findInjectiveMatchForNodes_NegR(vertices, edges, vertices.length, 0, vertexNegR, edgesNegR);
            console.log(requiredPatternFlag);
            if (requiredPatternFlag === false)
                console.log("\nConstraint satisfied for predicate " + thePredicate.name + ". No match found with the FORBIDDEN PATTERN");
            else {
                console.log("\nConstraint is not satisfied for predicate " + thePredicate.name + ". Found match with the FORBIDDEN PATTERN");
                console.log(vertexNegR);
                console.log(edgesNegR);
                addConstraintIntoViolatedList();
            }
        }
        return;
    }

    if(index_instance_Edge >= instance.edges.length)
        return;

    var nextIndex = index_instance_Edge + 1;
    findInjectiveMatchForEdges_L(vertices, edges, index_pred_Edge, nextIndex, vertexR, edgesR, vertexNegR, edgesNegR);

    if(edges[index_pred_Edge].trgEdge === instance.edges[index_instance_Edge].type){

        var srcNode = edges[index_pred_Edge].src;
        var trgNode = edges[index_pred_Edge].trg;
        var srcInstance, trgInstance;
        for(var j = 0; j < vertices.length; ++j){
            if(vertices[j].name === srcNode)
                srcInstance = vertices[j].nodeInstance;

            if(vertices[j].name === trgNode)
                trgInstance = vertices[j].nodeInstance;
        }

        if(srcInstance === instance.edges[index_instance_Edge].src && trgInstance === instance.edges[index_instance_Edge].trg) {
            if (!isDuplicateEdgeInstance(edges, index_pred_Edge, instance.edges[index_instance_Edge].name)) {
                edges[index_pred_Edge].edgeInstance = instance.edges[index_instance_Edge].name;
                index_pred_Edge++;
                findInjectiveMatchForEdges_L(vertices, edges, index_pred_Edge, nextIndex, vertexR, edgesR, vertexNegR, edgesNegR);
            }
        }
    }
}


function findInjectiveMatchForNodes_R(vertices, edges, index_pred_Node, index_instance_Node, vertexR, edgesR){

    if(index_pred_Node >= vertexR.length){
        console.log("check for edges...");
        console.log(vertices);
        findInjectiveMatchForEdges_R(vertices, edges, edges.length, 0, vertexR, edgesR);
        return;
    }

    if(index_instance_Node >= instance.vertex.length)
        return;

    var nextIndex = index_instance_Node + 1;
    findInjectiveMatchForNodes_R(vertices, edges, index_pred_Node, nextIndex, vertexR, edgesR);

    if(requiredPatternFlag)
        return;
    if(vertexR[index_pred_Node].trgNode === instance.vertex[index_instance_Node].type){
        if(!isDuplicateNodeInstance(vertexR, index_pred_Node, instance.vertex[index_instance_Node].name)) {
            vertexR[index_pred_Node].nodeInstance = instance.vertex[index_instance_Node].name;
            index_pred_Node++;
            findInjectiveMatchForNodes_R(vertices, edges, index_pred_Node, nextIndex, vertexR, edgesR);
        }
    }
}

function findInjectiveMatchForEdges_R(vertices, edges, index_pred_Edge, index_instance_Edge, vertexR, edgesR){

    if(index_pred_Edge >= edgesR.length){
        requiredPatternFlag = true;
        console.log(edges);
        return;
    }

    if(index_instance_Edge >= instance.edges.length)
        return;

    var nextIndex = index_instance_Edge + 1;
    findInjectiveMatchForEdges_R(vertices, edges, index_pred_Edge, nextIndex, vertexR, edgesR);
    if(requiredPatternFlag)
        return;
    if(edgesR[index_pred_Edge].trgEdge === instance.edges[index_instance_Edge].type){
        var srcNode = edgesR[index_pred_Edge].src;
        var trgNode = edgesR[index_pred_Edge].trg;
        var srcInstance, trgInstance;
        for(var j = 0; j < vertexR.length; ++j){
            if(vertexR[j].name === srcNode)
                srcInstance = vertexR[j].nodeInstance;

            if(vertexR[j].name === trgNode)
                trgInstance = vertexR[j].nodeInstance;
        }

        if(srcInstance === instance.edges[index_instance_Edge].src && trgInstance === instance.edges[index_instance_Edge].trg) {
            if(!isDuplicateEdgeInstance(edgesR, index_pred_Edge, instance.edges[index_instance_Edge].name)) {
                edgesR[index_pred_Edge].edgeInstance = instance.edges[index_instance_Edge].name;
                index_pred_Edge++;
                findInjectiveMatchForEdges_R(vertices, edges, index_pred_Edge, nextIndex, vertexR, edgesR);
            }
        }
    }
}

function findInjectiveMatchForNodes_NegR(vertices, edges, index_pred_Node, index_instance_Node, vertexNegR, edgesNegR){

    if(index_pred_Node >= vertexNegR.length){
        console.log("findInjectiveMatchForNodes_NegR  edges.length = " + edges.length);
        console.log(vertexNegR);
        console.log(edgesNegR);
        findInjectiveMatchForEdges_NegR(edges.length, 0, vertexNegR, edgesNegR);
        return;
    }

    if(index_instance_Node >= instance.vertex.length)
        return;

    var nextIndex = index_instance_Node + 1;
    findInjectiveMatchForNodes_NegR(vertices, edges, index_pred_Node, nextIndex, vertexNegR, edgesNegR);

    if(requiredPatternFlag)
        return;
    if(vertexNegR[index_pred_Node].trgNode === instance.vertex[index_instance_Node].type){
        if(!isDuplicateNodeInstance(vertexNegR, index_pred_Node, instance.vertex[index_instance_Node].name)) {
            vertexNegR[index_pred_Node].nodeInstance = instance.vertex[index_instance_Node].name;
            index_pred_Node++;
            findInjectiveMatchForNodes_NegR(vertices, edges, index_pred_Node, nextIndex, vertexNegR, edgesNegR);
        }
    }
}

function findInjectiveMatchForEdges_NegR(index_pred_Edge, index_instance_Edge, vertexNegR, edgesNegR){

    if(index_pred_Edge >= edgesNegR.length){
        requiredPatternFlag = true;
        console.log("findInjectiveMatchForEdges_NegR");
        console.log(edgesNegR);
        return;
    }

    if(index_instance_Edge >= instance.edges.length)
        return;

    var nextIndex = index_instance_Edge + 1;
    findInjectiveMatchForEdges_NegR(index_pred_Edge, nextIndex, vertexNegR, edgesNegR);
    if(requiredPatternFlag)
        return;
    if(edgesNegR[index_pred_Edge].trgEdge === instance.edges[index_instance_Edge].type){
        var srcNode = edgesNegR[index_pred_Edge].src;
        var trgNode = edgesNegR[index_pred_Edge].trg;
        var srcInstance, trgInstance;
        for(var j = 0; j < vertexNegR.length; ++j){
            if(vertexNegR[j].name === srcNode)
                srcInstance = vertexNegR[j].nodeInstance;

            if(vertexNegR[j].name === trgNode)
                trgInstance = vertexNegR[j].nodeInstance;
        }

        if(srcInstance === instance.edges[index_instance_Edge].src && trgInstance === instance.edges[index_instance_Edge].trg) {
            if(!isDuplicateEdgeInstance(edgesNegR, index_pred_Edge, instance.edges[index_instance_Edge].name)) {
                edgesNegR[index_pred_Edge].edgeInstance = instance.edges[index_instance_Edge].name;
                index_pred_Edge++;
                findInjectiveMatchForEdges_NegR(index_pred_Edge, nextIndex, vertexNegR, edgesNegR);
            }
        }
    }
}
/**
 * Created by rabbi on 2018-03-19.
 */

var theRule = null;

function copyMappings(vertex1, edges1, vertex2, edges2){
    if(vertex2) {
        for (var i = 0; i < vertex2.length; ++i) {
            vertex2[i].nodeInstance = null;
        }
        for (var j = 0; j < vertex1.length; ++j) {
            for (var k = 0; k < vertex2.length; ++k) {
                if (vertex1[j].name === vertex2[k].name && vertex1[j].type === vertex2[k].type) {
                    vertex2[k].nodeInstance = vertex1[j].nodeInstance;
                    break;
                }
            }
        }

        for (var k = 0; k < edges2.length; ++k) {
            edges2[k].edgeInstance = null;
        }
        for (var j = 0; j < edges1.length; ++j) {
            for (var k = 0; k < edges2.length; ++k) {
                if (edges1[j].name === edges2[k].name && edges1[j].type === edges2[k].type &&
                    edges1[j].src == edges2[k].src && edges1[j].trg === edges2[k].trg ) {
                    edges2[k].edgeInstance = edges1[j].edgeInstance;
                    break;
                }
            }
        }
    }
}

function obtainD(vertexL, edgesL, vertexK, edgesK){

    var vertexD = [];
    var edgesD = [];
    var index = 0;
    for(var i = 0; i < instance.vertex.length; ++i){
        // find it in K
        var foundinKflag = false;
        for(var j = 0; j < vertexK.length; ++j){
            if(vertexK[j].nodeInstance === instance.vertex[i].name){
                foundinKflag = true;
                break;
            }
        }

        // find it in L
        var foundinLflag = false;
        for(var j = 0; j < vertexL.length; ++j){
            if(vertexL[j].nodeInstance === instance.vertex[i].name){
                foundinLflag = true;
                break;
            }
        }

        // insert into D if not found in L  OR if found in K
        if(foundinLflag == false || foundinKflag == true)
            vertexD[index++] = { name: instance.vertex[i].name , type: instance.vertex[i].type};
    }
    index = 0;
    for(var i = 0; i < instance.edges.length; ++i){
        // find it in K
        var foundinKflag = false;
        for(var j = 0; j < edgesK.length; ++j){
            if(edgesK[j].edgeInstance === instance.edges[i].name){
                foundinKflag = true;
                break;
            }
        }

        // find it in L
        var foundinLflag = false;
        for(var j = 0; j < edgesL.length; ++j){
            if(edgesL[j].edgeInstance === instance.edges[i].name){
                foundinLflag = true;
                break;
            }
        }

        // insert into D if not found in L  OR if found in K
        if(foundinLflag == false || foundinKflag == true)
            edgesD[index++] = { name: instance.edges[i].name , src: instance.edges[i].src, trg: instance.edges[i].trg, type: instance.edges[i].type};
    }
    var D = {vertex: vertexD, edges: edgesD};
    console.log("\nOriginal instance::");
    console.log(instance);
    console.log("\nObtained D::");
    console.log(D);
    return D;
}

var nameId = 0;
var edgeId = 0;

function obtainH(vertexR, edgesR){

    var vertexH = [];
    var edgesH = [];
    var index = instance.vertex.length;
    for(var i = 0; i < vertexR; ++i) {
        if(vertexR[i].nodeInstance == null){
            var newName = vertexR[i].name + "_" + nameId;
            instance.vertex[index++] = {name: newName, type: vertexR[i].type };
            vertexR[i].nodeInstance = newName;
            nameId++;
        }
    }
    index = instance.edges.length;
    for(var i = 0; i < edgesR.length; ++i) {
        if(edgesR[i].edgeInstance == null){
            var srcNode = edgesR[i].src;
            var trgNode = edgesR[i].trg;
            var srcInstance, trgInstance;
            for(var j = 0; j < vertexR.length; ++j){
                if(vertexR[j].name === srcNode)
                    srcInstance = vertexR[j].nodeInstance;

                if(vertexR[j].name === trgNode)
                    trgInstance = vertexR[j].nodeInstance;
            }

            instance.edges[index++] = {name: edgesR[i].name + "_" + edgeId, src: srcInstance, trg: trgInstance, type: edgesR[i].type };
            edgeId++;
        }
    }

    console.log("\nObtained H::");
    console.log(instance);
    return instance;
}


function transform(){
    console.log("Inside transform() ");

    for(var i = 0; i < rules.length; ++i){
        theRule = rules[i];
        console.log(theRule.name);

        var X = theRule.X;
        var L = theRule.L;
        var K = theRule.K;
        var R = theRule.R;

        var vertexX = X.vertex;
        var edgesX = X.edges;
        var vertexL = L.vertex;
        var edgesL = L.edges;
        var vertexK = K.vertex;
        var edgesK = K.edges;
        var vertexR = R.vertex;
        var edgesR = R.edges;

        /* Find injective match of the LHS to the instance */
        findInjectiveMatchForNodes_LHS(0, 0, vertexX, edgesX, vertexL, edgesL, vertexK, edgesK, vertexR, edgesR);
    }
}

function isDuplicateNodeMapping(vertices, index_pred_Node, newEntry){
    for(var i = 0; i < index_pred_Node; ++i){
        if(vertices[i].nodeInstance === newEntry)
            return true;
    }
    return false;
}

function isDuplicateEdgeMapping(edges, index_pred_Edge, newEntry){
    for(var i = 0; i < index_pred_Edge; ++i){
        if(edges[i].edgeInstance === newEntry)
            return true;
    }
    return false;
}

function findInjectiveMatchForNodes_LHS(index_pred_Node, index_instance_Node, vertexX, edgesX, vertexL, edgesL, vertexK, edgesK, vertexR, edgesR){

    if(index_pred_Node >= vertexL.length){
        // check for edges.
        console.log(vertexL);
        findInjectiveMatchForEdges_LHS( 0, 0, vertexX, edgesX, vertexL, edgesL, vertexK, edgesK, vertexR, edgesR);
        return;
    }
    if(index_instance_Node >= instance.vertex.length)
        return;

    var nextIndex = index_instance_Node + 1;
    findInjectiveMatchForNodes_LHS(index_pred_Node, nextIndex, vertexX, edgesX, vertexL, edgesL, vertexK, edgesK, vertexR, edgesR);

    if(vertexL[index_pred_Node].type === instance.vertex[index_instance_Node].type){
        if(!isDuplicateNodeMapping(vertexL, index_pred_Node, instance.vertex[index_instance_Node].name)) {
            vertexL[index_pred_Node].nodeInstance = instance.vertex[index_instance_Node].name;
            index_pred_Node++;
            findInjectiveMatchForNodes_LHS(index_pred_Node, nextIndex, vertexX, edgesX, vertexL, edgesL, vertexK, edgesK, vertexR, edgesR);
        }
    }
}


function findInjectiveMatchForEdges_LHS(index_pred_Edge, index_instance_Edge, vertexX, edgesX, vertexL, edgesL, vertexK, edgesK, vertexR, edgesR){


    if(index_pred_Edge >= edgesL.length){
        console.log("\nFound match with LHS");
        console.log(edgesL);
        /* copy mappings from L to X */
        copyMappings(vertexL, edgesL, vertexX, edgesX);
        /* check for the satisfaction of the negative application condition */


        copyMappings(vertexL, edgesL, vertexK, edgesK);

        copyMappings(vertexL, edgesL, vertexR, edgesR);

        instance = obtainD(vertexL, edgesL, vertexK, edgesK);
        obtainH( vertexR, edgesR);



        return;
    }

    if(index_instance_Edge >= instance.edges.length)
        return;

    var nextIndex = index_instance_Edge + 1;
    findInjectiveMatchForEdges_LHS( index_pred_Edge, nextIndex, vertexX, edgesX, vertexL, edgesL, vertexK, edgesK, vertexR, edgesR);

    if(edgesL[index_pred_Edge].type === instance.edges[index_instance_Edge].type){

        var srcNode = edgesL[index_pred_Edge].src;
        var trgNode = edgesL[index_pred_Edge].trg;
        var srcInstance, trgInstance;
        for(var j = 0; j < vertexL.length; ++j){
            if(vertexL[j].name === srcNode)
                srcInstance = vertexL[j].nodeInstance;

            if(vertexL[j].name === trgNode)
                trgInstance = vertexL[j].nodeInstance;
        }

        if(srcInstance === instance.edges[index_instance_Edge].src && trgInstance === instance.edges[index_instance_Edge].trg) {
            if (!isDuplicateEdgeMapping(edgesL, index_pred_Edge, instance.edges[index_instance_Edge].name)) {
                edgesL[index_pred_Edge].edgeInstance = instance.edges[index_instance_Edge].name;
                index_pred_Edge++;
                findInjectiveMatchForEdges_LHS( index_pred_Edge, nextIndex, vertexX, edgesX, vertexL, edgesL, vertexK, edgesK, vertexR, edgesR);
            }
        }
    }
}



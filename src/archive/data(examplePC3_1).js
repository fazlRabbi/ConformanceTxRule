/**
 * Created by rabbi on 2018-03-19.
 */


var model = {
    vertex: [
        {name: "A"},
        {name: "B"},
        {name: "C"},
        {name: "D"},
        {name: "E"},
        {name: "F"}
    ],
    edges: [
        {name: "AB", src: "A", trg: "B"},
        {name: "AC", src: "A", trg: "C"},
        {name: "CB", src: "C", trg: "B"},
        {name: "AD", src: "A", trg: "D"},
        {name: "AF", src: "A", trg: "F"},
        {name: "AE", src: "A", trg: "E"},
        {name: "AB", src: "E", trg: "B"}
    ]
};

var instance = {
    vertex: [
        {name: "A1", type: "A"},
        //{name: "A2", type: "A"},
        {name: "B2", type: "B"},
        {name: "B1", type: "B"},
        {name: "C1", type: "C"}
    ],
    edges: [
        {name: "Relation1", src: "A1", trg: "B1", type: "rel1"},
        //{name: "Relation2", src: "A2", trg: "B2", type: "rel1"},
        {name: "Relation2", src: "B1", trg: "C1", type: "rel2"}
        //{name: "Relation3", src: "A1", trg: "C1", type: "rel3"}

    ]
};

var predicates = [
    {
        name: "test",
        arity: {
            vertex: [
                {name: "X"},
                {name: "Y"},
                {name: "Z"}
            ],
            edges: [
                {name: "f", src: "X", trg: "Y"},
                {name: "g", src: "X", trg: "Z"}
            ]
        },
        semantics: [
            {
                L: {
                    vertex: [
                        {name: "a", type: "X"},
                        {name: "d", type: "Y"}
                    ],
                    edges: [
                        {name: "e1", src: "a", trg: "d", type: "f"}
                    ]
                },
                R: {},
                NegR: {
                    vertex: [
                        {name: "a", type: "X"},
                        {name: "d", type: "Y"},
                        {name: "f", type: "Z"}
                    ],
                    edges: [
                        {name: "e1", src: "a", trg: "d", type: "f"},
                        {name: "e2", src: "a", trg: "f", type: "g"}
                    ]
                }
            }
        ]
    }
];

var constraints = [
    {
        name: "delta1",
        srcPredicate: "test",
        nodeMaps: [
            {src: "X", trg: "A"},
            {src: "Y", trg: "D"},
            {src: "Z", trg: "F"}
        ],
        edgeMaps: [
            {src: "f", trg: "AD"},
            {src: "g", trg: "AF"}
        ]
    }
];


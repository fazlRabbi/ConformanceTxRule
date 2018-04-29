/**
 * Created by rabbi on 2018-03-19.
 */


var model = {
    vertex: [
        {name: "A"},
        {name: "B"},
        {name: "C"},
        {name: "D"}
    ],
    edges: [
        {name: "AB", src: "A", trg: "B"},
        {name: "AC", src: "A", trg: "C"},
        {name: "CB", src: "C", trg: "B"},
        {name: "AD", src: "A", trg: "D"},
        {name: "DB", src: "D", trg: "B"}
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
                {name: "W"},
                {name: "X"},
                {name: "Y"},
                {name: "Z"}
            ],
            edges: [
                {name: "WX", src: "W", trg: "X"},
                {name: "WY", src: "W", trg: "Y"},
                {name: "XZ", src: "X", trg: "Z"}
            ]
        },
        semantics: [
            {
                L: {
                    vertex: [
                        {name: "a", type: "W"},
                        {name: "d", type: "X"},
                        {name: "c", type: "Y"}
                    ],
                    edges: [
                        {name: "ad", src: "a", trg: "d", type: "WX"},
                        {name: "ac", src: "a", trg: "c", type: "WY"}
                    ]
                },
                R: {
                    vertex: [
                        {name: "a", type: "W"},
                        {name: "d", type: "X"},
                        {name: "c", type: "Y"},
                        {name: "b", type: "Z"}
                    ],
                    edges: [
                        {name: "ad", src: "a", trg: "d", type: "WX"},
                        {name: "ac", src: "a", trg: "c", type: "WY"},
                        {name: "db", src: "d", trg: "b", type: "XZ"}
                    ]
                },
                NegR: {

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
            {src: "W", trg: "A"},
            {src: "X", trg: "D"},
            {src: "Y", trg: "C"},
            {src: "Z", trg: "B"}
        ],
        edgeMaps: [
            {src: "WX", trg: "AD"},
            {src: "WY", trg: "AC"},
            {src: "XZ", trg: "DB"}
        ]
    }
];


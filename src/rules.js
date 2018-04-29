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
            {src: "W", trg: "GV2"},
            {src: "X", trg: "GV3"},
            {src: "Y", trg: "GV0"},
            {src: "Z", trg: "GV1"}
        ],
        edgeMaps: [
            {src: "WX", trg: "GE1"},
            {src: "WY", trg: "GE2"},
            {src: "XZ", trg: "GE5"}
        ]
    }
];


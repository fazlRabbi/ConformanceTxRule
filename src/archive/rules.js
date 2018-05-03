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
                {name: "XY", src: "X", trg: "Y"},
                {name: "XZ", src: "X", trg: "Z"},
                {name: "YZ", src: "Y", trg: "Z"}
            ]
        },
        semantics: [
            {
                L: {
                    vertex: [
                        {name: "x", type: "X"},
                        {name: "y", type: "Y"},
                        {name: "z", type: "Z"}
                    ],
                    edges: [
                        {name: "xy", src: "x", trg: "y", type: "XY"},
                        {name: "xz", src: "x", trg: "z", type: "XZ"}
                    ]
                },
                R: {
                    vertex: [
                        {name: "x", type: "X"},
                        {name: "y", type: "Y"},
                        {name: "z", type: "Z"}
                    ],
                    edges: [
                        {name: "xy", src: "x", trg: "y", type: "XY"},
                        {name: "xz", src: "x", trg: "z", type: "XZ"},
                        {name: "yz", src: "y", trg: "z", type: "YZ"}
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
            {src: "X", trg: "GV2"},
            {src: "Y", trg: "GV0"},
            {src: "Z", trg: "GV1"}
        ],
        edgeMaps: [
            {src: "XY", trg: "GE2"},
            {src: "XZ", trg: "GE0"},
            {src: "YZ", trg: "GE5"}
        ]
    }
];

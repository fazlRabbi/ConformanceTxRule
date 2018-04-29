/**
 * Created by rabbi on 2018-03-19.
 */


var model = {
    vertex: [
        {name: "A"},
        {name: "B"},
        {name: "C"}
        ],
    edges: [
        {name: "rel1", src: "A", trg: "B"},
        {name: "rel2", src: "B", trg: "C"},
        {name: "rel3", src: "A", trg: "C"}

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
    name: "mult(1,1)",
    arity: {
        vertex: [
            {name: "X"},
            {name: "Y"}
        ],
        edges: [
            {name: "f", src: "X", trg: "Y"}
        ]
    },
    semantics: [
        {
            L: {
                vertex: [
                    {name: "x", type: "X"}
                ],
                edges: []
            },
            R: {
                vertex: [
                    {name: "x", type: "X"},
                    {name: "y", type: "Y"}
                ],
                edges: [
                    {name: "e1", src: "x", trg: "y", type: "f"}
                ]
            },
            NegR: {}
        },
        {
            L: {
                vertex: [
                    {name: "x", type: "X"},
                    {name: "y", type: "Y"}
                ],
                edges: [
                    {name: "e1", src: "x", trg: "y", type: "f"}
                ]
            },
            R: { },
            NegR: {
                vertex: [
                    {name: "x", type: "X"},
                    {name: "y", type: "Y"},
                    {name: "z", type: "Y"}
                ],
                edges: [
                    {name: "e1", src: "x", trg: "y", type: "f"},
                    {name: "e2", src: "x", trg: "z", type: "f"}
                ]
            }
        }
    ]
    },
    {
        name: "composite",
        arity: {
            vertex: [
                {name: "X"},
                {name: "Y"},
                {name: "Z"}
            ],
            edges: [
                {name: "f", src: "X", trg: "Y"},
                {name: "g", src: "Y", trg: "Z"},
                {name: "h", src: "X", trg: "Z"}
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
                        {name: "e1", src: "x", trg: "y", type: "f"},
                        {name: "e2", src: "y", trg: "z", type: "g"}
                    ]
                },
                R: {
                    vertex: [
                        {name: "x", type: "X"},
                        {name: "y", type: "Y"},
                        {name: "z", type: "Z"},
                    ],
                    edges: [
                        {name: "e1", src: "x", trg: "y", type: "f"},
                        {name: "e2", src: "y", trg: "z", type: "g"},
                        {name: "e3", src: "x", trg: "z", type: "h"}
                    ]
                },
                NegR: {}
            }
        ]
    }
];

var constraints = [
    {
        name: "delta1",
        srcPredicate: "mult(1,1)",
        nodeMaps: [
            {src: "X", trg: "A"},
            {src: "Y", trg: "B"}
        ],
        edgeMaps: [
            {src: "f", trg: "rel1"}
        ]
    },
    {
        name: "delta2",
        srcPredicate: "composite",
        nodeMaps: [
            {src: "X", trg: "A"},
            {src: "Y", trg: "B"},
            {src: "Z", trg: "C"}
        ],
        edgeMaps: [
            {src: "f", trg: "rel1"},
            {src: "g", trg: "rel2"},
            {src: "h", trg: "rel3"}
        ]
    }
];


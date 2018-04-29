
/**
 * Created by rabbi on 2018-03-19.
 */


var rules = [
    {
        name: "rule1",
        X: {
            vertex: [
                {name: "a", type: "A"},
                {name: "b", type: "B"},
                {name: "c", type: "C"}
            ],
            edges: [
                {name: "ab", src: "a", trg: "b", type: "rel1"},
                {name: "bc", src: "b", trg: "c", type: "rel2"},
                {name: "ac", src: "a", trg: "c", type: "rel3"}
            ]
        },
        L: {
            vertex: [
                {name: "a", type: "A"},
                {name: "b", type: "B"},
                {name: "c", type: "C"}
            ],
            edges: [
                {name: "ab", src: "a", trg: "b", type: "rel1"},
                {name: "bc", src: "b", trg: "c", type: "rel2"}
            ]
        },
        K: {
            vertex: [
                {name: "a", type: "A"},
                {name: "b", type: "B"},
                {name: "c", type: "C"}
            ],
            edges: [
                {name: "ab", src: "a", trg: "b", type: "rel1"},
                {name: "bc", src: "b", trg: "c", type: "rel2"}
            ]
        },
        R: {
            vertex: [
                {name: "a", type: "A"},
                {name: "b", type: "B"},
                {name: "c", type: "C"}
            ],
            edges: [
                {name: "ab", src: "a", trg: "b", type: "rel1"},
                {name: "bc", src: "b", trg: "c", type: "rel2"},
                {name: "ac", src: "a", trg: "c", type: "rel3"}
            ]
        }
    }
];


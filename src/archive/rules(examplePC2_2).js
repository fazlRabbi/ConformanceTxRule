/**
 * Created by rabbi on 2018-03-19.
 */



var rules = [
    {
        name: "rule1",
        X: {},
        L: {
            vertex: [
                {name: "1", type: "A"},
                {name: "2", type: "B"},
                {name: "3", type: "C"}
            ],
            edges: [
                {name: "12", src: "1", trg: "2", type: "AB"},
                {name: "13", src: "1", trg: "3", type: "AC"},
                {name: "32", src: "3", trg: "2", type: "CB"}
            ]
        },
        K: {
            vertex: [
                {name: "1", type: "A"},
                {name: "2", type: "B"}
            ],
            edges: [
            ]
        },
        R: {
            vertex: [
                {name: "1", type: "A"},
                {name: "2", type: "B"},
                {name: "4", type: "D"}
            ],
            edges: [
                {name: "14", src: "1", trg: "4", type: "AD"},
                {name: "42", src: "4", trg: "2", type: "DB"}
            ]
        }
    }
];


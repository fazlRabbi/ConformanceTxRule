/**
 * Created by rabbi on 2018-03-19.
 */



var rules = [
    {
        name: "rule1",
        X: {
            vertex: [
                {name: "1", type: "A"},
                {name: "2", type: "B"},
                {name: "3", type: "C"},
                {name: "4", type: "D"},
                {name: "6", type: "F"}
            ],
            edges: [
                {name: "12", src: "1", trg: "2", type: "AB"},
                {name: "13", src: "1", trg: "3", type: "AC"},
                {name: "14", src: "1", trg: "4", type: "AD"},
                {name: "16", src: "1", trg: "6", type: "AF"},
                {name: "32", src: "3", trg: "2", type: "CB"}
            ]

        },
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
                {name: "4", type: "D"},
                {name: "5", type: "E"}
            ],
            edges: [
                {name: "14", src: "1", trg: "4", type: "AD"},
                {name: "15", src: "1", trg: "5", type: "AE"},
                {name: "52", src: "5", trg: "2", type: "EB"}
            ]
        }
    }
];


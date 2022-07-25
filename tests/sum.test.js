import sum from "../src/components/utils/sum";

var input = [
    { amount: 0},
    { amount: 0},
    { amount: 0},
    { amount: 0},
    { amount: 0},
    { amount: 0},
]

test("sum of integers", async () => {
    input = [
        { amount: 10},
        { amount: 20},
        { amount: 30},
        { amount: 101},
        { amount: 200},
        { amount: 1234},
    ]
    const result = sum(input);
    expect(result).toBe(1595);
});

test("sum of decimals to 2dps", async () => {
    input = [
        { amount: 10.5},
        { amount: 19.5},
        { amount: 30.0},
        { amount: 101.4},
        { amount: 199.6},
        { amount: 1234},
    ]
    const result = sum(input);
    expect(result).toBeCloseTo(1595);
});

test("sum of big integers", async () => {
    input = [
        { amount: 10000},
        { amount: 20000},
        { amount: 3000000},
        { amount: 101.4},
        { amount: 199.6},
        { amount: 1234},
    ]
    const result = sum(input);
    expect(result).toBeCloseTo(3031535);
});

test("no input yey" , async () => {
    input = [
        { amount: null},
        { amount: null},
        { amount: null},
        { amount: null},
        { amount: null},
        { amount: null},
    ]
    
    const result = sum(input);
    expect(result).toBe(0);
});
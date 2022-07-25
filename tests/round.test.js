import to2dp from "../src/components/utils/round";

test("input 4dp", async () => {
    var input = 3.3462;
    const result = to2dp(input);
    expect(result).toBe(3.34);
});

test("input 3dp", async () => {
    var input = 3.346;
    const result = to2dp(input);
    expect(result).toBe(3.34);
});

test("input 2dp", async () => {
    var input = 3.35;
    const result = to2dp(input);
    expect(result).toBe(3.35);
});

test("input 1dp", async () => {
    var input = 3.5;
    const result = to2dp(input);
    expect(result).toBe(3.5);
});

test("input integer", async () => {
    var input = 35;
    const result = to2dp(input);
    expect(result).toBe(35);
});

test("input big integer", async () => {
    var input = 35123;
    const result = to2dp(input);
    expect(result).toBe(35123);
});

test("input big number with 4dp", async () => {
    var input = 35123.1234;
    const result = to2dp(input);
    expect(result).toBe(35123.12);
});

test("input zero", async () => {
    var input = 0;
    const result = to2dp(input);
    expect(result).toBe(0);
});
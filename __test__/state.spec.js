const State = require("../engine/state");
const _ = require("lodash");

const bottlesTest = [
    [
        [], 
        ["a", "b"], 
        ["a", "a"], 
        ["c", "c", "c"], 
        ['b' ,'a', 'b'],
        ['c']
    ],
    [
        ['b', 'a', 'a'],
        ['a', 'a']
    ]
];


describe("state test", () => {
  it("should create the state", () => {
    const state = new State();
    expect(state).toBeTruthy();
  });

  it.each`
    bottles                             | evaluation | numOfColor
    ${[]}                               | ${0}       | ${0}
    ${[[1]]}                            | ${1}       | ${1}
    ${[[1], [2], []]}                   | ${2}       | ${2}
    ${[[1, 2], [2, 1], []]}             | ${4}       | ${2}
    ${[[1, 1], [2, 3], [3, 2]]}         | ${5}       | ${3}
    ${[[], [], [1, 1], [1, 1]]}         | ${2}       | ${1}
    ${[[], [], ["a", "a"], ["a", "a"]]} | ${2}       | ${1}
    ${[[], [], ["a", "a"], ["b", "b"]]} | ${2}       | ${2}
  `(
    "should evaluate for $bottles with evaluation $evaluation",
    ({ bottles, evaluation, numOfColor }) => {
      const state = new State(bottles, numOfColor);
      expect(state.__evaluation()).toBe(evaluation);
    }
  );

  it.each`
    bottles                             | evaluation | numOfColor
    ${[]}                               | ${true}    | ${0}
    ${[[1]]}                            | ${true}    | ${1}
    ${[[1], [2], []]}                   | ${true}    | ${2}
    ${[[1, 2], [2, 1], []]}             | ${false}   | ${2}
    ${[[1, 1], [2, 3], [3, 2]]}         | ${false}   | ${3}
    ${[[], [], [1, 1], [1, 1]]}         | ${false}   | ${1}
    ${[[], [], ["a", "a"], ["a", "a"]]} | ${false}   | ${1}
    ${[[], [], ["a", "a"], ["b", "b"]]} | ${true}    | ${2}
  `(
    "should return if $bottles are winning or not with $evaluation",
    ({ bottles, evaluation, numOfColor }) => {
      const state = new State(bottles, numOfColor);
      expect(state.isWinning()).toBe(evaluation);
    }
  );

  it.each`
    index | result              |   size
    ${0}  | ${[]}               |   ${3}
    ${1}  | ${["b"]}            |   ${3}
    ${2}  | ${["a", "a"]}       |   ${3}
    ${3}  | ${["c", "c", "c"]}  |   ${3}
    ${4}  | ${['b']}            |   ${3}
    ${3}  | ${["c", "c"]}       |   ${2}
    ${3}  | ${["c"]}            |   ${1}
  `(
    "should get the top of the bottle with size $size by index $index to show $result",
    ({ index, result, size }) => {
      const state = new State(bottlesTest[0], 3);
      expect(state.__pop(index, size)).toEqual(result);
    }
  );

  it.each`
    base    |   target  |   done        |   testSample |   result
    ${0}    |   ${1}    |   ${false}    |   ${0}        |   ${null}
    ${1}    |   ${0}    |   ${true}     |   ${0}        |   ${[["b"], ["a"], ["a", "a"], ["c", "c", "c"], ['b' ,'a', 'b'], ['c']]}
    ${1}    |   ${3}    |   ${false}    |   ${0}        |   ${null}
    ${5}    |   ${3}    |   ${true}     |   ${0}        |   ${[[], ["a", "b"], ["a", "a"], ["c", "c", "c", "c"], ['b' ,'a', 'b'], []]}
    ${1}    |   ${0}    |   ${true}     |   ${1}        |   ${[['b', 'a', 'a', 'a'], ['a']]}
    ${0}    |   ${1}    |   ${true}     |   ${1}        |   ${[['b'],['a', 'a', 'a', 'a']]}

  `("should return $done when pouring from $base to $target", ({done, base, target, testSample, result}) => {
    const state = new State(bottlesTest[testSample], 3);
    state.bottleSize = 4;
    const action = state.pour(base, target)
    expect(action.done).toBe(done);
    expect(_.get(action, 'state.bottles', null)).toEqual(result)
  });
});

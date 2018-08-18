function sortArray(size, arrayInString) {
  let array = arrayInString.split(' ').map(value => Number(value));

  let valueToBeSwapped = findElementToBeSwapped(size, array);
  if (valueToBeSwapped == null) {
    return {
      canBeSorted: false,
    };
  }

  let isSwapMethodWorking = swap(array, valueToBeSwapped);
  if (isSwapMethodWorking) {
    return {
      canBeSorted: true,
      method: 'swap',
      fromIndex: valueToBeSwapped.fromIndex + 1,
      toIndex: valueToBeSwapped.toIndex + 1,
    };
  } else {
    let isReverseMethodWorking = reverseSubArray(
      array,
      valueToBeSwapped.fromIndex,
      valueToBeSwapped.toIndex,
    );
    if (isReverseMethodWorking) {
      return {
        canBeSorted: true,
        method: 'reverse',
        fromIndex: valueToBeSwapped.fromIndex + 1,
        toIndex: valueToBeSwapped.toIndex + 1,
      };
    } else {
      return {
        canBeSorted: false,
      };
    }
  }
}

function reverseSubArray(array, fromIndex, toIndex) {
  let prev = array.slice(0, fromIndex);
  let next = array.slice(toIndex + 1, array.length);
  let sliced = array.slice(fromIndex, toIndex + 1);
  let reversed = [...sliced].reverse();

  return isSortedAscendingly([...prev, ...reversed, ...next]);
}

function swap(array, valueToBeSwapped) {
  let newArray = [...array];

  let temp = newArray[valueToBeSwapped.fromIndex];
  newArray[valueToBeSwapped.fromIndex] = newArray[valueToBeSwapped.toIndex];
  newArray[valueToBeSwapped.toIndex] = temp;

  return isSortedAscendingly(newArray);
}

function findElementToBeSwapped(size, array) {
  let numberToBeSwapped = null;

  for (let i = 0; i < size; i++) {
    if (i + 1 === size) {
      break;
    }

    let currentValue = array[i];
    let nextValueIndex = i + 1;
    let nextValue = array[nextValueIndex];

    if (currentValue > nextValue) {
      if (numberToBeSwapped == null) {
        numberToBeSwapped = {
          fromIndex: i,
          fromValue: currentValue,
          toIndex: nextValueIndex,
          toValue: nextValue,
        };
      } else if (nextValue < numberToBeSwapped.toValue) {
        numberToBeSwapped = {
          ...numberToBeSwapped,
          toIndex: nextValueIndex,
          toValue: nextValue,
        };
      }
    }
  }

  return numberToBeSwapped;
}

function isSortedAscendingly(array) {
  let sortedArray = [...array].sort((a, b) => a > b);
  let isSorted = true;

  for (let i = 0; i < array.length; i++) {
    if (array[i] !== sortedArray[i]) {
      isSorted = false;
      break;
    }
  }

  return isSorted;
}

// TEST CASES

let testCase1SortResult = sortArray(2, '4 2');
console.log(
  `should be able to sort array of [4 2]`,
  testCase1SortResult.canBeSorted === true,
);
console.log(
  `should be able to sort array of [4 2] with method 'swap'`,
  testCase1SortResult.method === 'swap',
);
console.log(
  `should be able to sort array of [4 2] by swapping index 1 with 2`,
  testCase1SortResult.fromIndex === 1 && testCase1SortResult.toIndex === 2,
);

console.log(
  '#####################################################################################',
);
let testCase2SortResult = sortArray(8, '4 2');
console.log(
  `should be able to sort array of [1 2 3 10 8 9 6 12]`,
  testCase2SortResult.canBeSorted === true,
);
console.log(
  `should be able to sort array of [1 2 3 10 8 9 6 12] with method 'swap'`,
  testCase2SortResult.method === 'swap',
);
console.log(
  `should be able to sort array of [1 2 3 10 8 9 6 12] by swapping index 4 with 7`,
  testCase2SortResult.fromIndex === 1 && testCase2SortResult.toIndex === 2,
);

console.log(
  '#####################################################################################',
);

let testCase3SortResult = sortArray(6, '1 5 4 3 2 6');
console.log(
  `should be able to sort array of [1 5 4 3 2 6]`,
  testCase3SortResult.canBeSorted === true,
);
console.log(
  `should be able to sort array of [1 5 4 3 2 6] with method 'reverse'`,
  testCase3SortResult.method === 'reverse',
);
console.log(
  `should be able to sort array of [1 5 4 3 2 6] by reversing sub array 2 with 5`,
  testCase3SortResult.fromIndex === 2 && testCase3SortResult.toIndex === 5,
);

console.log(
  '#####################################################################################',
);

let testCase4SortResult = sortArray(3, '3 1 2');
console.log(
  `should not be able to sort array of [3 1 2]`,
  testCase4SortResult.canBeSorted === false,
);

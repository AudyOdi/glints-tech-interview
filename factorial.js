function factorial(number) {
  if (number === 1) {
    return number;
  }

  return number * factorial(number - 1);
}

// TEST CASES
console.log('it should return 1 if given input is 1', factorial(1) === 1);
console.log('it should count the factorial of 3 correctly', factorial(3) === 6);
console.log(
  'it should count the factorial of 10 correctly',
  factorial(10) === 3628800,
);
console.log(
  'it should count the factorial of 25 correctly',
  factorial(25) === 15511210043330985984000000,
);

From the Map lib, the `Math.abs() method` can be used to return the absolute number value, be it negative or positive. 

<hr></hr>

<!> Always try to store up values in an array. And while doing that, use the `Map() method`, iterating through the array. 

The `Map() Method` generates another array with the original values but changing each item the way you want it. 

<hr></hr>

The `Reduce() Method` can reduce an array down to a unique value. An example of usage:
```js
const numbers = [1, 2, 3]
const sum = numbers.reduce((accumulator, number) => accumulator + number, 0)

sum
// the output would be '6'
```
As it goes iterating through the array, it stores up the value into the 'accumulator', which starts with it's value as '0' - referred at the end of the function, until summed up with the variable 'number'. It stores the value, and goes through with it on the function inside of the method, which goes summin up the 'accumulator' value with the 'number'.

<hr></hr>

The `Filter() Method`, similarly to the `Reduce()` and `Map()`, it's a high-order function. It receives an function as argument and runs it for each item in an array. An example of usage:
```js
const randomNumbers = [36, 99, 37, 63]
const numbersGreaterThan37 = randomNumbers.filter((item) => item > 37)

numbeersGreaterThan37
// the output would be '[99, 63]'
```
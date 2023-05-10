import { mySum } from "MySum"

const myArr = [1, 2, 3, 4, 5];
const result = mySum(...myArr);
console.log(result);

const mySecondArr = myArr.map((value) => value * 2);
const average = mySecondArr.reduce((acc, val) => acc + val, 0) / mySecondArr.length;
const filteredArr = mySecondArr.filter((value) => value > average);
console.log(filteredArr);

setTimeout(() => {
  console.log('Goodbye');
}, 3000);

const Employee = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  department: 'IT',
  startDate: '2022-01-01'
};

const { name, email } = Employee;
const Person = { name, email };
console.log(Person);
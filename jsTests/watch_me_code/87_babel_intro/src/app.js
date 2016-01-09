var arr = [1,2,3];
var squares = arr.map(x => x * x);
console.log(squares);


var obj = {
  first : 'Jerm',
  last : 'Law'
};

let { first: firstName, last: lastName } = obj;

console.log(firstName + ' ' + lastName);


var a = 'hello from the out side';

if( true ) {
  let a = 'hello from the inside';
  console.log(a);
}

console.log(a);


let [x,y] = ['a', 'b'];
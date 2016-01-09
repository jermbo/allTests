'use strict';

var arr = [1, 2, 3];
var squares = arr.map(function (x) {
  return x * x;
});
console.log(squares);

var obj = {
  first: 'Jerm',
  last: 'Law'
};

var firstName = obj.first;
var lastName = obj.last;

console.log(firstName + ' ' + lastName);

var a = 'hello from the out side';

if (true) {
  var _a = 'hello from the inside';
  console.log(_a);
}

console.log(a);

var x = 'a';
var y = 'b';
//# sourceMappingURL=all.js.map

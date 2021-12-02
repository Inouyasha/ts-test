class Person {
  // 可以在constructor中声明得以省略
  //   public name: string;
  //   public age: number;
  constructor(public name: string, public age: number) {}
}
const adam = new Person("Adam", 120);
console.log(adam.age, adam.name);

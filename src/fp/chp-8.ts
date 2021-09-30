class Container<T> {
  $value: T;

  constructor(x: T) {
    this.$value = x;
  }

  static of(x: any) {
    return new Container(x);
  }

  map<U>(f: (x: T) => U) {
    return Container.of(f(this.$value));
  }
}



console.log(Container.of(2).map((two) => two + 3));


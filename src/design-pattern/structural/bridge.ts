/**
 * The Abstraction defines the interface for the "control" part of the two class
 * hierarchies. It maintains a reference to an object of the Implementation
 * hierarchy and delegates all of the real work to this object.
 */
/**
 * 将m*n个class的类型转换为m+n个组合
 * 
 * 举一个例子 画笔的实现 如果是3种size和5种颜色，那么画笔会有对应15个子类 现在我们把颜色委托给interface实现（抽象出颜色的性质和接口，但是具体实现画笔类并不关心） 然后只用管理三个子类（对应size）
 * 子类种可以使用颜色接口种的方法
 * 
 * 此时3*5个子类变成可以用3+5个类实现 抽象时有点类似于抽象屏障，不用去关心抽象的实现，只关心抽象的接口
 */
 class Abstraction {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
      this.implementation = implementation;
  }

  public operation(): string {
      const result = this.implementation.operationImplementation();
      return `Abstraction: Base operation with:\n${result}`;
  }
}

/**
* You can extend the Abstraction without changing the Implementation classes.
*/
class ExtendedAbstraction extends Abstraction {
  public operation(): string {
      const result = this.implementation.operationImplementation();
      return `ExtendedAbstraction: Extended operation with:\n${result}`;
  }
}

/**
* The Implementation defines the interface for all implementation classes. It
* doesn't have to match the Abstraction's interface. In fact, the two
* interfaces can be entirely different. Typically the Implementation interface
* provides only primitive operations, while the Abstraction defines higher-
* level operations based on those primitives.
*/
interface Implementation {
  operationImplementation(): string;
}

/**
* Each Concrete Implementation corresponds to a specific platform and
* implements the Implementation interface using that platform's API.
*/
class ConcreteImplementationA implements Implementation {
  public operationImplementation(): string {
      return 'ConcreteImplementationA: Here\'s the result on the platform A.';
  }
}

class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
      return 'ConcreteImplementationB: Here\'s the result on the platform B.';
  }
}

/**
* Except for the initialization phase, where an Abstraction object gets linked
* with a specific Implementation object, the client code should only depend on
* the Abstraction class. This way the client code can support any abstraction-
* implementation combination.
*/
function bridgeClient(abstraction: Abstraction) {
  // ..

  console.log(abstraction.operation());

  // ..
}

/**
* The client code should be able to work with any pre-configured abstraction-
* implementation combination.
*/
let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
bridgeClient(abstraction);

console.log('');

implementation = new ConcreteImplementationB();
abstraction = new ExtendedAbstraction(implementation);
bridgeClient(abstraction);
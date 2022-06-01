/**
 * 模板方法模式
 * 
 * 该模式可以理解为将编程中的行为抽象为类的行为，具体如下：
 * 定义一个类对应一个处理流程，流程中会有共有的部分和非公共的部分，在定义时，我们定义一个抽象类AbstractClass，
 * 
    模板方法模式包含以下主要角色。
    1）抽象类/抽象模板（Abstract Class）
    抽象模板类，负责给出一个算法的轮廓和骨架。它由一个模板方法和若干个基本方法构成。这些方法的定义如下。

    ① 模板方法：定义了算法的骨架，按某种顺序调用其包含的基本方法。

    ② 基本方法：是整个算法中的一个步骤，包含以下几种类型。
    抽象方法：在抽象类中声明，由具体子类实现。
    具体方法：在抽象类中已经实现，在具体子类中可以继承或重写它。
    钩子方法：在抽象类中已经实现，包括用于判断的逻辑方法和需要子类重写的空方法两种。
    2）具体子类/具体实现（Concrete Class）
    具体实现类，实现抽象类中所定义的抽象方法和钩子方法，它们是一个顶级逻辑的一个组成步骤。
 * 
 * 流程对应模板方法，公共部分对应具体方法，动态部分对应抽象方法
 * 
 */


/**
 * The Abstract Class defines a template method that contains a skeleton of some
 * algorithm, composed of calls to (usually) abstract primitive operations.
 *
 * Concrete subclasses should implement these operations, but leave the template
 * method itself intact.
 */
 abstract class AbstractClass {
  /**
   * The template method defines the skeleton of an algorithm.
   */
  public templateMethod(): void {
      this.baseOperation1();
      this.requiredOperations1();
      this.baseOperation2();
      this.hook1();
      this.requiredOperation2();
      this.baseOperation3();
      this.hook2();
  }

  /**
   * These operations already have implementations.
   */
  protected baseOperation1(): void {
      console.log('AbstractClass says: I am doing the bulk of the work');
  }

  protected baseOperation2(): void {
      console.log('AbstractClass says: But I let subclasses override some operations');
  }

  protected baseOperation3(): void {
      console.log('AbstractClass says: But I am doing the bulk of the work anyway');
  }

  /**
   * These operations have to be implemented in subclasses.
   */
  protected abstract requiredOperations1(): void;

  protected abstract requiredOperation2(): void;

  /**
   * These are "hooks." Subclasses may override them, but it's not mandatory
   * since the hooks already have default (but empty) implementation. Hooks
   * provide additional extension points in some crucial places of the
   * algorithm.
   */
  protected hook1(): void { }

  protected hook2(): void { }
}

/**
* Concrete classes have to implement all abstract operations of the base class.
* They can also override some operations with a default implementation.
*/
class ConcreteClass1 extends AbstractClass {
  protected requiredOperations1(): void {
      console.log('ConcreteClass1 says: Implemented Operation1');
  }

  protected requiredOperation2(): void {
      console.log('ConcreteClass1 says: Implemented Operation2');
  }
}

/**
* Usually, concrete classes override only a fraction of base class' operations.
*/
class ConcreteClass2 extends AbstractClass {
  protected requiredOperations1(): void {
      console.log('ConcreteClass2 says: Implemented Operation1');
  }

  protected requiredOperation2(): void {
      console.log('ConcreteClass2 says: Implemented Operation2');
  }

  protected hook1(): void {
      console.log('ConcreteClass2 says: Overridden Hook1');
  }
}

/**
* The client code calls the template method to execute the algorithm. Client
* code does not have to know the concrete class of an object it works with, as
* long as it works with objects through the interface of their base class.
*/
function templateMethodClient(abstractClass: AbstractClass) {
  // ...
  abstractClass.templateMethod();
  // ...
}

console.log('Same client code can work with different subclasses:');
templateMethodClient(new ConcreteClass1());
console.log('');

console.log('Same client code can work with different subclasses:');
templateMethodClient(new ConcreteClass2());
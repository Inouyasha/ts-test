/**
 * 访问者模式
 * 
 * 访问者模式中有两个重要的类 前者为元素（表现为要访问的数据实体） 后者为访问者（主要一个对实体进行处理的方式）
 * 首先元素是有不同种类的，它们都来自元素的父类，提供accept接口，进行统一调用（accept是一个虚拟方法）
 * 其次访问者是有不同种类的 它们都来自访问的父类
 * 
 * 需要注意的是访问者是知道所有元素的，所以访问者的访问方法会对应到所有的元素 这里为visitConcreteComponentA, visitConcreteComponentA
 * 各种不同的元素只关心自己是怎么被调用的 它提供的accept就是让visitor去访问到自己 
 * 
 * 举例来说
 * 假如有这样一位非常希望赢得新客户的资深保险代理人。 他可以拜访街区中的每栋楼， 尝试向每个路人推销保险。 
 * 所以， 根据大楼内组织类型的不同， 他可以提供专门的保单：
    如果建筑是居民楼， 他会推销医疗保险。
    如果建筑是银行， 他会推销失窃保险。
    如果建筑是咖啡厅， 他会推销火灾和洪水保险。
 * 
    
    所以如果数据是一类元素，但是会针对不同的方面对元素有对应的处理，可以采用这种方式

    比如图形Shape(Element)，有Circle和Square，它们可能有公共的部分比如position:[number,number]，也有不一样的部分比如radius和width,height
    我们提供访问的Visitor
    比如DrawVisitor和RotateVisitor其对应的行为也不一样 有种mxn的组合的意味在里面 其好处就是如果只考虑增加处理模式而不考虑增加Element就比较方便 否则就不太方便
    因为每次增加Element所有的Visitor都需要增加对应的方法
 */



/**
 * The Component interface declares an `accept` method that should take the base
 * visitor interface as an argument.
 */
 interface ComponentX {
  accept(visitor: Visitor): void;
}

/**
* Each Concrete Component must implement the `accept` method in such a way that
* it calls the visitor's method corresponding to the component's class.
*/
class ConcreteComponentA implements ComponentX {
  /**
   * Note that we're calling `visitConcreteComponentA`, which matches the
   * current class name. This way we let the visitor know the class of the
   * component it works with.
   */
  public accept(visitor: Visitor): void {
      visitor.visitConcreteComponentA(this);
  }

  /**
   * Concrete Components may have special methods that don't exist in their
   * base class or interface. The Visitor is still able to use these methods
   * since it's aware of the component's concrete class.
   */
  public exclusiveMethodOfConcreteComponentA(): string {
      return 'A';
  }
}

class ConcreteComponentB implements ComponentX {
  /**
   * Same here: visitConcreteComponentB => ConcreteComponentB
   */
  public accept(visitor: Visitor): void {
      visitor.visitConcreteComponentB(this);
  }

  public specialMethodOfConcreteComponentB(): string {
      return 'B';
  }
}

/**
* The Visitor Interface declares a set of visiting methods that correspond to
* component classes. The signature of a visiting method allows the visitor to
* identify the exact class of the component that it's dealing with.
*/
interface Visitor {
  visitConcreteComponentA(element: ConcreteComponentA): void;

  visitConcreteComponentB(element: ConcreteComponentB): void;
}

/**
* Concrete Visitors implement several versions of the same algorithm, which can
* work with all concrete component classes.
*
* You can experience the biggest benefit of the Visitor pattern when using it
* with a complex object structure, such as a Composite tree. In this case, it
* might be helpful to store some intermediate state of the algorithm while
* executing visitor's methods over various objects of the structure.
*/
class ConcreteVisitor1 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
      console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`);
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
      console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`);
  }
}

class ConcreteVisitor2 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
      console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`);
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
      console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`);
  }
}

/**
* The client code can run visitor operations over any set of elements without
* figuring out their concrete classes. The accept operation directs a call to
* the appropriate operation in the visitor object.
*/
function visitorClient(components: ComponentX[], visitor: Visitor) {
  // ...
  for (const component of components) {
      component.accept(visitor);
  }
  // ...
}

const components = [
  new ConcreteComponentA(),
  new ConcreteComponentB(),
];

console.log('The client code works with all visitors via the base Visitor interface:');
const visitor1 = new ConcreteVisitor1();
visitorClient(components, visitor1);
console.log('');

console.log('It allows the same client code to work with different types of visitors:');
const visitor2 = new ConcreteVisitor2();
visitorClient(components, visitor2);
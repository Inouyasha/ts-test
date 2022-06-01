/**
 * 原始的部件可以是类DecComponent
 *
 * 对于Decorator 它输入一个DecComponent 然后重写其方法operation()重写的方式为委托调用源component的operation方法
 * 具体的Decorator为Decorator的子类，重写方式与上面一致
 *
 * 这种方式有点像网络诈骗中的镜像网站 放一个一模一样的网站，所有的网站点击都是委托源网站的行为，只是会加一点自己的恶意代码
 */

/**
 * The base Component interface defines operations that can be altered by
 * decorators.
 */
interface DecComponent {
  operation(): string;
}

/**
 * Concrete Components provide default implementations of the operations. There
 * might be several variations of these classes.
 */
class ConcreteComponent implements DecComponent {
  public operation(): string {
    return "ConcreteComponent";
  }
}

/**
 * The base Decorator class follows the same interface as the other components.
 * The primary purpose of this class is to define the wrapping interface for all
 * concrete decorators. The default implementation of the wrapping code might
 * include a field for storing a wrapped component and the means to initialize
 * it.
 */
class Decorator implements DecComponent {
  protected component: DecComponent;

  constructor(component: DecComponent) {
    this.component = component;
  }

  /**
   * The Decorator delegates all work to the wrapped component.
   */
  public operation(): string {
    return this.component.operation();
  }
}

/**
 * Concrete Decorators call the wrapped object and alter its result in some way.
 */
class ConcreteDecoratorA extends Decorator {
  /**
   * Decorators may call parent implementation of the operation, instead of
   * calling the wrapped object directly. This approach simplifies extension
   * of decorator classes.
   */
  public operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

/**
 * Decorators can execute their behavior either before or after the call to a
 * wrapped object.
 */
class ConcreteDecoratorB extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}

/**
 * The client code works with all objects using the Component interface. This
 * way it can stay independent of the concrete classes of components it works
 * with.
 */
function compositeClientCode(component: DecComponent) {
  // ...

  console.log(`RESULT: ${component.operation()}`);

  // ...
}

/**
 * This way the client code can support both simple components...
 */
const simpleDec = new ConcreteComponent();
console.log("Client: I've got a simple component:");
compositeClientCode(simpleDec);
console.log("");

/**
 * ...as well as decorated ones.
 *
 * Note how decorators can wrap not only simple components but the other
 * decorators as well.
 */
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log("Client: Now I've got a decorated component:");
compositeClientCode(decorator2);

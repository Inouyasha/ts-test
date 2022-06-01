/**
 * 状态设计模式
 * 
 * 其设计来与传统的MVC中 数据state对应系统的展示状态不同
 * 实际上，系统在不同状态下会有相同的方法，只是在每个状态里方法执行的方式不同
 * 
 * 比如手机在锁屏状态下和屏显状态下执行音量键的方式可能就有不同 前者可能会触发屏幕变亮
 * 
 * 这里主要有两个类，一者为Context，一者为State
 * Context为环境有一些所有状态的公共方式，还有状态获取和变更的方法
 * State会实现一部分Context的虚拟方法
 * 调用方法时会使用类似于 this.state.handle1()来实现状态方法的多态
 * 某种程度上，类的分离实现了近似switch的能力，但是耦合性更弱
 * 
 */

/**
 * The Context defines the interface of interest to clients. It also maintains a
 * reference to an instance of a State subclass, which represents the current
 * state of the Context.
 */
class StateContext {
  /**
   * @type {StateContext} A reference to the current state of the Context.
   */
  private state!: State;

  constructor(state: State) {
    this.transitionTo(state);
  }

  /**
   * The Context allows changing the State object at runtime.
   */
  public transitionTo(state: State): void {
    console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  /**
   * The Context delegates part of its behavior to the current State object.
   */
  public request1(): void {
    this.state.handle1();
  }

  public request2(): void {
    this.state.handle2();
  }
}

/**
 * The base State class declares methods that all Concrete State should
 * implement and also provides a backreference to the Context object, associated
 * with the State. This backreference can be used by States to transition the
 * Context to another State.
 */
abstract class State {
  protected context!: StateContext;

  public setContext(context: StateContext) {
    this.context = context;
  }

  public abstract handle1(): void;

  public abstract handle2(): void;
}

/**
 * Concrete States implement various behaviors, associated with a state of the
 * Context.
 */
class ConcreteStateA extends State {
  public handle1(): void {
    console.log("ConcreteStateA handles request1.");
    console.log("ConcreteStateA wants to change the state of the context.");
    this.context.transitionTo(new ConcreteStateB());
  }

  public handle2(): void {
    console.log("ConcreteStateA handles request2.");
  }
}

class ConcreteStateB extends State {
  public handle1(): void {
    console.log("ConcreteStateB handles request1.");
  }

  public handle2(): void {
    console.log("ConcreteStateB handles request2.");
    console.log("ConcreteStateB wants to change the state of the context.");
    this.context.transitionTo(new ConcreteStateA());
  }
}

/**
 * The client code.
 */
const stateContext = new StateContext(new ConcreteStateA());
stateContext.request1();
stateContext.request2();

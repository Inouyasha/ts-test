/**
 * 中介者模式 
 * 
 * 是一个组件通信的很好的模式，隔离了组件之间的直接交互，而通过中间件进行通知转发
 * 如果中间件作为一个单例 那么就可以近似理解为service作为统一消息处理的示例
 * 
 * 另外，考虑事件机制，搭建一个消息处理中心，全局接受notify和对应每个notify会转发后由指定组件订阅消息处理
 * 这一行为类似于redux的处理方式
 * 又和之前tensorboard中的对svg的各模块处理的fire行为很相似
 * 又如聊天面板的对话行为 由中介者统一分发
 * 
 * 核心来说，由两部分组成，一为组件（customer），二为消息中心（meditation），组件可以notify指定格式的消息
 * 消息中心接收消息，并发给指定的组件
 * 组件中需要有消息接收的位置 用来持续触发消息的处理行为
 * 
 */


/**
 * The Mediator interface declares a method used by components to notify the
 * mediator about various events. The Mediator may react to these events and
 * pass the execution to other components.
 */
 interface Mediator {
  notify(sender: object, event: string): void;
}

/**
* Concrete Mediators implement cooperative behavior by coordinating several
* components.
*/
class ConcreteMediator implements Mediator {
  private component1: Component1;

  private component2: Component2;

  constructor(c1: Component1, c2: Component2) {
      this.component1 = c1;
      this.component1.setMediator(this);
      this.component2 = c2;
      this.component2.setMediator(this);
  }

  public notify(sender: object, event: string): void {
      if (event === 'A') {
          console.log('Mediator reacts on A and triggers following operations:');
          this.component2.doC();
      }

      if (event === 'D') {
          console.log('Mediator reacts on D and triggers following operations:');
          this.component1.doB();
          this.component2.doC();
      }
  }
}

/**
* The Base Component provides the basic functionality of storing a mediator's
* instance inside component objects.
*/
class BaseComponent {
  protected mediator: Mediator;

  constructor(mediator?: Mediator) {
      this.mediator = mediator!;
  }

  public setMediator(mediator: Mediator): void {
      this.mediator = mediator;
  }
}

/**
* Concrete Components implement various functionality. They don't depend on
* other components. They also don't depend on any concrete mediator classes.
*/
class Component1 extends BaseComponent {
  public doA(): void {
      console.log('Component 1 does A.');
      this.mediator.notify(this, 'A');
  }

  public doB(): void {
      console.log('Component 1 does B.');
      this.mediator.notify(this, 'B');
  }
}

class Component2 extends BaseComponent {
  public doC(): void {
      console.log('Component 2 does C.');
      this.mediator.notify(this, 'C');
  }

  public doD(): void {
      console.log('Component 2 does D.');
      this.mediator.notify(this, 'D');
  }
}

/**
* The client code.
*/
const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);

console.log('Client triggers operation A.');
c1.doA();

console.log('');
console.log('Client triggers operation D.');
c2.doD();
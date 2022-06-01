/**
 * 
 * 命令模式 
 * 用来解耦调用者invoker和执行者receiver之间的耦合性
 * 
 * 考虑餐馆菜单 所有的可以点的菜（可以调用的项目）都在菜单上 receiver是厨师 收到命令 开始做对应的菜（执行函数）
 * 在前端框架代码里 要绑定一个函数 先声明后绑定 一个函数可以被多处绑定 而不是直接把一个按钮和一个lambda函数绑定在一起
 * 
 * 可以用来管理指令 比如可以定义指令执行前先执行什么（所有指令都继承一个类 类有start方法和execute方法）
 * 可以用来建立指令的history 统一管理 执行undo和redo
 * 
 */

/**
 * The Command interface declares a method for executing a command.
 */
interface Command {
  execute(): void;
}

/**
 * Some commands can implement simple operations on their own.
 */
class SimpleCommand implements Command {
  private payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }

  public execute(): void {
    console.log(
      `SimpleCommand: See, I can do simple things like printing (${this.payload})`
    );
  }
}

/**
 * However, some commands can delegate more complex operations to other objects,
 * called "receivers."
 */
class ComplexCommand implements Command {
  private receiver: Receiver;

  /**
   * Context data, required for launching the receiver's methods.
   */
  private a: string;

  private b: string;

  /**
   * Complex commands can accept one or several receiver objects along with
   * any context data via the constructor.
   */
  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  /**
   * Commands can delegate to any methods of a receiver.
   */
  public execute(): void {
    console.log(
      "ComplexCommand: Complex stuff should be done by a receiver object."
    );
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

/**
 * The Receiver classes contain some important business logic. They know how to
 * perform all kinds of operations, associated with carrying out a request. In
 * fact, any class may serve as a Receiver.
 */
class Receiver {
  public doSomething(a: string): void {
    console.log(`Receiver: Working on (${a}.)`);
  }

  public doSomethingElse(b: string): void {
    console.log(`Receiver: Also working on (${b}.)`);
  }
}

/**
 * The Invoker is associated with one or several commands. It sends a request to
 * the command.
 */
class Invoker {
  private onStart!: Command;

  private onFinish!: Command;

  /**
   * Initialize commands.
   */
  public setOnStart(command: Command): void {
    this.onStart = command;
  }

  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }

  /**
   * The Invoker does not depend on concrete command or receiver classes. The
   * Invoker passes a request to a receiver indirectly, by executing a
   * command.
   */
  public doSomethingImportant(): void {
    console.log("Invoker: Does anybody want something done before I begin?");
    if (this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log("Invoker: ...doing something really important...");

    console.log("Invoker: Does anybody want something done after I finish?");
    if (this.isCommand(this.onFinish)) {
      this.onFinish.execute();
    }
  }

  private isCommand(object: any): object is Command {
    return object.execute !== undefined;
  }
}

/**
 * The client code can parameterize an invoker with any commands.
 */
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand("Say Hi!"));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, "Send email", "Save report"));

invoker.doSomethingImportant();

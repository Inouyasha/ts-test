import { NullTypeAnd } from "../core/type";


/**
 * 参考所谓的错误链 throw的error会一层一层向外层的栈抛出，直到其被处理
 * 
 * 这里的责任链也是这样，作为虚类，需要实现两个方法，一个是setNext即类似链表的设置链上的下一个元素，另一个是handle函数，即当前类的处理
 * 
 * 实现类通过handle函数（都是相同的interface）来确认是否处理，如果不处理则抛到责任链的下一个 直到责任链的尽头
 * 
 * 而设置责任链的行为和顺序
 * 
 */
/**
 * The Handler interface declares a method for building the chain of handlers.
 * It also declares a method for executing a request.
 */
interface Handler {
  setNext(handler: Handler): Handler;

  handle(request: NullTypeAnd<string>): NullTypeAnd<string>;
}
type nullAndStringType = NullTypeAnd<string>;

/**
 * The default chaining behavior can be implemented inside a base handler class.
 */
abstract class AbstractHandler implements Handler {
  private nextHandler!: NullTypeAnd<Handler>;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    // Returning a handler from here will let us link handlers in a
    // convenient way like this:
    // monkey.setNext(squirrel).setNext(dog);
    return handler;
  }

  public handle(request: nullAndStringType): nullAndStringType {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return null;
  }
}

/**
 * All Concrete Handlers either handle a request or pass it to the next handler
 * in the chain.
 */
class MonkeyHandler extends AbstractHandler {
  public handle(request: nullAndStringType): nullAndStringType {
    if (request === "Banana") {
      return `Monkey: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: nullAndStringType): nullAndStringType {
    if (request === "Nut") {
      return `Squirrel: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: nullAndStringType): nullAndStringType {
    if (request === "MeatBall") {
      return `Dog: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

/**
 * The client code is usually suited to work with a single handler. In most
 * cases, it is not even aware that the handler is part of a chain.
 */
function chainOfResponsibilityClient(handler: Handler) {
  const foods = ["Nut", "Banana", "Cup of coffee"];

  for (const food of foods) {
    console.log(`Client: Who wants a ${food}?`);

    const result = handler.handle(food);
    if (result) {
      console.log(`  ${result}`);
    } else {
      console.log(`  ${food} was left untouched.`);
    }
  }
}

/**
 * The other part of the client code constructs the actual chain.
 */
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

/**
 * The client should be able to send a request to any handler, not just the
 * first one in the chain.
 */
console.log("Chain: Monkey > Squirrel > Dog\n");
chainOfResponsibilityClient(monkey);
console.log("");

console.log("Subchain: Squirrel > Dog\n");
chainOfResponsibilityClient(squirrel);

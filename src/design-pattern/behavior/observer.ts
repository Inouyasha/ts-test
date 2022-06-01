/**
 * 观察者模式 
 * 
 * 用多了rxjs 这个模式不用多说了
 * 唯一要思考的是 这是一个setter-setter模式
 * 
 * 前一个set subject 后一个set observer
 * 
 */

/**
 * The Subject interface declares a set of methods for managing subscribers.
 */
interface SubjectX {
  // Attach an observer to the subject.
  subscribe(observer: Observer): void;

  // Detach an observer from the subject.
  unsubscribe(observer: Observer): void;

  // Notify all observers about an event.
  next(): void;
}

/**
 * The Subject owns some important state and notifies observers when the state
 * changes.
 */
class ConcreteSubject implements SubjectX {
  /**
   * @type {number} For the sake of simplicity, the Subject's state, essential
   * to all subscribers, is stored in this variable.
   */
  public state!: number;

  /**
   * @type {Observer[]} List of subscribers. In real life, the list of
   * subscribers can be stored more comprehensively (categorized by event
   * type, etc.).
   */
  private observers: Observer[] = [];

  /**
   * The subscription management methods.
   */
  public subscribe(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log("Subject: Observer has been attached already.");
    }

    console.log("Subject: Attached an observer.");
    this.observers.push(observer);
  }

  public unsubscribe(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log("Subject: Nonexistent observer.");
    }

    this.observers.splice(observerIndex, 1);
    console.log("Subject: Detached an observer.");
  }

  /**
   * Trigger an update in each subscriber.
   */
  public next(): void {
    console.log("Subject: Notifying observers...");
    for (const observer of this.observers) {
      observer.next(this);
    }
  }

  /**
   * Usually, the subscription logic is only a fraction of what a Subject can
   * really do. Subjects commonly hold some important business logic, that
   * triggers a notification method whenever something important is about to
   * happen (or after it).
   */
  public someBusinessLogic(): void {
    console.log("\nSubject: I'm doing something important.");
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject: My state has just changed to: ${this.state}`);
    this.next();
  }
}

/**
 * The Observer interface declares the update method, used by subjects.
 */
interface Observer {
  // Receive update from subject.
  next: (...args: any[]) => void;
  error?: (e: any) => void;
  complete?: () => void;
}

/**
 * Concrete Observers react to the updates issued by the Subject they had been
 * attached to.
 */
class ConcreteObserverA implements Observer {
  public next(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log("ConcreteObserverA: Reacted to the event.");
    }
  }
}

class ConcreteObserverB implements Observer {
  public next(subject: Subject): void {
    if (
      subject instanceof ConcreteSubject &&
      (subject.state === 0 || subject.state >= 2)
    ) {
      console.log("ConcreteObserverB: Reacted to the event.");
    }
  }
}

/**
 * The client code.
 */

const subject = new ConcreteSubject();

const observer1 = new ConcreteObserverA();
subject.subscribe(observer1);

const observer2 = new ConcreteObserverB();
subject.subscribe(observer2);

subject.someBusinessLogic();
subject.someBusinessLogic();

subject.unsubscribe(observer2);

subject.someBusinessLogic();

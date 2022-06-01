/**
 * 代理模式和装饰模式从行为上很相似 都是委托原先的方法去执行 但是不同之处在用户代理模式更多的强调不改变原先接口的实现 只是增加一些额外的处理
 * 如验证是否有权限，缓存等
 * 
 * 从实现上看，代理模式也通过委托重写原接口，但是会增加一些新的方法和判断
 * 如set，get方法，都是对于原先变量的处理进行一些额外的处理，然后执行原本的set或get
 * 
 */

/**
 * The Subject interface declares common operations for both RealSubject and the
 * Proxy. As long as the client works with RealSubject using this interface,
 * you'll be able to pass it a proxy instead of a real subject.
 */
 interface Subject {
  request(): void;
}

/**
* The RealSubject contains some core business logic. Usually, RealSubjects are
* capable of doing some useful work which may also be very slow or sensitive -
* e.g. correcting input data. A Proxy can solve these issues without any
* changes to the RealSubject's code.
*/
class RealSubject implements Subject {
  public request(): void {
      console.log('RealSubject: Handling request.');
  }
}

/**
* The Proxy has an interface identical to the RealSubject.
*/
class ProxyDemo implements Subject {
  private realSubject: RealSubject;

  /**
   * The Proxy maintains a reference to an object of the RealSubject class. It
   * can be either lazy-loaded or passed to the Proxy by the client.
   */
  constructor(realSubject: RealSubject) {
      this.realSubject = realSubject;
  }

  /**
   * The most common applications of the Proxy pattern are lazy loading,
   * caching, controlling the access, logging, etc. A Proxy can perform one of
   * these things and then, depending on the result, pass the execution to the
   * same method in a linked RealSubject object.
   */
  public request(): void {
      if (this.checkAccess()) {
          this.realSubject.request();
          this.logAccess();
      }
  }

  private checkAccess(): boolean {
      // Some real checks should go here.
      console.log('Proxy: Checking access prior to firing a real request.');

      return true;
  }

  private logAccess(): void {
      console.log('Proxy: Logging the time of request.');
  }
}

/**
* The client code is supposed to work with all objects (both subjects and
* proxies) via the Subject interface in order to support both real subjects and
* proxies. In real life, however, clients mostly work with their real subjects
* directly. In this case, to implement the pattern more easily, you can extend
* your proxy from the real subject's class.
*/
function clientCode(subject: Subject) {
  // ...

  subject.request();

  // ...
}

console.log('Client: Executing the client code with a real subject:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const proxy = new ProxyDemo(realSubject);
clientCode(proxy);
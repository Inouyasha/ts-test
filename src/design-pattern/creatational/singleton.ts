/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
 class Singleton {
  //  全局共享的实例 有货物
  private static instance: Singleton;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  // 单例模式拥有私有的constructor 不能直接从外部通过new来创建新对象 只能内部调用
  private constructor() { }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  // 单例模式的获取通过方法来获得
  public static getInstance(): Singleton {
      if (!Singleton.instance) {
          Singleton.instance = new Singleton();
      }

      return Singleton.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public someBusinessLogic() {
      // ...
  }
}

/**
* The client code.
*/
function singletonClient() {
  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();

  if (s1 === s2) {
      console.log('Singleton works, both variables contain the same instance.');
  } else {
      console.log('Singleton failed, variables contain different instances.');
  }
}

singletonClient();
/**
 * 享元模式
 *
 * 享元模式 用来cache一些占用内存较大 但是又常被重用的部分 比如3d模型中的texture 占用内存大 但是重用率却很高
 *
 * 它的思想是，使用一个类专门用来管理这样的重用部分，这里我们以texture举例，在创建时，会先创建指定的texture，并保证其是单例的（对于某种类型是单例的）
 * 然后可以通过这个单例的部分去进行一些操作 以此避免在每个类中都添加这样的texture
 *
 * 是一种结构上的抽象（把公用的模块抽成了单例的接口）
 *
 */

/**
 * The Flyweight stores a common portion of the state (also called intrinsic
 * state) that belongs to multiple real business entities. The Flyweight accepts
 * the rest of the state (extrinsic state, unique for each entity) via its
 * method parameters.
 */
class Flyweight {
  private sharedState: any;

  constructor(sharedState: any) {
    this.sharedState = sharedState;
  }

  public operation(uniqueState: object): void {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);
    console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
  }
}

/**
 * The Flyweight Factory creates and manages the Flyweight objects. It ensures
 * that flyweights are shared correctly. When the client requests a flyweight,
 * the factory either returns an existing instance or creates a new one, if it
 * doesn't exist yet.
 */
class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = <any>{};

  constructor(initialFlyweights: string[][]) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  /**
   * Returns a Flyweight's string hash for a given state.
   */
  private getKey(state: string[]): string {
    return state.join("_");
  }

  /**
   * Returns an existing Flyweight with a given state or creates a new one.
   */
  public getFlyweight(sharedState: string[]): Flyweight {
    const key = this.getKey(sharedState);

    if (!(key in this.flyweights)) {
      console.log(
        "FlyweightFactory: Can't find a flyweight, creating new one."
      );
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log("FlyweightFactory: Reusing existing flyweight.");
    }

    return this.flyweights[key];
  }

  public listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
    for (const key in this.flyweights) {
      console.log(key);
    }
  }
}

/**
 * The client code usually creates a bunch of pre-populated flyweights in the
 * initialization stage of the application.
 */
const factory = new FlyweightFactory([
  ["Chevrolet", "Camaro2018", "pink"],
  ["Mercedes Benz", "C300", "black"],
  ["Mercedes Benz", "C500", "red"],
  ["BMW", "M5", "red"],
  ["BMW", "X6", "white"],
  // ...
]);
factory.listFlyweights();

// ...

function addCarToPoliceDatabase(
  ff: FlyweightFactory,
  plates: string,
  owner: string,
  brand: string,
  model: string,
  color: string
) {
  console.log("\nClient: Adding a car to database.");
  const flyweight = ff.getFlyweight([brand, model, color]);

  // The client code either stores or calculates extrinsic state and passes it
  // to the flyweight's methods.
  flyweight.operation([plates, owner]);
}

addCarToPoliceDatabase(factory, "CL234IR", "James Doe", "BMW", "M5", "red");

addCarToPoliceDatabase(factory, "CL234IR", "James Doe", "BMW", "X1", "red");

factory.listFlyweights();

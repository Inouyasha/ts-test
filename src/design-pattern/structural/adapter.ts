/**
 * The Target defines the domain-specific interface used by the client code.
 */
class Target {
  public request(): string {
    return "Target: The default target's behavior.";
  }
}

/**
 * The Adaptee contains some useful behavior, but its interface is incompatible
 * with the existing client code. The Adaptee needs some adaptation before the
 * client code can use it.
 */
class Adaptee {
  public specificRequest(): string {
    return ".eetpadA eht fo roivaheb laicepS";
  }
}

/**
 * The Adapter makes the Adaptee's interface compatible with the Target's
 * interface.
 */
// Adapter输入为转换前的类，输出一个可以适配某个服务的类
// 这里输入前为Adaptee 输出为一个Target（interface）对应Adaptee的类
// 这样客户端不用去管自己的数据类型 而服务方也不用去适应客户端的数据 只要客户端数据被适配器适配后 输出的类用来就好
class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    const result = this.adaptee.specificRequest().split("").reverse().join("");
    return `Adapter: (TRANSLATED) ${result}`;
  }
}

/**
 * The client code supports all classes that follow the Target interface.
 */
function adapterClientCode(target: Target) {
  console.log(target.request());
}

console.log("Client: I can work just fine with the Target objects:");
const target = new Target();
adapterClientCode(target);

console.log("");

const adaptee = new Adaptee();
console.log(
  "Client: The Adaptee class has a weird interface. See, I don't understand it:"
);
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log("");

console.log("Client: But I can work with it via the Adapter:");
const adapter = new Adapter(adaptee);
adapterClientCode(adapter);

type RecordValue = any;
interface RecordProperty {
  map: Map<string, RecordValue>;
  // 此处可以配置其他状态 但是所有状态都放在这里
}

class MonostateRecord {
  private map: Map<string, RecordValue>;

  constructor(input: RecordProperty) {
    const { map } = input;
    this.map = map;
  }

  get(key: string) {
    return this.map.get(key) ?? null;
  }

  set(key: string, value: RecordValue) {
    this.map.set(key, value);
  }
}

// 测试代码
const state = { map: new Map() };
const instance1 = new MonostateRecord(state);  // 只要state相同，作为函数式方法的instance就是等价的
const instance2 = new MonostateRecord(state);
instance1.set("a", 123);
console.log(instance2.get("a"));

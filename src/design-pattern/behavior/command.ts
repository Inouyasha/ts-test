/**
 *
 * 命令模式
 * COMMAND模式主要是把一个对象的行为封装成一个一个的有相同接口的Command对象，对象的内部变量用于保存行为的状态，
 * 然后交给一个统一的命令执行器执行或管理这些命令。也就是说，COMMAND模式旨在实现一个可以基于序列信息执行序列中
 * 的函数和相应参数的模式。
 *
 */

// 示例1 饭馆账单
interface Command {
  execute(): void;
  undo(): void;
}

/**
 * 记录饭馆账单，其实用一个object也可以
 * 这里封装为一个类
 */
class Bill {
  private total: number;

  constructor(total: number = 0) {
    this.total = total;
  }

  public getTotal() {
    return this.total;
  }
  public setTotal(total: number) {
    this.total = total;
  }
}

/**
 * 增加收入
 */
class IncomeCommand implements Command {
  private income: number;
  private bill: Bill;

  constructor(income: number, bill: Bill) {
    this.income = income;
    this.bill = bill;
  }

  execute() {
    console.log(`Income: ${this.income}`);
    this.bill.setTotal(this.bill.getTotal() + this.income);
    console.log(`Total: ${this.bill.getTotal()}\n`);
  }
  undo() {
    console.log(`Undo income: ${this.income}`);
    this.bill.setTotal(this.bill.getTotal() - this.income);
    console.log(`Total: ${this.bill.getTotal()}\n`);
  }
}

/**
 * 退款
 */
class WithdrawCommand implements Command {
  private income: number;
  private bill: Bill;

  constructor(income: number, bill: Bill) {
    this.income = income;
    this.bill = bill;
  }

  execute() {
    console.log(`Income: ${this.income}`);
    this.bill.setTotal(this.bill.getTotal() - this.income);
    console.log(`Total: ${this.bill.getTotal()}\n`);
  }
  undo(): void {
    console.log(`Undo income: ${this.income}`);
    this.bill.setTotal(this.bill.getTotal() + this.income);
    console.log(`Total: ${this.bill.getTotal()}\n`);
  }
}

// 收入100
// 退款50
// 收入200
// 退款20
const bill = new Bill(0);

const billHistory: Command[] = [
  new IncomeCommand(100, bill),
  new WithdrawCommand(50, bill),
  new IncomeCommand(200, bill),
  new WithdrawCommand(20, bill),
];

for (const billAction of billHistory) {
  billAction.execute();
}

function undo() {
  const command = billHistory.pop();
  if (command) {
    command.undo();
  }
}
undo();
undo();
undo();
undo();

console.log(bill.getTotal());

// 示例2 任务队列
interface Mission {
  execute(): void;
}

class Mission1 implements Mission {
  execute() {
    console.log("Mission1");
  }
}
class Mission2 implements Mission {
  execute() {
    console.log("Mission2");
  }
}
class DelayMission implements Mission {
  startTime: Date;
  delay: number; // 任务执行延迟时间
  queue: MissionQueue;

  constructor(delay: number, queue: MissionQueue) {
    this.startTime = new Date();
    this.delay = delay;
    this.queue = queue;
  }

  private _execute() {
    console.log("DelayMission");
  }

  execute() {
    const now = new Date();
    // 如果当前时间减去开始时间大于延迟时间
    if (now.getTime() - this.startTime.getTime() > this.delay) {
      this._execute();
    } else {
      // 没有到时间就重新加入队列
      this.queue.addMission(this);
    }
  }
}
class MissionQueue {
  private missions: Mission[];
  private executeFlag: boolean;
  private startTime: Date;

  constructor() {
    this.missions = [];
    this.executeFlag = true;
    this.startTime = new Date();
  }

  addMission(mission: Mission) {
    this.missions.push(mission);
  }

  executeMissions() {
    while (this.executeFlag) {
      // 按照队列执行任务
      const currMission = this.missions.shift();
      // 获取时间差 millSeconds
      console.log(
        "Time:",
        (new Date().getTime() - this.startTime.getTime()) / 1000
      );

      if (new Date().getTime() - this.startTime.getTime() > 5000) {
        this.stop();
      }

      if (currMission) {
        currMission.execute();
      }
    }
  }

  stop() {
    this.executeFlag = false;
    console.log(
      "Time:",
      (new Date().getTime() - this.startTime.getTime()) / 1000
    );
    console.log("MissionQueue stop");
  }
}

const queue = new MissionQueue();
queue.addMission(new Mission1());
queue.addMission(new Mission2());
queue.addMission(new DelayMission(1000, queue));
queue.addMission(new DelayMission(3000, queue));
queue.executeMissions();

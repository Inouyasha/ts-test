// 任务目标 生成一个可以显示时间的数字闹钟
interface IObserver {
  id: number; // 用于标识
  next: (...args: any[]) => void;
}

interface ISubject {
  observers: IObserver[];
  isClosed: boolean;
  addObserver: (ob: IObserver) => void;
  removeObserver: (obId: number) => void;
  notify: (msg: any) => void;
  complete: () => void;
}

interface ITime {
  hour: number;
  minute: number;
  second: number;
}

class ClockSource implements ISubject {
  observers: IObserver[] = [];
  isClosed: boolean = false;

  constructor() {}

  addObserver(ob: IObserver) {
    this.observers.push(ob);
  }

  removeObserver(obId: number) {
    this.observers = this.observers.filter((ob) => ob.id !== obId);
  }

  // 通知信息
  notify(msg: ITime) {
    // 当已经关闭 不通知
    if (this.isClosed) {
      return;
    }

    for (const ob of this.observers) {
      ob.next(msg);
    }
  }

  // 时钟源
  start() {
    let intervalId: number;
    intervalId = setInterval(() => {
      if (this.isClosed) {
        clearInterval(intervalId);
      }

      const now = new Date();
      this.notify({
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds(),
      });
    }, 1000);
  }

  complete() {
    this.isClosed = true;
  }
}

class ClockSine implements IObserver {
  constructor(public id: number) {}

  next(info: ITime) {
    console.log(
      `时钟${this.id} 通知现在时间 ${info.hour}:${info.minute}:${info.second}`
    );
  }
}

// 执行测试
function mainTest() {
  const clockSource = new ClockSource();
  clockSource.start();

  const ob1 = new ClockSine(1); // 时钟1
  const ob2 = new ClockSine(2); // 时钟2

  clockSource.addObserver(ob1);

  setTimeout(() => {
    clockSource.addObserver(ob2);
  }, 2000);

  setTimeout(() => {
    clockSource.removeObserver(1);
  }, 4000);

  setTimeout(() => {
    clockSource.complete();
  }, 6000);
}

mainTest();
// 时钟1 通知现在时间 11:46:41
// 时钟1 通知现在时间 11:46:42
// 时钟2 通知现在时间 11:46:42
// 时钟1 通知现在时间 11:46:43
// 时钟2 通知现在时间 11:46:43
// 时钟2 通知现在时间 11:46:44
// 时钟2 通知现在时间 11:46:45

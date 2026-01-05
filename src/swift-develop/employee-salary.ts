/*
基础功能描述：
1. 增加雇员 钟点工 普通雇员 酬金雇员
2. 删除雇员
3. 登记时间卡（钟点工的工资凭证）
4. 登记销售凭条（销售工资凭证）
5. 登记协会服务费（考虑一个员工是否对应多个协会）
6. 更改雇员明细 名称，地址，时薪，薪水，酬金，持有支票，存款，邮寄支票，增加协会，去掉协会
7. 发薪日 系统找到所有在指定日期进行支付的雇员
*/

import {
  endOfDay,
  endOfWeek,
  getWeekOfMonth,
  isFriday,
  isLastDayOfMonth,
  startOfDay,
  startOfWeek,
  subDays,
} from "date-fns";

function uuid(len: number = 8, radix: number = 32) {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  const target: string[] = [];
  const tempRadix = radix || chars.length;
  if (len) {
    // Compact form
    for (let i = 0; i < len; i++)
      target[i] = chars[0 | (Math.random() * tempRadix)];
  } else {
    // rfc4122 requires these characters
    target[8] = target[13] = target[18] = target[23] = "-";
    target[14] = "4";
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (let i = 0; i < 36; i++) {
      // rfc4122, version 4 form
      let r: number;
      if (!target[i]) {
        r = 0 | (Math.random() * 16);
        target[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return target.join("");
}

// 上面的功能对应了相应的操作，所谓操作，即给定输入，无时效性的得到结果
// 先考虑需要持久化的部分 即所谓的关系和需要保存的数据
// 0. 基础设施 数据持久化 单例数据库
type EmployeeId = string;
type AffiliationId = string;
class PayrollDatabase {
  employeeTable: Map<EmployeeId, Employee> = new Map();
  affiliationTable: Map<AffiliationId, Affiliation> = new Map();

  getEmployeeById(id: EmployeeId): Employee | null {
    if (!this.employeeTable.has(id)) {
      console.error("invalid employee id");
      return null;
    }

    return this.employeeTable.get(id)!;
  }
  getAffiliationById(id: AffiliationId): IAffiliation {
    if (!this.affiliationTable.has(id)) {
      console.error("invalid affiliation id");
      return new NullAffiliation();
    }

    return this.affiliationTable.get(id)!;
  }
  deleteEmployeeById(id: EmployeeId): void {
    if (!this.employeeTable.has(id)) {
      console.error("invalid employee id");
      return;
    }

    this.employeeTable.delete(id)!;
  }
  deleteAffiliationById(id: AffiliationId): void {
    if (!this.affiliationTable.has(id)) {
      console.error("invalid affiliation id");
      return;
    }

    this.affiliationTable.delete(id)!;
  }
  setEmployee(dto: Employee) {
    this.employeeTable.set(dto.id, dto);
  }
  setAffiliation(dto: Affiliation) {
    this.affiliationTable.set(dto.id, dto);
  }

  getAllEmployee(): Array<[EmployeeId, Employee]> {
    return [...this.employeeTable.entries()];
  }
}
const database = new PayrollDatabase(); // 在这里一次声明代替单例

// 实现Transaction（操作）
abstract class Transaction {
  abstract execute();
}
// 所有的可执行操作
// 1. 添加雇员 这里考虑两种方案 1. 使用switch一次添加 2. 使用父类子类添加 用模板模式生命多个添加类型
// 为了让添加有可扩展性 使用后者
abstract class AddEmployeeTransaction extends Transaction {
  name: string;
  address: string;

  constructor({ name, address }: { name: string; address: string }) {
    super();
    this.name = name;
    this.address = address;
  }

  // 实际上 只有payMethod的声明不同 将该声明委托下去 其他的都放在上面
  abstract getPayMethod(): EmployeePayBase;

  execute() {
    const newId = uuid();
    const payMethod = this.getPayMethod();
    const employee = new Employee({
      id: newId,
      name: this.name,
      address: this.address,
      payMethod,
    });
    database.setEmployee(employee);
  }
}
class AddHourlyEmployeeTransaction extends AddEmployeeTransaction {
  hourlyRate: number;

  constructor({
    name,
    address,
    hourlyRate,
  }: {
    name: string;
    address: string;
    hourlyRate: number;
  }) {
    super({ name, address });
    this.hourlyRate = hourlyRate;
  }

  getPayMethod() {
    return new HourlyEmployeePay({
      type: EmployeePayTypeEnum.Hourly,
      hourlyRate: this.hourlyRate,
    });
  }
}
class AddSalariedEmployeeTransaction extends AddEmployeeTransaction {
  monthlySalary: number;

  constructor({
    name,
    address,
    monthlySalary,
  }: {
    name: string;
    address: string;
    monthlySalary: number;
  }) {
    super({ name, address });
    this.monthlySalary = monthlySalary;
  }

  getPayMethod() {
    return new SalariedEmployeePay({
      type: EmployeePayTypeEnum.Salaried,
      monthlySalary: this.monthlySalary,
    });
  }
}
class AddCommissionedEmployeeTransaction extends AddEmployeeTransaction {
  monthlySalary: number;
  commissionRate: number;

  constructor({
    name,
    address,
    commissionRate,
    monthlySalary,
  }: {
    name: string;
    address: string;
    commissionRate: number;
    monthlySalary: number;
  }) {
    super({ name, address });
    this.monthlySalary = monthlySalary;
    this.commissionRate = commissionRate;
  }

  getPayMethod() {
    return new CommissionedEmployeePay({
      type: EmployeePayTypeEnum.Commissioned,
      monthlySalary: this.monthlySalary,
      commissionRate: this.commissionRate,
    });
  }
}
// 删除雇员
class DeleteEmployeeTransaction extends Transaction {
  id: string;

  constructor({ id }: { id: EmployeeId }) {
    super();
    this.id = id;
  }

  execute() {
    database.deleteEmployeeById(id);
  }
}
// 添加组织
class AddAffiliationTransaction extends Transaction {
  name: string;
  amount: number;

  constructor({ name, amount }: { name: string; amount: number }) {
    super();
    this.name = name;
    this.amount = amount;
  }

  execute() {
    const newId = uuid();
    const affiliation = new Affiliation({
      id: newId,
      name: this.name,
      amount: this.amount,
    });
    database.setAffiliation(affiliation);
  }
}
// 添加组织
class EmployeeJoinAffiliationTransaction extends Transaction {
  employeeId: EmployeeId;
  affiliationId: AffiliationId;

  constructor({
    employeeId,
    affiliationId,
  }: {
    employeeId: EmployeeId;
    affiliationId: AffiliationId;
  }) {
    super();
    this.employeeId = employeeId;
    this.affiliationId = affiliationId;
  }

  execute() {
    const employee = database.getEmployeeById(this.employeeId);

    if (employee === null) {
      console.error(`Employee ${this.employeeId} doesn't exist`);
      return;
    }

    const affiliation = database.getAffiliationById(this.affiliationId);
    if (affiliation === null) {
      console.error(`Affiliation ${this.affiliationId} doesn't exist`);
      return;
    }

    // 设置组织
    employee.affiliation = affiliation;
  }
}

// 时间卡 销售凭条
class AddTimeCardTransaction extends Transaction {
  id: string;
  timeCard: { time: Date; hours: number };

  constructor({
    id,
    timeCard,
  }: {
    id: EmployeeId;
    timeCard: { time: Date; hours: number };
  }) {
    super();
    this.id = id;
    this.timeCard = timeCard;
  }

  execute() {
    const employee = database.getEmployeeById(this.id);

    if (employee === null) {
      console.error(`Not find specific employee ${this.id}`);
      return;
    }

    const payMethod = employee.payMethod;
    if (!(payMethod.type === EmployeePayTypeEnum.Hourly)) {
      console.error(`Employee ${employee.name} is not a hourly employee`);
      return;
    }

    // 增加工时
    (payMethod as HourlyEmployeePay).addTimeCard(this.timeCard);
  }
}
// 时间卡 销售凭条
class AddCommissionTransaction extends Transaction {
  id: string;
  commission: { time: Date; income: number }; // 创造收入 用于计算奖金

  constructor({
    id,
    commission,
  }: {
    id: EmployeeId;
    commission: { time: Date; income: number };
  }) {
    super();
    this.id = id;
    this.commission = commission;
  }

  execute() {
    const employee = database.getEmployeeById(this.id);

    if (employee === null) {
      console.error(`Not find specific employee ${this.id}`);
      return;
    }

    const payMethod = employee.payMethod;
    if (!(payMethod.type === EmployeePayTypeEnum.Commissioned)) {
      console.error(`Employee ${employee.name} is not a commission employee`);
      return;
    }

    // 增加工时
    (payMethod as CommissionedEmployeePay).addCommission(this.commission);
  }
}

// 添加雇员
enum EmployeePayTypeEnum {
  Hourly,
  Commissioned,
  Salaried,
}

type PayMethodDto =
  | {
      type: EmployeePayTypeEnum.Hourly;
      hourlyRate: number;
    }
  | { type: EmployeePayTypeEnum.Salaried; monthlySalary: number }
  | {
      type: EmployeePayTypeEnum.Commissioned;
      commissionRate: number;
      monthlySalary: number;
    };

// TEMPLATE模式 定义支付方式 取决于employee类型
// 支付方式包含两个实现 一个是employee是否发薪日 一个是发多少
// 为什么没有用策略模式，因为这个行为很固定 即决定了模式后就知道究竟支付多少 而不需要任何组合（如支付方式和支付时间的组合）
abstract class EmployeePayBase {
  constructor(public type: EmployeePayTypeEnum) {}

  abstract isPayDay(time: Date): boolean;
  abstract getSalary(time: Date): number; // 计算在xx时间的工资
}
class HourlyEmployeePay extends EmployeePayBase {
  hourlyRate: number;
  timeCards: Array<{ time: Date; hours: number }> = []; // 钟点工的工时记录

  constructor({
    type,
    hourlyRate,
  }: {
    type: EmployeePayTypeEnum.Hourly;
    hourlyRate: number;
  }) {
    super(type);
    this.hourlyRate = hourlyRate;
  }

  addTimeCard({ time, hours }: { time: Date; hours: number }) {
    this.timeCards.push({ time, hours });
  }

  isPayDay(time: Date): boolean {
    // 每周五支付
    return isFriday(time);
  }

  getSalary(time: Date): number {
    if (!this.isPayDay(time)) {
      return 0;
    }
    // 一周的开始
    const start = startOfWeek(time).getTime();
    const end = endOfWeek(time).getTime();

    // 只有时间范围内的（本周）会被计算工资
    const validTimeCards = this.timeCards.filter(
      (card) => card.time.getTime() >= start && card.time.getTime() < end
    );
    // 超过8h 按照1.5倍工资计算
    const salary = validTimeCards.reduce((acc, curr) => {
      if (curr.hours < 8) {
        return acc + curr.hours * this.hourlyRate;
      }
      return (
        acc + 8 * this.hourlyRate + 1.5 * this.hourlyRate * (curr.hours - 8)
      );
    }, 0);

    // for(let timeCard of this.timeCards.filter())
    return salary;
  }
}
class SalariedEmployeePay extends EmployeePayBase {
  monthlySalary: number; // 固定工资

  constructor({
    type,
    monthlySalary,
  }: {
    type: EmployeePayTypeEnum.Salaried;
    monthlySalary: number;
  }) {
    super(type);
    this.monthlySalary = monthlySalary;
  }

  isPayDay(time: Date): boolean {
    return isLastDayOfMonth(time);
  }

  getSalary(time: Date): number {
    if (!this.isPayDay(time)) {
      return 0;
    }
    return this.monthlySalary;
  }
}
class CommissionedEmployeePay extends EmployeePayBase {
  commissionRate: number;
  monthlySalary: number; // 固定工资
  commissions: Array<{ time: Date; income: number }> = []; // 创造收入 用于计算奖金

  constructor({
    type,
    commissionRate,
    monthlySalary,
  }: {
    type: EmployeePayTypeEnum.Commissioned;
    commissionRate: number;
    monthlySalary: number;
  }) {
    super(type);
    this.commissionRate = commissionRate;
    this.monthlySalary = monthlySalary;
  }

  addCommission({ time, income }: { time: Date; income: number }) {
    this.commissions.push({ time, income });
  }

  // 每月的第1和3个周五（这个需求并不确切 但是先按照这个开发）
  isPayDay(time: Date): boolean {
    const week = getWeekOfMonth(time);
    return (week === 1 || week === 3) && isFriday(time);
  }

  getSalary(time: Date): number {
    if (!this.isPayDay(time)) {
      return 0;
    }

    const end = endOfDay(time).getTime(); // 今天结束
    const start = startOfDay(subDays(time, 14)).getTime(); // 两周前
    const validTimeCards = this.commissions.filter(
      (card) => card.time.getTime() >= start && card.time.getTime() < end
    );
    // 超过8h 按照1.5倍工资计算
    const commissionTotal = validTimeCards.reduce((acc, curr) => {
      return acc + this.commissionRate * curr.income;
    }, 0);
    return this.monthlySalary + commissionTotal;
  }
}

// 由于雇员可以改变属性 因此设置为
class Employee {
  id: EmployeeId;
  name: string;
  address: string;

  affiliation!: IAffiliation;
  payMethod!: EmployeePayBase;

  constructor({
    id,
    name,
    address,
    payMethod,
  }: {
    id: EmployeeId;
    name: string;
    address: string;
    payMethod: EmployeePayBase;
  }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.payMethod = payMethod;

    this.affiliation = new NullAffiliation();
  }

  isPayDay(time: Date): boolean {
    return this.payMethod.isPayDay(time);
  }

  getSalary(time: Date): number {
    if (!this.isPayDay(time)) {
      return 0;
    }
    // 当前工资为薪资减去劳工
    return this.payMethod.getSalary(time) - this.affiliation.getPayAmount();
  }
}

// 工会entity
interface IAffiliation {
  addEmployee: (id: EmployeeId) => void;
  removeEmployee: (id: EmployeeId) => void;
  getPayAmount: () => number;
}

class Affiliation implements IAffiliation {
  id: AffiliationId;
  name: string; // 协会名
  amount: number; // 会费
  employeeSet: Set<EmployeeId> = new Set(); // 用于保存协会成员id

  constructor({
    id,
    name,
    amount,
  }: {
    id: EmployeeId;
    name: string;
    amount: number;
  }) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  }

  addEmployee(id: EmployeeId) {
    this.employeeSet.add(id);
  }
  removeEmployee(id: EmployeeId) {
    if (!this.employeeSet.has(id)) {
      console.error(`${id} not in Affiliation ${this.name}`);
      return;
    }

    this.employeeSet.delete(id);
  }
  getPayAmount() {
    return this.amount;
  }
}

class NullAffiliation implements IAffiliation {
  id: AffiliationId;
  name: string; // 协会名
  amount: number; // 会费

  constructor() {
    this.id = "null";
    this.name = "无";
    this.amount = 0;
  }

  // 空协会 占位用
  addEmployee(id: EmployeeId) {}
  removeEmployee(id: EmployeeId) {}
  getPayAmount() {
    return this.amount;
  }
}

// 整体运行程序
const salaryMap: Map<EmployeeId, number> = new Map();
const now = new Date();
// 实际上应该有一个Application定时运行 这里进行简化
for (const [employeeId, employee] of database.getAllEmployee()) {
  const salary = employee.getSalary(now);
  salaryMap.set(employee.name, salary);
}

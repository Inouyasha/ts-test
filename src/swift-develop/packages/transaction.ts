import { Affiliation } from "./affiliation";
import { database } from "./database";
import { Employee } from "./employee";
import { AffiliationId, EmployeeId, EmployeePayBase, EmployeePayTypeEnum } from "./interface";
import {
  CommissionedEmployeePay,
  HourlyEmployeePay,
  SalariedEmployeePay,
} from "./pay-method";

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

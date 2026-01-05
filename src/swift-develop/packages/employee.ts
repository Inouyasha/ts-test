import { NullAffiliation } from "./affiliation";
import {
  EmployeeId,
  EmployeePayBase,
  IAffiliation,
  IEmployee,
} from "./interface";

// 由于雇员可以改变属性 因此设置为
export class Employee implements IEmployee {
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

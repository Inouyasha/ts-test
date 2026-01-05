import { AffiliationId, EmployeeId, IAffiliation } from "./interface";

export class Affiliation implements IAffiliation {
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

export class NullAffiliation implements IAffiliation {
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

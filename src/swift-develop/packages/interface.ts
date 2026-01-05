export type EmployeeId = string;
export type AffiliationId = string;

// 支付模块
export enum EmployeePayTypeEnum {
  Hourly,
  Commissioned,
  Salaried,
}

export abstract class EmployeePayBase {
  constructor(public type: EmployeePayTypeEnum) {}

  abstract isPayDay(time: Date): boolean;
  abstract getSalary(time: Date): number; // 计算在xx时间的工资
}

export interface IEmployee {
  id: EmployeeId;
  name: string;
  address: string;

  affiliation: IAffiliation;
  payMethod: EmployeePayBase;

  isPayDay: (time: Date) => boolean;
  getSalary: (time: Date) => number;
}

// 工会entity
export interface IAffiliation {
  id: string;
  addEmployee: (id: EmployeeId) => void;
  removeEmployee: (id: EmployeeId) => void;
  getPayAmount: () => number;
}

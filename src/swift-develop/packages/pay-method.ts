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
import { EmployeePayBase, EmployeePayTypeEnum } from "./interface";

export class HourlyEmployeePay extends EmployeePayBase {
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

export class SalariedEmployeePay extends EmployeePayBase {
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

export class CommissionedEmployeePay extends EmployeePayBase {
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

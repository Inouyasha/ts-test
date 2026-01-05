import { NullAffiliation } from "./affiliation";
import { EmployeeId, AffiliationId, IAffiliation, IEmployee } from "./interface";

export class PayrollDatabase {
  employeeTable: Map<EmployeeId, IEmployee> = new Map();
  affiliationTable: Map<AffiliationId, IAffiliation> = new Map();

  getEmployeeById(id: EmployeeId): IEmployee | null {
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
  setEmployee(dto: IEmployee) {
    this.employeeTable.set(dto.id, dto);
  }
  setAffiliation(dto: IAffiliation) {
    this.affiliationTable.set(dto.id, dto);
  }

  getAllEmployee(): Array<[EmployeeId, IEmployee]> {
    return [...this.employeeTable.entries()];
  }
}
export const database = new PayrollDatabase(); // 在这里一次声明代替单例

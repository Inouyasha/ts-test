import { database } from "./database";
import { EmployeeId } from "./interface";

// 整体运行程序
const salaryMap: Map<EmployeeId, number> = new Map();
const now = new Date();
// 实际上应该有一个Application定时运行 这里进行简化
for (const [employeeId, employee] of database.getAllEmployee()) {
  const salary = employee.getSalary(now);
  salaryMap.set(employee.name, salary);
}

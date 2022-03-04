import { head, isNull, isPair, List, list, tail } from "./pair";

type mobile = List<number>;
type branch = List<number>;

function makMobile(left: branch, right: branch) {
  return list(left, right);
}
function makeBranch(length: number, structure: number | mobile) {
  return list(length, structure);
}

// 1
function leftBranch(m: mobile) {
  return head(m);
}
function rightBranch(m: mobile) {
  return head(tail(m));
}
function branchLength(b: branch) {
  return head(b);
}
function branchStructure(b: branch) {
  return head(tail(b));
}
function isMobileStructure(structure: number | mobile) {
  return isPair(structure);
}

function totalWeight(m: mobile) {
  const lbs = branchStructure(leftBranch(m));
  const rbs = branchStructure(rightBranch(m));

  // 如果branch是mobile 就递归计算 如果是重量 直接输出
  return (
    (isMobileStructure(lbs) ? totalWeight(lbs) : lbs) +
    (isMobileStructure(rbs) ? totalWeight(rbs) : rbs)
  );
}

function isBalanced(m: mobile): boolean {
  const lb = leftBranch(m);
  const rb = rightBranch(m);
  const lbs = branchStructure(leftBranch(m));
  const rbs = branchStructure(rightBranch(m));

  // 左边内部是否平衡
  const leftFlag = isMobileStructure(lbs) ? isBalanced(lbs) : true;
  const rightFlag = isMobileStructure(rbs) ? isBalanced(rbs) : true;

  // 如果左右内部都平衡 判断外部是否平衡
  return (
    leftFlag &&
    rightFlag &&
    (branchLength(lb) as any) * totalWeight(lbs) ===
      (branchLength(rb) as any) * totalWeight(rbs)
  );
}


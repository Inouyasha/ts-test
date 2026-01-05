interface Item {
    weight: number;
    value: number;
}

class KnapsackSolver {
    private items: Item[];
    private capacity: number;
    private temperature: number;
    private minTemperature: number;
    private coolingRate: number;
    private currentSolution!: boolean[];
    private bestSolution!: boolean[];
    private currentWeight!: number;
    private currentValue!: number;
    private bestValue!: number;

    constructor(items: Item[], capacity: number) {
        this.items = items;
        this.capacity = capacity;
        // 初始化参数
        this.temperature = 1000;
        this.minTemperature = 1;
        this.coolingRate = 0.95;
    }

    // 随机生成初始解
    private initializeSolution(): boolean[] {
        const solution = Array(this.items.length).fill(false);
        let weight = 0;

        // 随机添加物品直到超过背包容量
        while (true) {
            const idx = Math.floor(Math.random() * this.items.length);
            if (!solution[idx] && weight + this.items[idx].weight <= this.capacity) {
                solution[idx] = true;
                weight += this.items[idx].weight;
            } else {
                break;
            }
        }
        return solution;
    }

    // 计算当前解的价值和重量
    private evaluate(solution: boolean[]): { value: number, weight: number } {
        return solution.reduce((acc, selected, idx) => {
            if (selected) {
                acc.value += this.items[idx].value;
                acc.weight += this.items[idx].weight;
            }
            return acc;
        }, { value: 0, weight: 0 });
    }

    // 在当前解的邻域随机生成新解
    private generateNeighbor(current: boolean[]): boolean[] {
        const neighbor = [...current];
        const idx = Math.floor(Math.random() * neighbor.length);
        
        // 随机翻转一个物品的状态（添加/移除）
        neighbor[idx] = !neighbor[idx];
        
        // 确保解有效（不超过背包容量）
        const { weight } = this.evaluate(neighbor);
        if (weight > this.capacity) {
            // 修复无效解：随机移除物品直到满足容量约束
            let invalidIndices: number[] = [];
            neighbor.forEach((selected, i) => selected && invalidIndices.push(i));
            
            while (weight > this.capacity && invalidIndices.length > 0) {
                const removeIdx = invalidIndices.splice(
                    Math.floor(Math.random() * invalidIndices.length), 
                    1
                )[0];
                neighbor[removeIdx] = false;
            }
        }
        return neighbor;
    }

    // 模拟退火主逻辑
    public solve(): boolean[] {
        // 初始化解
        this.currentSolution = this.initializeSolution();
        const currentEval = this.evaluate(this.currentSolution);
        this.currentWeight = currentEval.weight;
        this.currentValue = currentEval.value;
        
        this.bestSolution = [...this.currentSolution];
        this.bestValue = this.currentValue;

        while (this.temperature > this.minTemperature) {
            // 生成新解并计算目标函数值
            const newSolution = this.generateNeighbor(this.currentSolution);
            const newEval = this.evaluate(newSolution);
            const newValue = newEval.value;

            // 计算目标函数差值（背包问题最大化价值）
            const delta = this.currentValue - newValue; 

            // Metropolis 准则：接受更优解或在一定概率下接受更差解
            if (delta < 0 || Math.random() < Math.exp(-delta / this.temperature)) {
                this.currentSolution = [...newSolution];
                this.currentValue = newValue;
                
                // 更新历史最优解
                if (newValue > this.bestValue) {
                    this.bestSolution = [...newSolution];
                    this.bestValue = newValue;
                }
            }

            // 降低温度
            this.temperature *= this.coolingRate;
        }
        
        return this.bestSolution;
    }
}

// 示例使用
const items: Item[] = [
    { weight: 2, value: 3 },
    { weight: 3, value: 4 },
    { weight: 4, value: 5 },
    { weight: 5, value: 7 },
];
const capacity = 7;

const solver = new KnapsackSolver(items, capacity);
const solution = solver.solve();

console.log("最优解选择:", solution);
console.log("物品详情:");
solution.forEach((selected, idx) => {
    if (selected) {
        console.log(`物品 ${idx + 1}: 重量=${items[idx].weight}, 价值=${items[idx].value}`);
    }
});
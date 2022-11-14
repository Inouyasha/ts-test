/** 
 * 模块路径
 * 
 * [
  'D:\\workspace\\ts-test\\dist\\node-learn\\node_modules',
  'D:\\workspace\\ts-test\\dist\\node_modules',
  'D:\\workspace\\ts-test\\node_modules',
  'D:\\workspace\\node_modules',
  'D:\\node_modules'
]
*/
// console.log(module.paths);

/**  
 * 
 * 
 * [Object: null prototype] {
  '.js': [Function (anonymous)],
  '.json': [Function (anonymous)],
  '.node': [Function (anonymous)]
}
 * 
*/
// console.log(require.extensions);

// require默认path 几个父目录下的文件夹的node_modules文件夹 或 路径引入（时间消耗较长）
const math = require("./math");
console.log(math.add(1, 2));

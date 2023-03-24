/* 
  3.1 An accumulator is a function that is called repeatedly with a single numeric argument and accumulates
  its arguments into a sum. Each time it is called, it returns the currently accumulated sum. Write a
  function make_accumulator that generates accumulators, each maintaining an independent sum. The
  input to make_accumulator should specify the initial value of the sum; for example
*/
function make_accumulator(initial: number) {
  let sum = initial;
  return (n: number) => {
    sum += n;
    console.log(sum);
    return sum;
  };
}
// const test_301 = make_accumulator(5);
// test_301(10); // 15
// test_301(10); // 25

/* 
  3.2 一个类似decorator的函数 输入为单数字输入的function

  监测对应func被调用的次数
*/
function make_monitored(f: (n: number) => any) {
  let count = 0;

  return (input: "how_many_calls" | "reset_count" | number) => {
    if (input === "how_many_calls") {
      return count;
    } else if (input === "reset_count") {
      count = 0;
      return 0;
    } else {
      count++;
      return f(input);
    }
  };
}
// const test_302 = make_monitored((n: number) => Math.sqrt(n));
// console.log(test_302(100));
// console.log(test_302(36));
// console.log(test_302("how_many_calls"));
// console.log(test_302("reset_count"));
// console.log(test_302(25));
// console.log(test_302("how_many_calls"));

/**
 * 3.3 给make_account增加password验证操作
 *
 * @param {*} balance
 * @return {*}
 */
function make_account(balance: number) {
  function withdraw(amount: number) {
    if (balance >= amount) {
      balance = balance - amount;
      return balance;
    } else {
      return "Insufficient funds";
    }
  }
  function deposit(amount: number) {
    balance = balance + amount;
    return balance;
  }
  function dispatch(m: "withdraw" | "deposit") {
    if (m === "withdraw") {
      return withdraw;
    }
    if (m === "deposit") {
      return deposit;
    }
    return (amount: number) => `${m}, unknown request -- make_account`;
  }
  return dispatch;
}
function make_account_3_3(initialBalance: number, password: string) {
  let _password = password;
  let _initialBalance = initialBalance;
  const _account = make_account(_initialBalance);

  return (password: string, order: "withdraw" | "deposit") => {
    if (password !== _password) {
      return (amount: number) => "Incorrect password";
    }

    return _account(order);
  };
}
// const test_303 = make_account_3_3(100, "secret password");
// console.log(test_303("secret password", "withdraw")(60));
// console.log(test_303("secret password", "withdraw")(60));
// console.log(test_303("secret password", "deposit")(60));
// console.log(test_303("secret password1", "deposit")(60));

/**
 * 密码错误超过七次 报错
 *
 * @param {number} initialBalance
 * @param {string} password
 * @return {*}
 */
function make_account_3_4(initialBalance: number, password: string) {
  let _password = password;
  let _initialBalance = initialBalance;
  let _error_count = 0;
  const _account = make_account(_initialBalance);

  return (password: string, order: "withdraw" | "deposit") => {
    if (password !== _password) {
      _error_count++;

      if (_error_count >= 2) {
        throw new Error("call_the_cops");
      }

      return (amount: number) => "Incorrect password";
    }

    _error_count = 0;
    return _account(order);
  };
}
// const test_304 = make_account_3_4(100, "secret password");
// console.log(test_304("secret password1", "withdraw")(60));
// console.log(test_304("secret password1", "withdraw")(60));
// console.log(test_304("secret password1", "deposit")(60));
/// ChangeMaker by Chloé Matthews
/// holds coins: pennies, nickels, dimes, quarters
/// dispenses given amount if able, else returns error

class ChangeMaker {
  constructor(p, n, d, q) {
    this.pennies = p;
    this.nickels = n;
    this.dimes = d;
    this.quarters = q;
    this.totalAttempts = 0;
    this.recentSuccess = null;
  }

  displayAmt() {
    return "this machine contains: " + this.pennies +
      " pennies, " + this.nickels + " nickels, " +
      this.dimes + " dimes, " + this.quarters +
      " quarters";
  }

  displayCoinsUsed(arr) {
    return "dispensed: " + arr[0] + " pennies, " +
      arr[1] + " nickels, " + arr[2] + " dimes, " +
      arr[3] + " quarters";
  }

  error() {
    console.log("error: unable to carry out transaction.");
  }

  getSum() {
    var psum = this.pennies;
    var nsum = this.nickels * 5;
    var dsum = this.dimes * 10;
    var qsum = this.quarters * 25;

    var totalSum = psum + nsum + dsum + qsum;
    return totalSum;
  }

  // records success of most recent attempt
  success(bool) {
    this.totalAttempts += 1;
    if (bool == true) {
      this.recentSuccess = true;
    } else {
      this.recentSuccess = false;
    }
  }

  // machine type option
  easy(amt) {
    var sum = this.getSum();

    if (amt <= sum) {
      try {
        return this.getChange(amt);
      } catch (e) {
        return e;
      }
    } else {
      throw e;
    }
  }

  // machine type option
  picky(amt) {
    var sum = this.getSum();
    var noPe = sum - this.pennies;

    if (noPe >= amt && amt % 5 == 0) {
      return this.getChange(amt);
    } else {
      throw "will not dispense pennies.";
    }
  }

  getChange(amt) {
    var sum = this.getSum();
    var drop = 0;
    var counter = [0,0,0,0];

    if (amt == sum) {
      drop += sum;

      counter[0] = this.pennies;
      this.pennies = 0;
      counter[1] = this.nickels;
      this.nickels = 0;
      counter[2] = this.dimes;
      this.dimes = 0;
      counter[3] = this.quarters;
      this.quarters = 0;
    } else {
      while (drop < amt) {
        if ((amt - drop) >= 25 && this.quarters != 0) {
          drop += 25;
          this.quarters -= 1;
          counter[3] += 1;
        } else if ((amt - drop) >= 10 && this.dimes != 0) {
          drop += 10;
          this.dimes -= 1;
          counter[2] += 1;
        } else if ((amt - drop) >= 5 && this.nickels != 0) {
          drop += 5;
          this.nickels -= 1;
          counter[1] += 1;
        } else if ((amt - drop) >= 1 && this.pennies != 0) {
          drop += 1;
          this.pennies -= 1;
          counter[0] += 1;
        } else {
          this.pennies += counter[0];
          this.nickels += counter[1];
          this.dimes += counter[2];
          this.quarters += counter[3];
          throw "error: this machine does not have the appropriate coins."
        }
      }
    }

    return this.displayCoinsUsed(counter);
  }

  runChangeMaker(amt, type) {
    console.log(this.displayAmt());
    console.log("attempting to dispense " + amt + " cents, mode: "
      + type);

    if (type == "picky") {
      try {
        console.log(this.picky(amt));
        this.success(true);
      } catch (e) {
        console.log(e);
        this.success(false);
      } finally {
        let sum = this.getSum();
        return sum + " cent(s) remaining";
      }
    } else if (type = "easy") {
      try {
        console.log(this.easy(amt));
        this.success(true);
      } catch (e) {
        return this.error();
        this.success(false);
      } finally {
        let sum = this.getSum();
        return sum + " cent(s) remaining";
      }
    }

    this.totalAttempts += 1;
  }
}

function transact(ChangeMaker, amt, type) {
  console.log(ChangeMaker.runChangeMaker(amt, type));
}

// randomized variables to be passed as params to randoCM
var x = Math.floor(Math.random() * 20);
var y = Math.floor(Math.random() * 20);
var z = Math.floor(Math.random() * 20);
var a = Math.floor(Math.random() * 20);

// test change maker with given parameters
const testCM = new ChangeMaker(40, 6, 12, 8);
// test change maker with random parameters
const randoCM = new ChangeMaker(x, y, z, a);
// test change maker with exact change
const perfCM = new ChangeMaker(12, 2, 7, 3);

// test cases
function runTests() {
  console.log("test change maker: ");
  transact(testCM, 30, "easy");
  transact(testCM, 261, "picky");
  transact(testCM, 108, "easy");
  transact(testCM, 15, "picky");
  transact(testCM, 243, "easy");

  console.log("random test change maker: ");
  transact(randoCM, 19, "easy");
  transact(randoCM, 305, "picky");
  transact(randoCM, 6, "easy");
  transact(randoCM, 87, "picky");
  transact(randoCM, 103, "easy");

  // should execute with no remainder
  console.log("perfect change maker: ");
  transact(perfCM, 167, "easy");
}

runTests();

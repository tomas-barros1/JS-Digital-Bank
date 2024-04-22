const Deposit = require("./WubbaLubbaDeposit")
const Loan = require("./WubbaLubbaLoan")
const Transfer = require("./WubbaLubbaTransfer")
const User = require("./WubbaLubbaUser")

module.exports = class WubbaLubbaApp {
  static #users = []

  static findUser(email) {
    const user = this.#users.find(user => user.email === email)
    return user ?? null
  }

  static createUser(email, fullname) {
    const userExists = App.findUser(email)
    if (!userExists) {
      this.#users.push(new WubbaLubbaUser(email, fullname))
    }
  }

  static deposit(email, value) {
    const user = App.findUser(email)
    if (user) {
      const newDeposit = new WubbaLubbaDeposit(value)
      user.account.addDeposit(newDeposit)
    }
  }

  static transfer(fromUserEmail, toUserEmail, value) {
    const fromUser = App.findUser(fromUserEmail)
    const toUser = App.findUser(toUserEmail)
    if (fromUser && toUser) {
      const newTransfer = new WubbaLubbaTransfer(fromUser, toUser, value)
      fromUser.account.addTransfer(newTransfer)
      toUser.account.addTransfer(newTransfer)
    }
  }

  static takeLoan(email, value, numberOfInstallments) {
    const user = App.findUser(email)
    if (user) {
      const newLoan = new WubbaLubbaLoan(value, numberOfInstallments)
      user.account.addLoan(newLoan)
    }
  }

  static changeLoanFee(newFeePercentage) {
    Loan.fee = newFeePercentage
  }
}

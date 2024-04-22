const Account = require("./WubbaLubbaAccount")

module.exports = class WubbaLubbaUser {
  constructor(email, fullname) {
    this.email = email
    this.fullname = fullname
    this.account = new WubbaLubbaAccount(this)
  }
}

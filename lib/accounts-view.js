'use babel';

const fs = require('fs');
const path = require('path');
const PasswordSafe = require('password-safe');
const safe = new PasswordSafe({ password: 'password' });

export default class AccountsView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('jutge-for-atom', 'accounts');

    this.accounts = [];
    this.loadAccounts();
    this.accounts = [{email:'1', password:'2'}, {email:'3', password:'4'}]



    // fs.readFile(path.join(__dirname, '..', 'views', 'login.html'), "utf-8", (err, data) => {
    //   if (!err)
    //     this.element.innerHTML = data;
    //   else
    //     console.log(err);
    // });
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    //TODO return current account
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    this.saveAccounts();
  }

  getElement() {
    return this.element;
  }

  loadAccounts() {
    const enc = fs.readFileSync(path.join(__dirname, '..', 'accounts.safe'));
    safe.load(enc, (err, header, records) => {
      for (let i = 0; i < records.length; i++) {
        const record = records[i];
        this.accounts.push({
          email: record.getTitle(),
          password: record.getPassword()
        });
      }
    });
    console.log(this.accounts);
  }

  saveAccounts() {
    const header = safe.createHeaderRecord();
    const records = [];
    for (let i = 0; i < this.accounts.length; i++) {
      records.push(safe.createDatabaseRecord(this.accounts[i].email,
        this.accounts[i].password))
    }
    fs.writeFile(path.join(__dirname, '..', 'accounts.safe'), safe.store(header, records))
  }

}

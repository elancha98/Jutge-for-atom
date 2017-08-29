'use babel';

const fs = require('fs-plus');
const path = require('path');
const PasswordSafe = require('password-safe');
const safe = new PasswordSafe({ password: 'password' });

export default class AccountsView {

  constructor(serializedState, login) {
    this._accounts = [];
    this._loadAccounts();
    this._selectedIndex = serializedState;
    this._login = login;

    if (this._accounts.length > 0)
      this._createAccountsPanel();
    else
      this._createLoginPanel();
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return this._selectedIndex;
  }

  // Tear down any state and detach
  destroy() {
    this._saveAccounts();
    this._destroyPanel();
  }

  isVisible() {
    return this._panel.isVisible();
  }

  hide() {
    return this._panel.hide();
  }

  show() {
    return this._panel.show();
  }

  _loadAccounts() {
    const p = path.join(__dirname, '..', 'accounts.safe')
    if (fs.existsSync(p)) {
      safe.load(fs.readFileSync(p), (err, header, records) => {
        for (let i = 0; i < records.length; i++) {
          const record = records[i];
          this._accounts.push({
            email: record.getTitle(),
            password: record.getPassword()
          });
        }
      });
    }
  }

  _saveAccounts() {
    const header = safe.createHeaderRecord();
    const records = [];
    for (let i = 0; i < this._accounts.length; i++) {
      records.push(safe.createDatabaseRecord(this._accounts[i].email,
        this._accounts[i].password))
    }
    fs.writeFileSync(path.join(__dirname, '..', 'accounts.safe'), safe.store(header, records))
  }

  _createLoginPanel() {
    this._destroyPanel();
    this._element = document.createElement('div');
    this._element.classList.add('jutge-for-atom');

    fs.readFile(path.join(__dirname, '..', 'views', 'login.html'), "utf-8", (err, data) => {
      if (err) {
        console.error(err)
        return;
      }
      this._element.innerHTML = data;
      this._element.querySelector('#email').addEventListener("keydown", (e) => {
        if (e.keyCode == 9)
          this._element.querySelector('#password').focus();
      });
      this._element.querySelector('#submit').addEventListener("click", () => {
        const email = this._element.querySelector('#email').value;
        const pass = this._element.querySelector('#password');
        if (!this._login(email, pass.value)) {
           for (element of this._element.getElementsByClassName('form-group')) {
             element.classList.add('has-error');
           }
           pass.value = "";
        } else
          this._destroyPanel();
      });
    });

    this._panel = atom.workspace.addModalPanel({
      item: this._element,
      visible: false
    });
  }

  _createAccountsPanel() {
    this._destroyPanel();
  }

  _destroyPanel() {
    if (this._panel) {
      this._element.remove();
      this._panel.destroy();
    }
  }
}

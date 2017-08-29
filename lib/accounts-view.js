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
    const p = path.join(__dirname, '..', 'accounts.json')
    if (fs.existsSync(p)) {
      this._accounts = require(p);
    }
  }

  _saveAccounts() {
    fs.writeFileSync(path.join(__dirname, '..', 'accounts.json'),
      JSON.stringify(this._accounts));
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
      this._element.querySelector('#remember').addEventListener("click", () => {
        this._element.querySelector('#myPopup').classList.add("show");
        setTimeout(() => {
          this._element.querySelector('#myPopup').classList.remove("show");
        }, 1500);
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
    this._element = document.createElement('div');
    this._element.classList.add('jutge-for-atom');

    fs.readFile(path.join(__dirname, '..', 'views', 'accounts.html'), "utf-8", (err, data) => {
      if (err) {
        console.error(err)
        return;
      }
      this._element.innerHTML = data;
    });

    this._panel = atom.workspace.addModalPanel({
      item: this._element,
      visible: false
    });
  }

  _destroyPanel() {
    if (this._panel) {
      this._element.remove();
      this._panel.destroy();
    }
  }
}

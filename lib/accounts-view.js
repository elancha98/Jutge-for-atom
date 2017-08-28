'use babel';

const fs = require('fs');
const path = require('path');

export default class AccountsView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('jutge-for-atom', 'accounts');

    console.log(this.element.innerHTML)

    fs.readFile(path.join(__dirname, '..', 'views', 'login.html'), "utf-8", (err, data) => {
      if (!err)
        this.element.innerHTML = data;
      else
        console.log(err);
    });

  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}

'use babel';

export default class AccountsView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('jutge-for-atom', 'accounts');

    // Create message element
    const title = document.createElement('h2');
    title.textContent = 'Please Log in to your Jutge account';
    title.classList.add('title');
    this.element.appendChild(title);
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

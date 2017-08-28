'use babel';

export default class JutgeForAtomView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('jutge-for-atom');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The JutgeForAtom package is Alive! It\'s ALIVE! \n Test text';
    message.classList.add('message');
    this.element.appendChild(message);
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

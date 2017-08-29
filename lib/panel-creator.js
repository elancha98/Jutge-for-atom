'use babel';

const path =  require('path');
const fs = require('fs-plus');

export default class PanelView {

    constructor(viewname, visible=false) {
      this.element = document.createElement('div');
      this.element.classList.add('jutge-for-atom');

      fs.readFile(path.join(__dirname, '..', 'views', viewname, '.html'), "utf-8", (err, data) => {
        if (!err)
          this.element.innerHTML = data;
        else
          console.log(err);
      });

      this.panel = atom.workspace.addModalPanel({
        item: this.element,
        visibility: visible
      })
    }

    appendChild(child) {
      this.element.appendChild(child);
    }

    show() {
      this.panel.show();
    }

    hide() {
      this.panel.hide();
    }

    isVisible() {
      return this.panel.isVisible();
    }
}

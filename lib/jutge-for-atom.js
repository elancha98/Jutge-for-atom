'use babel';

import JutgeForAtomView from './jutge-for-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  jutgeForAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jutgeForAtomView = new JutgeForAtomView(state.jutgeForAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jutgeForAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jutge-for-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jutgeForAtomView.destroy();
  },

  serialize() {
    return {
      jutgeForAtomViewState: this.jutgeForAtomView.serialize()
    };
  },

  toggle() {
    console.log('JutgeForAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

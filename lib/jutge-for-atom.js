'use babel';

import AccountsView from './accounts-view';
import JutgeScrapper from './jutge-scrapper';
import { CompositeDisposable } from 'atom';

const fs = require('fs');

export default {

  accountsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.accountsView = new AccountsView(state.accountsState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.accountsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jutge-for-atom:toggle': () => {this.toggle()}
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.accountsView.destroy();
  },

  serialize() {
    return {
      accountsState: this.accountsView.serialize()
    };
  },

  toggle() {
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

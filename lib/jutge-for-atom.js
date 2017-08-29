'use babel';

import AccountsView from './accounts-view';
import JutgeScrapper from './jutge-scrapper';
import { CompositeDisposable } from 'atom';

export default {

  accountsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this._accountsView = new AccountsView(state.accountsState, this._login);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this._subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'jutge-for-atom:toggle': () => { this._toggle(); }
    }));
  },

  deactivate() {
    this._subscriptions.dispose();
    this._accountsView.destroy();
  },

  serialize() {
    return {
      accountsState: this._accountsView.serialize()
    };
  },

  _login(email, password) {
    console.log(email, password);
    return false;
  },

  _toggle() {
    if (this._accountsView.isVisible())
      this._accountsView.hide();
    else
      this._accountsView.show();
  }

};

'use babel';

const request = require('superagent').agent();

export default class JutgeScrapper {

  constructor(mail, pass) {
    var url = 'https://api.github.com/repos/visionmedia/superagent';
    request.get('https://jutge.org').end((err, res) => {
      const form = 'email=' + mail.replace('@', '%40') + '&password=' + pass + '&submit='

      request.post('https://jutge.org/')
        .set('User-Agent','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/60.0.3112.78 Chrome/60.0.3112.78 Safari/537.36')
        .type('application/x-www-form-urlencoded')
        .send(form)
        .end((err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          // Now request is logged in jutge

        });
    });
  }

  serialize() {
    //TODO return user and password encrypted
  }

  destroy() {
    this.element.remove();
  }

}

'use babel';

const request = require('superagent').agent();

export default class JutgeScrapper {

  constructor(user, pass) {
    var url = 'https://api.github.com/repos/visionmedia/superagent';
    request.get('https://jutge.org').end((err, res) => {
      var form = {
        'email': 'dean.zhu%40est.fib.upc.edu',
        'password': '123456789',
        'submit': null
      }

      // scrape hidden input values
      var name_regex = /name="(.*?)"/;
        var value_regex = /value="(.*?)"/;
        var hidden_regex = /<input.*type="hidden".*?>/g;
      while ((result = hidden_regex.exec(res.text)) !== null){
        var n = name_regex.exec(result[0]);
        var v = value_regex.exec(result[0]);
        form[n[1]]=v[1];
      }

      request.post('https://jutge.org/')
        .set('User-Agent','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/60.0.3112.78 Chrome/60.0.3112.78 Safari/537.36')
        .type('application/x-www-form-urlencoded')
        .send('email=dean.zhu%40est.fib.upc.edu&password=123456789&submit=')
        .end((err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(res.text);

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

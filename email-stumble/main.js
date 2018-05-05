const { Browser, run, sleep } = require('automatonic');
run(function*() {
  const I = new Browser();
  I.goto('https://google.com');

  // let's give 'em a second to settle
  yield sleep(1000);

  // do a search
  I.type('#lst-ib', 'automatonic\n');
  I.click('button[name=btnG]');

  // wait for a result and grab its title
  I.waitFor('h3.r a');
  const first = yield I.execute(function() {
    return document.querySelector('h3.r a').innerText;
  });

  if (~first.toLowerCase().indexOf('wikipedia')) {
    console.log("hey look, it's a Wikipedia link");
  } else {
    console.log("it's not a Wikipedia link, let's click it");
    I.click('h3.r a');
  }

  yield sleep(20000);
  I.close();
}).then(null, err => {
  console.error('OH NOES!', err);
});
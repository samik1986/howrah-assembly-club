fetch('https://xkcd.vercel.app/?comic=latest')
  .then(res => res.json())
  .then(data => console.log('XKCD:', data))
  .catch(e => console.error('XKCD Error:', e.message));

fetch('https://monkeyuser-api.ridvanaltun.vercel.app/api/comics/latest')
  .then(res => res.json())
  .then(data => console.log('MonkeyUser:', data))
  .catch(e => console.error('Monkey Error:', e.message));

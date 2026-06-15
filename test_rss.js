const urls = [
  'https://bengali.abplive.com/home/feed',
  'https://zeenews.india.com/bengali/india.xml',
  'https://zeenews.india.com/hindi/india.xml',
  'https://www.jagran.com/rss/news/national.xml',
  'https://www.amarujala.com/rss/breaking-news.xml',
  'https://feeds.bbci.co.uk/bengali/rss.xml',
  'https://feeds.bbci.co.uk/hindi/rss.xml'
];

urls.forEach(url => {
  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`)
    .then(res => res.json())
    .then(data => console.log(url, data.status))
    .catch(err => console.log(url, 'Error'));
});

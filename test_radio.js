fetch('https://de1.api.radio-browser.info/json/stations/search?name=Vividh%20Bharati&limit=5')
  .then(res => res.json())
  .then(data => {
    console.log("Vividh:", data.map(s => s.url));
  });

fetch('https://de1.api.radio-browser.info/json/stations/search?name=All%20India%20Radio&limit=5')
  .then(res => res.json())
  .then(data => {
    console.log("AIR:", data.map(s => s.url));
  });

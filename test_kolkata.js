fetch('https://de1.api.radio-browser.info/json/stations/search?name=Kolkata')
  .then(res => res.json())
  .then(data => {
    console.log("Kolkata:", data.map(s => s.name + ' | ' + s.url_resolved));
  });

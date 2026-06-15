fetch('https://de1.api.radio-browser.info/json/stations/search?name=Akashvani')
  .then(res => res.json())
  .then(data => {
    const mp3s = data.filter(s => s.url_resolved.includes('.mp3') || !s.url_resolved.includes('.m3u8'));
    console.log("Akashvani non-m3u8:", mp3s.map(s => s.name + ' - ' + s.url_resolved));
  });

fetch('https://de1.api.radio-browser.info/json/stations/search?language=bengali')
  .then(res => res.json())
  .then(data => {
    console.log("Bengali Radios:", data.slice(0, 10).map(s => s.name + ' - ' + s.url_resolved));
  });

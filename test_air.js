fetch('https://air.pc.cdn.bitgravity.com/air/live/pbaudio001/playlist.m3u8')
  .then(res => console.log('HTTPS Supported:', res.status))
  .catch(err => console.error('Error:', err.message));

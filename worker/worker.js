self.addEventListener('message', e => {
  if (e.data.type === 'start') {
    console.log('触发worker start')
    setTimeout(() => {
      self.postMessage('from worker')
    }, 500);
  }
});

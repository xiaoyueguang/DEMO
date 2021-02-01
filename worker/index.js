const button = document.getElementById('button');
const close = document.getElementById('close');

const worker = new Worker('./worker.js');
worker.addEventListener('error', (err) => {
  console.log(err);
});

worker.addEventListener('message', e => {
  alert(e.data);
});

button.addEventListener('click', () => {
  worker.postMessage({ type: 'start' });
})

close.addEventListener('click', () => {
  worker.terminate();
})
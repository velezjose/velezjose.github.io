$(document).ready(() => {
  let $images = $('#img-slideshow').children('span');

  let indexes = [0, 1, 2, 3, 4];
  let len = indexes.length;
  let idx = 0;

  setInterval(() => {
    let curr = indexes[idx];
    let prev = indexes[(idx + 1) % len];
    $images[curr].hidden = true;
    $images[prev].hidden = false;
    idx += 1;
    idx %= len;
  }, 5000)

});

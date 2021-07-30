export default function debounce(func, time = 100) {
  let timer;
  return function (event) {
    clearTimeout(timer);
    timer = setTimeout(func, time, event);
  };
}

export default function getDate() {
  const date = new Date();
  return [
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
  ].reduce((acc, item, i) => {
    return (
      acc +
      (Math.floor(item / 10) ? "" : "0") +
      String(item) +
      (i < 2 ? "-" : "")
    );
  }, "");
}

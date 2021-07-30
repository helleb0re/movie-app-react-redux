const convertVoteCount = (voteCount) => {
  const voteCountStr = String(voteCount);

  let res = "";

  for (let i = voteCountStr.length; i > -1; i -= 3) {
    if (i - 3 > 0) {
      res = " " + voteCountStr.slice(i - 3, i) + res;
    } else {
      res = voteCountStr.slice(0, i) + res;
    }
  }
  return res;
};

const convertVoteAverage = (voteAverage) => {
  const voteAverageStr = String(Math.round(voteAverage * 10) / 10);
  return voteAverageStr.length > 1 ? voteAverageStr : voteAverageStr + ".0";
};

export { convertVoteCount, convertVoteAverage };

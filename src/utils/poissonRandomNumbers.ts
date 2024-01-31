export function generateArrivalTimes(
  lambda: number,
  numArrivals: number
): number[] {
  const arrivalTimes: number[] = [];
  let currentTime = 0;

  for (let i = 0; i < numArrivals; i++) {
    if(i === 0){
      arrivalTimes.push(currentTime);
      continue;  
    }
    const interArrivalTime = generatePoissonRandomNumber(lambda);
    currentTime += interArrivalTime;
    arrivalTimes.push(currentTime);
  }

  return arrivalTimes;
}

function generatePoissonRandomNumber(lambda: number): number {
  let k = 0;
  let p = 1;
  const L = Math.exp(-lambda);

  do {
    k++;
    const u = Math.random();
    p *= u;
  } while (p > L);

  return k - 1;
}

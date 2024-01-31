export function generateServiceTime(mu: number, numCustomers: number): number[] {
  const serviceTimes: number[] = [];

  for (let i = 0; i < numCustomers; i++) {
    const serviceTime = generateExponentialRandomNumber(mu);
    serviceTimes.push(serviceTime);
  }

  return serviceTimes;
}

function generateExponentialRandomNumber(mu: number): number {
  return Math.round(-Math.log(Math.random()) * mu) + 1;
}

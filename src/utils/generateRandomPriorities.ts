interface LCGParameters {
  seed: number;
  a: number;
  c: number;
  m: number;
  count: number;
}

export function generateRandomPriorities({
  seed,
  a,
  c,
  m,
  count,
}: LCGParameters): number[] {
  const priorities: number[] = [];
  let currentSeed = seed;

  for (let i = 0; i < count; i++) {
    currentSeed = (a * currentSeed + c) % m;
    const priority = (currentSeed % 3) + 1;
    priorities.push(priority);
  }

  return priorities;
}

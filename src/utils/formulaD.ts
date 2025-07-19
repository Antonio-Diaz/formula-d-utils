export interface GearInfo {
  min: number;
  max: number;
  dice: number[];
}

export const gears: Record<number, GearInfo> = {
  1: { min: 1, max: 2, dice: [1, 2] },
  2: { min: 2, max: 4, dice: [2, 3, 4] },
  3: { min: 4, max: 8, dice: [4, 5, 6, 7, 8] },
  4: { min: 7, max: 12, dice: [7, 8, 9, 10, 11, 12] },
  5: { min: 11, max: 20, dice: [11,12,13,14,15,16,17,18,19,20] },
  6: { min: 21, max: 30, dice: [21,22,23,24,25,26,27,28,29,30] },
};

export function getGearRange(gear: number) {
  return gears[gear];
}

export function probabilityToReach(gear: number, distance: number) {
  const { dice } = gears[gear];
  const total = dice.length;
  const under = dice.filter((d) => d < distance).length / total;
  const exact = dice.filter((d) => d === distance).length / total;
  const over = dice.filter((d) => d > distance).length / total;
  return { under, exact, over };
}

export function suggestGear(distance: number) {
  let best = 1;
  let minOver = Infinity;
  for (const g of Object.keys(gears).map(Number)) {
    const { max } = gears[g];
    if (max >= distance && max < minOver) {
      best = g;
      minOver = max;
    }
  }
  return best;
}

export function rollGear(gear: number) {
  const { dice } = gears[gear];
  const index = Math.floor(Math.random() * dice.length);
  return dice[index];
}


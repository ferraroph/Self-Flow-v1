const letterValues: { [key: string]: number } = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
};

const vowels = ['a', 'e', 'i', 'o', 'u'];

function sumDigits(num: number): number {
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}

function reduceToSingleDigit(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = sumDigits(num);
  }
  return num;
}

export function calculateMotivationNumber(name: string): number {
  let sum = 0;
  for (const char of name.toLowerCase()) {
    if (vowels.includes(char)) {
      sum += letterValues[char] || 0;
    }
  }
  return reduceToSingleDigit(sum);
}

export function calculateImpressionNumber(name: string): number {
  let sum = 0;
  for (const char of name.toLowerCase()) {
    if (!vowels.includes(char) && letterValues[char]) {
      sum += letterValues[char];
    }
  }
  return reduceToSingleDigit(sum);
}

export function calculateExpressionNumber(name: string): number {
  let sum = 0;
  for (const char of name.toLowerCase()) {
    sum += letterValues[char] || 0;
  }
  return reduceToSingleDigit(sum);
}

export function calculateDestinyNumber(birthDate: Date): number {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();
  const sum = day + month + year;
  return reduceToSingleDigit(sum);
}

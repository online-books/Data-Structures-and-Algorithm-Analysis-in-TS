interface Coordinate {
  x: number;
  y: number;
}

function getDist(pointA: Coordinate, pointB: Coordinate): number {
  return Math.sqrt(
    Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2)
  );
}

export function minDistance(points: Coordinate[]): number {
  const xSorted = points.sort((a, b) => a.x - b.x);
  function helper(start: number, end: number) {
    if (end - start === 1) {
      return -1;
    }
    const middle = Math.floor((start + end) / 2);
    const dl = helper(start, middle);
    const dr = helper(middle, end);
    let min: number;
    if (dl === -1 && dr === -1) {
      min = getDist(xSorted[start], xSorted[middle]);
    } else if (dl === -1) {
      min = dr;
    } else if (dr === -1) {
      min = dl;
    } else {
      min = Math.min(dl, dr);
    }
    const border = (xSorted[middle - 1].x + xSorted[middle].x) / 2;
    let minDist = min;
    for (let i = start; i < end; i++) {
      const pl = xSorted[i];
      if (pl.x >= border - min && pl.x <= border + min) {
        for (let j = i + 1; j < end; j++) {
          const pr = xSorted[j];
          if (pr.x <= border + min && pr.y <= pl.y + min) {
            const dist = getDist(pl, pr);
            if (minDist > dist) {
              minDist = dist;
            }
          }
        }
      }
    }
    return minDist;
  }
  return helper(0, xSorted.length);
}

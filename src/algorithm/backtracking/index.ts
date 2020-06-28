/**
 * 收费公路重建问题
 * 设输入满足条件：distance.length = pointNum*(pointNum-1)/2;
 * 设x1=0，即第一个点在原点处，且distance按升序排列
 * @param distance
 * @param pointNum
 */
export function turnpike(
  distance: number[],
  pointNum: number
): number[] | null {
  const { length } = distance;
  if (!length) {
    return null;
  }
  if (length === 1) {
    return [0, ...distance];
  }
  if (length !== (pointNum * (pointNum - 1)) / 2) {
    return null;
  }
  const result: number[] = new Array(pointNum).fill(0);
  result[pointNum - 1] = distance.pop()!;
  result[pointNum - 2] = distance.pop()!;
  const place = (left: number, right: number): boolean => {
    if (left > right) {
      return true;
    }
    const rightNumber = distance.pop()!;
    const stack: { index: number; value: number }[] = [];
    let valid = true;
    for (let i = 1; i < pointNum; i++) {
      if (i < left || i > right) {
        const diff = Math.abs(rightNumber - result[i]);
        const index = distance.findIndex((val) => val === diff);
        if (index === -1) {
          valid = false;
          break;
        } else {
          distance.splice(index, 1);
          stack.push({ index, value: diff });
        }
      }
    }
    if (valid) {
      result[right] = rightNumber;
      valid = place(left, right - 1);
    }

    if (!valid) {
      while (stack.length) {
        const item = stack.pop()!;
        distance.splice(item.index, 0, item.value);
      }
      distance.push(rightNumber);
      const leftNumber = result[pointNum - 1] - rightNumber;
      const leftNumberIndex = distance.findIndex((val) => val === leftNumber);
      if (leftNumberIndex !== -1) {
        valid = true;
        stack.length = 0;
        distance.splice(leftNumberIndex, 1);
        for (let i = 1; i < pointNum; i++) {
          if (i < left || i > right) {
            const diff = Math.abs(leftNumber - result[i]);
            const index = distance.findIndex((val) => val === diff);
            if (index === -1) {
              valid = false;
              break;
            } else {
              distance.splice(index, 1);
              stack.push({ index, value: diff });
            }
          }
        }
        if (valid) {
          result[left] = leftNumber;
          valid = place(left + 1, right);
        }
        if (!valid) {
          while (stack.length) {
            const item = stack.pop()!;
            distance.splice(item.index, 0, item.value);
          }
          distance.splice(leftNumberIndex, 0, leftNumber);
        }
      }
    }
    return valid;
  };
  const diff = result[pointNum - 1] - result[pointNum - 2];
  const index = distance.findIndex((val) => val === diff);
  if (index > -1) {
    distance.splice(index, 1);
    const found = place(1, pointNum - 3);
    if (found) {
      return result;
    }
  }
  return null;
}

/**
 * 极小极大三连游戏棋算法
 */
export class TicTacToe {
  private board: string[];
  private readonly SIZE = 9;
  private readonly WIN = 1;
  private readonly DRAW = 0;
  private readonly LOSS = -1;
  private readonly COM_SIGN: string = "*";
  private readonly HUM_SIGN: string = "+";
  private comp: {
    value: number;
    bestMove: number;
  };
  private hum: {
    value: number;
    bestMove: number;
  };

  constructor() {
    const { SIZE } = this;
    this.board = new Array(SIZE).fill(0);
  }
  private findCompMove() {
    const {
      hum,
      comp,
      DRAW,
      WIN,
      LOSS,
      SIZE,
      board,
      HUM_SIGN,
      COM_SIGN,
    } = this;
    if (this.fullBoard()) {
      hum.value = DRAW;
    } else if (this.immediateWin(HUM_SIGN, hum.bestMove)) {
      hum.value = WIN;
    } else {
      hum.value = LOSS;
      for (let i = 0; i < SIZE; i++) {
        if (!board[i]) {
          board[i] = COM_SIGN;
          this.findHumanMove();
          board[i] = "";
          if (comp.value > hum.value) {
            hum.value = comp.value;
            hum.bestMove = i;
          }
        }
      }
    }
  }
  private findHumanMove() {
    const {
      hum,
      comp,
      DRAW,
      WIN,
      LOSS,
      SIZE,
      board,
      COM_SIGN,
      HUM_SIGN,
    } = this;
    if (this.fullBoard()) {
      comp.value = DRAW;
    } else if (this.immediateWin(COM_SIGN, comp.bestMove)) {
      comp.value = WIN;
    } else {
      comp.value = LOSS;
      for (let i = 0; i < SIZE; i++) {
        if (!board[i]) {
          board[i] = HUM_SIGN;
          this.findCompMove();
          board[i] = "";
          if (comp.value > hum.value) {
            comp.value = hum.value;
            comp.bestMove = i;
          }
        }
      }
    }
  }
  private fullBoard(): boolean {
    return this.board.every((val) => !!val);
  }
  private immediateWin(sign: string, bestMove: number): boolean {
    return false;
  }
}

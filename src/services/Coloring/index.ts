export const coloringTrue = (
  dataNode: any,
  v: any,
  i: number,
  color: number
) => {
  for (let j = 0; j < dataNode.length; j++)
    if (dataNode[i][j] && v[j] === color) return 0;
  return 1;
};

export const coloringOne = (dataNode: any, v: any, color: number) => {
  let count = 0;
  for (let i = 0; i < dataNode.length; i++)
    if (!v[i] && coloringTrue(dataNode, v, i, color)) {
      v[i] = color;
      count++;
    }
  return count;
};

export const coloring = (dataNode: any) => {
  let v: any = [];
  for (let i = 0; i < dataNode.length; i++) v[i] = 0; //chưa có đỉnh nào được tô
  let colorNumber = 0;
  let count = 0;
  while (count < dataNode.length) {
    colorNumber++;
    count += coloringOne(dataNode, v, colorNumber);
  }
  return {
    colorNumber: colorNumber,
    arrayColor: v,
  };
};

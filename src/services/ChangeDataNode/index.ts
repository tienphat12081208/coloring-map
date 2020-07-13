const checkInclude = (value: number, random: number, firstValue: number) => {
  const arrayValue = [];
  let result = false;
  for (let i = value - firstValue; i < value + firstValue; i++) {
    arrayValue.push(i);
  }
  if (arrayValue.includes(random)) {
    return (result = true);
  }
  return result;
};

export const changeDataNode = (dataNode: any, dataName: any) => {
  const responseData: any = [];
  for (let i = 0; i < dataNode.length; i++) {
    let ranDom = Math.floor(Math.random() * 900) + 100;
    let ranDom2 = Math.floor(Math.random() * 600) + 50;
    if (i >= 1) {
      while (
        checkInclude(responseData[i - 1].position.x, ranDom, 100) &&
        checkInclude(responseData[i - 1].position.y, ranDom2, 50)
      ) {
        ranDom = Math.floor(Math.random() * 900) + 100;
        ranDom2 = Math.floor(Math.random() * 600) + 50;
      }
    }

    responseData.push({
      data: { id: i, label: dataName[i], type: i },
      position: { x: ranDom, y: ranDom2 },
    });
  }
  for (let i = 0; i < dataNode.length; i++) {
    for (let j = 0; j < dataNode.length; j++) {
      if (dataNode[i][j] === 1) {
        responseData.push({
          data: { source: i, target: j },
        });
      }
    }
  }
  return {
    responseData: responseData,
  };
};

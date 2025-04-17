function isDataObject(data: any) {
  return typeof data === "object" && data !== null;
}

export function convertTextArray(textArray: Array<any>) {
  return textArray.map((_data: any) =>
    isDataObject(_data) ? JSON.stringify(_data, null, "\t") : _data,
  );
}

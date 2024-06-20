export function convertTextArray(textArray: Array<any>) {
  return textArray.map(function (text: string | object) {
    if (typeof text === 'object') {
      return JSON.stringify(text, null, '\t') + '\n';
    }

    return text;
  });
}

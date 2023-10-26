export function convertTextArray(textArray: Array<any>) {
	return textArray.map(function (_msg: string | object) {
		if (typeof _msg === 'object') {
			return JSON.stringify(_msg, null, '\t') + '\n';
		}

		return _msg;
	});
}

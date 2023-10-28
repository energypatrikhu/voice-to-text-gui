export interface Console {
	severity: 'Error' | 'Info' | 'Warning';
	type: 'Normal' | 'Debug';
	timestamp: number;
	dateTime: string;
	textArray: string[];
	lang: 'json' | 'txt';
}

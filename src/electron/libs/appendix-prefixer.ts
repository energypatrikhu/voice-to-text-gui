import { __app } from './app.js';

// const APPENDIX_MAP = ['t', 'e', 'ban', 'ben', 'ra', 're', 'ból', 'ből', 'ból', 'ből', 'tó', 'től', 'val', 'vel', 'vá', 'vé', 'nak', 'nek', 'hoz', 'hez', 'höz', 'on', 'en', 'ön'];
const APPENDIX_MAP = ['an', 'at', 'atik', 'atlan', 'ba', 'ban', 'be', 'ben', 'ból', 'bólról', 'ből', 'd', 'da', 'de', 'dik', 'en', 'et', 'etik', 'etlen', 'gat', 'get', 'hat', 'het', 'i', 'ig', 'int', 'k', 'ka', 'ke', 'kedik', 'kezik', 'kodik', 'kor', 'kozik', 'ként', 'ködik', 'közik', 'l', 'll', 'mány', 'mény', 'n', 'nak', 'nek', 'nok', 'nál', 'né', 'nél', 'nök', 'on', 'ra', 're', 'ról', 'ről', 's', 'si', 'szer', 'szor', 'ször', 'ság', 'ség', 'sít', 't', 'talan', 'tat', 'tatik', 'telen', 'tet', 'tetik', 'tlan', 'tlen', 'tól', 'től', 'ul', 'val', 'vel', 'vá', 'vány', 'vé', 'vény', 'z', 'zat', 'zet', 'ály', 'ás', 'ász', 'ékeny', 'ékony', 'ély', 'ért', 'és', 'ész', 'ít', 'ós', 'ön', 'ú', 'ül', 'ős', 'ű'];

export function appendixPrefixer(text: string) {
	try {
		if (text === '') {
			return text;
		}

		for (const appendix of APPENDIX_MAP) {
			text = text.replace(new RegExp(' ' + appendix + ' ', 'g'), appendix + ' ');

			if (text.endsWith(appendix)) {
				text = text.slice(0, -(appendix.length + 1)) + appendix;
			}
		}

		return text;
	} catch (error) {
		__app.console.debugErrorLog(error);
	}
}

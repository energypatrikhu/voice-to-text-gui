import availableSvgs from '$libs/availableSvgs';
import { svgs } from '$libs/functions/variables';

export async function preloadSvgs() {
	for (let [sType, sNames] of Object.entries(availableSvgs)) {
		for (let sName of sNames) {
			// svgs = { ...svgs, [`${sType}/${sName}`]: await import(`../../svg/${sType}/${sName}.svg`) };
			svgs[`${sType}/${sName}`] = await import(`../../svg/${sType}/${sName}.svg`);
		}
	}
}

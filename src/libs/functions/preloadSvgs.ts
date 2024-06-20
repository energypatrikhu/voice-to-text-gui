import availableSvgs from '$libs/availableSvgs';
import { svgs } from '$libs/functions/variables';

export async function preloadSvgs() {
  for (const [sType, sNames] of Object.entries(availableSvgs)) {
    for (const sName of sNames) {
      svgs[`${sType}/${sName}`] = await import(`../../svg/${sType}/${sName}.svg`);
    }
  }
}

import { getLocationName } from '$libs/Navigation/getLocationName';
import { webPaths } from '$libs/webPaths';
import { pageInfo } from '$stores/page';

export function updateLocationInfo(pathname: string | null = null) {
	let locationInfo = getLocationName(webPaths, pathname ?? globalThis.window.location.pathname);
	pageInfo.set(locationInfo);
	return locationInfo;
}

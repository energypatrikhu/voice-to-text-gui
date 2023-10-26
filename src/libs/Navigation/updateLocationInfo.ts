import getLocationName from '$libs/Navigation/getLocationName';
import { webPaths } from '$libs/webPaths';
import { pageInfo } from '$stores/page';

let updateLocationInfo = (pathname: string | null = null) => {
	let locationInfo = getLocationName(webPaths, pathname ?? globalThis.window.location.pathname);
	pageInfo.set(locationInfo);
	return locationInfo;
};

export default updateLocationInfo;

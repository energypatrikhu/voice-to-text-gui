import { cError } from '$stores/console';

export function getLocationName(table: any, searchHref: string): any {
	try {
		if (!table || !searchHref) {
			throw new Error('Param(s) `table` or `searchHref` was not provided!');
		}

		for (let _location of table) {
			if (_location.href !== '' && _location.href !== '/' ? searchHref.startsWith(_location.href) : _location.href === searchHref) {
				return _location;
			}
			if (_location.children.length) {
				return getLocationName(_location.children, searchHref);
			}
		}
	} catch (catchError) {
		cError(catchError);
	}
}

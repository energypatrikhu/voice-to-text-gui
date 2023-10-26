export interface Paths {
	title: string;
	href: string;
	icon?: string;
	navPos?: string;
	enabled: boolean;
	external?: boolean;
	permissions: string[];
	customs: Customs;
	children: Paths[];
}

export interface Customs {}

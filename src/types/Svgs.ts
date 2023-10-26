import type availableSvgs from '$libs/availableSvgs';

export type tSvgSrcFolder = keyof typeof availableSvgs;
export type tSvgSrcFolderIcons = (typeof availableSvgs)[tSvgSrcFolder][number];
export type tSvgSrc = `${tSvgSrcFolder}/${tSvgSrcFolderIcons}`;

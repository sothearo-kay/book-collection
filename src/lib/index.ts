// place files you want to import through the `$lib` alias in this folder.
export function styleToString(style: { [key: string]: string }): string {
	return Object.entries(style)
		.map(([key, value]) => `${key}: ${value}`)
		.join('; ');
}

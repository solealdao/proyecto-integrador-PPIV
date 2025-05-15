const theme = {
	fontFamily: {
		primary: 'var(--font-noto-sans-display)',
		secondary: 'var(--font-mersad-regular)',
		ternary: 'var(--font-mersad-bold)',
		quaternary: 'var(--font-mersad-black)',
		additional: 'var(--font-inter)',
	},
	colors: {
		darkText: '#131220',
		lightText: '#F8F8F8',

		green: '#199f93',
		darkGreen: '#4b6367',
		yellow: '#f3a712',
		black: '#131220',
		lightGray: '#bebebe',
		gray: '#74788d',
		white: '#FFFFFF',
	},

	breakPoints: {
		screenXs: '36em',
		screenSm: '48em',
		screenMd: '64em',
		screenLg: '80em',
		screenXL: '100em',
	},
	dimensions: {
		separation: 0.8,
		gap: 1.2,
		space: 3.2,
		pageWidth: 1440,
		courseDetail: 4,
		generalPadding: 12.6,
		generalPaddingLarge: 17,
		page: {
			course: {
				titlePadding: 4,
				titlePaddingLarge: 5.5,
			},
		},
	},
	fontSize: {
		small: '0.8em',
		medium: '1em',
		regular: '1.5em',
		large: '2em',
		extraLarge: '3em',
		xxl: '4em',
	},
};

export default theme;

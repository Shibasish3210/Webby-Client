/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				grow: "grow 0.7s ease-in-out",
				shrink: "shrink 0.7s ease-in-out",
				slide_in: "slide_in 0.7s ease-in-out",
				slide_out: "slide_out 0.7s ease-in-out",
			},
			keyframes: {
				grow: {
					"0%": { scale: "0" },
					"100%": { scale: "1" },
				},
				shrink: {
					"0%": { scale: "1" },
					"100%": { scale: "0" },
				},
				slide_in: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0)" },
				},
				slide_out: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(100%)" },
				},
			},
		},
	},
	plugins: [],
};

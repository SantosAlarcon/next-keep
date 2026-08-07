import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const Ice = definePreset(Aura, {
	semantic: {
		surface: {
			0: "#ffffff",
			50: "{blue.50}",
			100: "{blue.100}",
			200: "{blue.200}",
			300: "#fff",
			400: "{blue.400}",
			500: "{blue.500}",
			600: "{blue.600}",
			700: "{blue.700}",
			800: "{blue.800}",
			900: "{blue.900}",
			950: "#224",
		},
		primary: {
			0: "#ffffff",
			50: "{blue.50}",
			100: "{blue.100}",
			200: "{blue.200}",
			300: "{blue.300}",
			400: "{blue.400}",
			500: "{blue.500}",
			600: "{blue.600}",
			700: "{blue.700}",
			800: "{blue.800}",
			900: "{blue.900}",
			950: "{blue.950}",
			color: "light-dark({surface.950}, #ffffff)",
			contrastColor: "light-dark(#ffffff, {surface.950})",
			hoverColor: "light-dark({surface.800}, #ffffff)",
			activeColor: "light-dark({surface.700}, {surface.400})",
		},
		highlight: {
			background: "light-dark({surface.950}, {primary.50})",
			focusBackground: "light-dark({surface.700}, {primary.400})",
			color: "light-dark({surface.50}, {primary.0})",
			focusColor: "light-dark({surface.250}, {primary.0})",
		},
	},
});

export default Ice;

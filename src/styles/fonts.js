// Globally available font styles

import {
  Inter,
  Lora,
  Source_Sans_Pro,
  Roboto_Condensed,
  Raleway,
} from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });
const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "700"],
});

// define 2 weights of a non-variable font
// const sourceCodePro400 = Source_Sans_Pro({ weight: "400" });
// const sourceCodePro700 = Source_Sans_Pro({ weight: "700" });
export { roboto_condensed, raleway };

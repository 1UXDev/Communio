// Globally available font styles

import { Inter, Lora, Source_Sans_Pro } from "next/font/google";

const inter = Inter();
const lora = Lora();

// define 2 weights of a non-variable font
const sourceCodePro400 = Source_Sans_Pro({ weight: "400" });
const sourceCodePro700 = Source_Sans_Pro({ weight: "700" });
export { inter, lora, sourceCodePro400, sourceCodePro700 };

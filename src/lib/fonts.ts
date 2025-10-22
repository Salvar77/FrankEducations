import localFont from "next/font/local";

export const arimo = localFont({
  src: [
    {
      path: "../../public/fonts/Arimo-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Arimo-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Arimo-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-arimo",
  display: "swap",
});

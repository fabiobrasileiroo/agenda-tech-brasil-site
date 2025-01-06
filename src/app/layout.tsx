import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
const Inter = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  weight: "100 900",
});
// const inter = Inter({
//   subsets: ['latin'], // Escolha os subsets que você quer
//   weight: ['400', '700'], // Escolha os pesos que você precisa
//   variable: '--font-inter', // Uma variável CSS opcional
// });

export const metadata: Metadata = {
  title: 'Agenda Tech Brasil',
  description: 'Eventos de tecnologia no Brasil',
  icons: '/favicon.ico'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Adicione outros tamanhos ou versões do ícone se necessário */}
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" /> */}
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> */}
        {/* <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
      </Head>
      {/* ${geistSans.variable} ${geistMono.variable} */}
      <body
        className={`inter dark antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

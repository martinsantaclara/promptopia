import "./globals.css";
import "@uploadthing/react/styles.css";
import AuthProvider from "./context/AuthProvider";
import { createTranslator, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import ThemeProviderContext from "./context/ThemeProvider";
import { getCookie } from "@/utils/getCookie";
import Header from "@/components/Header";
import BackGround from "@/components/BackGround";

import { Toaster } from "sonner";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });

  return {
    title: t("App.title"),
    description: t("App.description"),
    verification: {
      google: "LT73lNdSStewrV03F2gYiSugS9xW45DxidghHPr2WGw",
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages(locale);
  const theme = await getCookie("theme");

  return (
    <html lang="en">
      <body>
        <Toaster
          richColors
          position="top-right"
          theme={theme === "dark" ? "dark" : "light"}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <ThemeProviderContext
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
              <BackGround theme={theme as string} />
              <Header />
              <main className="app">{children}</main>
            </ThemeProviderContext>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

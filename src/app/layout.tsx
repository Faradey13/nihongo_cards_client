import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.scss";
import {ApolloWrapper} from "@/shared/lib/graphQL/apollo-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nihongo flashcards",
  description: "learn japan words by flashcards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}

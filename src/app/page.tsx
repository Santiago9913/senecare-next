"use client";

import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import LogInButton from "./cross-components/auth/loginButton";
import { useRouter } from "next/navigation";

export default function Home({ session }: { session: Session }) {
  const t = useTranslations("login");
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <main className="flex flex-row h-screen">
        <div className="flex-auto w-2/4">
          <div className="flex flex-col w-full h-full justify-center items-center">
            <div className="w-96 grow place-content-center">
              <Typography variant="h4" mb={1}>
                {t("title")}
              </Typography>
              <Typography variant="subtitle2" fontWeight="light" mb={3}>
                {t("caption")}
              </Typography>
              <div>
                <LogInButton
                  label={t("buttonText")}
                  onClick={() => router.push("/dashboard")}
                />
              </div>
            </div>
            <footer className="h-auto px-4 pb-4">
              <Typography variant="body1" textAlign={"center"}>
                {t("footer")}
              </Typography>
            </footer>
          </div>
        </div>
        <div className="flex-auto w-2/4 bg-[url('/seneca-background.jpeg')] min-h-full  bg-auto bg-no-repeat bg-center"></div>
      </main>
    </SessionProvider>
  );
}

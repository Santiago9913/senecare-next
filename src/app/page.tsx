"use client";

import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import LogInButton from "./cross-components/auth/loginButton";
import { useState } from "react";

export default function Home({ session }: { session: Session }) {
  const t = useTranslations("login");
  const [isLoading, setIsLoading] = useState(false);

  return (
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
            <LogInButton
              label={t("buttonText")}
              isLoading={isLoading}
              onClick={() => {
                setIsLoading((prev) => true);
                signIn("azure-ad", {
                  callbackUrl: "/dashboard",
                });
              }}
            />
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
  );
}

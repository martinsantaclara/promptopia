"use client";
import { updateUser } from "@/lib/actions";
import { user } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Cryptr from "cryptr";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { setCookie } from "@/utils/setCookies";

type MyProfileProps = {
  data: user;
  pass: string | undefined | null;
};

const cryptr = new Cryptr(process.env.NEXT_PUBLIC_KEY as string);

const MyProfile = ({ data, pass }: MyProfileProps) => {
  const [user, setUser] = useState(data);
  let [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const handleCancel = () => {
    router.back();
  };
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState(pass);

  const t = useTranslations("Profile");

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{t("head")}</span>
      </h1>
      <p className="desc text-left dark:text-dark-subtitle">{t("subtitle")}</p>

      <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism dark:border-0 dark:bg-transparent">
        <label>
          <div className="flex justify-between">
            <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-white/80">
              {t("nameLabel")}
            </span>
            {!user.emailVerified && (
              <button
                type="button"
                onClick={async () => {
                  await setCookie("userName", user.name as string, "month");
                  signIn("email", { email: user.email });
                }}
                className="a !my-0 dark:text-white/70 hover:text-blue-300 dark:hover:text-blue-300"
              >
                {t("activateLabel")}
              </button>
            )}
          </div>

          <input
            value={user.name as string}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            type="text"
            placeholder={t("nameLabel")}
            required
            className="form_input dark:text-white/70"
          />
        </label>{" "}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-white/80">
            {t("imageLabel")}
          </span>
          <div className="flex max-sm:flex-col sm:flex-row items-center gap-14 bg-white rounded-lg p-3 mt-2 dark:bg-transparent dark:border">
            <Image
              src={user.image as string}
              alt={t("imageLabel")}
              width={100}
              height={100}
              className="ml-0 sm:ml-10 rounded-full"
            />
            <UploadDropzone<OurFileRouter>
              className="max-w-[160px] max-h-[200px] py-2 ut-label:mt-2 ut-label:mb-1 dark:border dark:ut-allowed-content:text-red-400 dark:border-gray-900/50"
              content={{
                label({ isUploading }) {
                  if (isUploading) {
                    return (
                      <h1 className="text-[brown] text-sm dark:text-red-300">
                        {t("loading")}
                      </h1>
                    );
                  }
                  return (
                    <div>
                      <h1 className="leading-5">{t("choice")}</h1>
                      <br className="content-['']" />
                      <p className="text-sm text-[#52525b] font-normal dark:text-white/70">
                        {t("draganddrop")}
                      </p>
                    </div>
                  );
                },
              }}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                if (res) {
                  setUser({ ...user, image: res[0].url });
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-white/80">
            {t("emailLabel")}
          </span>
          <input
            defaultValue={user.email as string}
            type="text"
            disabled
            className="form_input dark:text-white/70"
          />
        </label>
        {password !== null && (
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-white/80">
              {t("passwordLabel")}
            </span>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPass ? "text" : "password"}
                className="form_input dark:text-white/70"
                required
                min={4}
              />
              {!showPass && (
                <FaEye
                  className="absolute top-4 right-5 cursor-pointer"
                  onClick={() => setShowPass((prev) => !prev)}
                ></FaEye>
              )}
              {showPass && (
                <FaEyeSlash
                  className="absolute top-4 right-5 cursor-pointer"
                  onClick={() => setShowPass((prev) => !prev)}
                ></FaEyeSlash>
              )}
            </div>
          </label>
        )}
        <div className="flex-end mx-3 mb-5 gap-4">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-900 text-sm dark:text-white/70 dark:hover:text-white/90"
            onClick={handleCancel}
          >
            {t("cancelButton")}
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center px-5 py-1.5 text-sm bg-primary-orange hover:bg-primary-orange/80 rounded-full text-white"
            formAction={() => {
              setIsSubmitting(true);
              const handleSubmit = async () => {
                try {
                  await updateUser(user, password);
                  window.location.href = "/";
                } catch (error) {
                  console.log(error);
                }
              };
              handleSubmit();
            }}
          >
            {submitting ? (
              <Image
                src="/assets/icons/loader_button.svg"
                width={20}
                height={20}
                alt="loader"
                className="object-contain mr-3"
              />
            ) : null}
            {submitting ? t("updating") : t("updateButton")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default MyProfile;

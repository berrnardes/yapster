"use client";

import Footer from "@/components/footer";
import { Icons } from "@/components/icons";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ForWho from "./components/for-who";
import WhatIs from "./components/what-is";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 sm:mt-20 mt-16 flex justify-center items-center flex-col text-center">
        <div className="border mx-auto mb-4 max-w-fit flex justify-center items-center space-x-2 overflow-hidden rounded-full border-gray-300 bg-white px-7 py-3 shadow-sm transition-all hover:border-gray-300 hover:bg-white/50 hover:shadow-md">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Yapster</span> tá online! 😎
          </p>
        </div>

        <h1 className="text-zinc-800 max-w-sm sm:mt-5 text-5xl font-bold sm:text-6xl lg:text-7xl sm:max-w-4xl uppercase">
          Chat With Your <span className="text-emerald-700">Documents</span>
        </h1>
        <Icons.line />
        <p className="mt-5 max-w-prose sm:text-lg text-zinc-600">
          <span className="font-semibold">Tired of information overload?</span>{" "}
          Yapster is your one-stop solution for conquering complex topics and
          retaining key information.
        </p>
        <Link
          href="/dashboard"
          target="_blank"
          className={buttonVariants({
            size: "lg",
            className: "mt-5 bg-emerald-700",
          })}
        >
          Get Started
        </Link>
      </MaxWidthWrapper>
      <div>
        <div className="relative isolate">
          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-md bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-xl lg:p-3">
                  <Image
                    src="/dashboard-preview.jpg"
                    alt="product preview"
                    width={1364}
                    height={866}
                    quality={100}
                    className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                    priority={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhatIs />
      <ForWho />
      <MaxWidthWrapper className="mb-16 mt-16 sm:mt-28">
        {/* FEATURE SECTION */}
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-5xl text-zinc-700">
              Start Chatting In Minutes
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              Chatting to your PDF files has never been easier than with
              Yapster.
            </p>
          </div>
        </div>

        {/* STEPS */}
        <ol className="my-8 mx-4 space-y-4 pt-8 md:space-x-0 md:space-y-12">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-400 py-2 pl-4 md:border-l-0 md:border-t-2 md:pl-0 md:pb-0 md:pt-4">
              <span className="font-medium text-blue-600 text-sm">Step 1</span>
              <span className="font-semibold text-xl text-zinc-700">
                Sign up for an account
              </span>
              <span className="mt-2 text-zinc-700">
                Either starting out with a free or our{" "}
                <Link
                  href="/pricing"
                  className="text-blue-700 underline underline-offset-2"
                >
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-400 py-2 pl-4 md:border-l-0 md:border-t-2 md:pl-0 md:pb-0 md:pt-4">
              <span className="font-medium text-blue-600 text-sm">Step 2</span>
              <span className="font-semibold text-xl text-zinc-700">
                Upload your PDF file
              </span>
              <span className="mt-2 text-zinc-700">
                We&apos;ll process your file and make it ready for you to chat
                with.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-400 py-2 pl-4 md:border-l-0 md:border-t-2 md:pl-0 md:pb-0 md:pt-4">
              <span className="font-medium text-blue-600 text-sm">Step 3</span>
              <span className="font-semibold text-xl text-zinc-700">
                Start asking questions
              </span>
              <span className="mt-2 text-zinc-700">
                It&apos;s that simple. Try out Yapster today - it really takes
                less than a minute.
              </span>
            </div>
          </li>
        </ol>
        {/* FILE UPLOAD PREVIEW */}
        <div className="px-6">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl ring-1 bg-zinc-900/5 p-2 ring-inset ring-zinc-900/10 lg:-m-4 lg:rounded-2xl lg:p-3">
              <Image
                src="/file-upload-preview.jpg"
                alt="File Upload Preview"
                width={1419}
                height={732}
                quality={100}
                className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-zinc-900/10"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}

"use client";

import { currentSideBarNav, sideBarNav } from "@/jotai/dashboard";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideBarMobile() {
  const jotaiSideBarNav = useAtomValue(sideBarNav);
  const [jotaiCurrentSideBarNav, setJotaiCurrentSideBarNav] =
    useAtom(currentSideBarNav);

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {jotaiSideBarNav.map((item) => (
                <li
                  key={item.name}
                  onClick={() => {
                    if (item.name == jotaiCurrentSideBarNav) {
                      return;
                    }

                    setJotaiCurrentSideBarNav(item.name);
                  }}
                >
                  <Link
                    href={item.href}
                    className={classNames(
                      item.name == jotaiCurrentSideBarNav
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.name == jotaiCurrentSideBarNav
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

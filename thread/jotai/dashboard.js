import { atom } from "jotai";
import { CalendarIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";

export const sideBarNav = atom([
  {
    name: "Dashboard",
    href: "/platform/dashboard",
    icon: HomeIcon,
    current: true,
  },
  { name: "Client", href: "/platform/client", icon: UsersIcon, current: false },
  {
    name: "Calendar",
    href: "/platform/calender/month",
    icon: CalendarIcon,
    current: false,
  },
]);

export const currentSideBarNav = atom("Dashboard");

export const sideBarOpen = atom(false);

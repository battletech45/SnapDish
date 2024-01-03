import {
  Home,
  BadgeDollarSign,
  PieChart,
  Mail,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

export const navbarLinks = [
    {
      index: 0,
      name: "Home",
      icon: Home,
      href: "/"
    },
    {
      index: 1,
      name: "Payment",
      icon: BadgeDollarSign,
      href: "/payment"
    },
    {
      index: 2,
      name: "Dashboard",
      icon: PieChart,
      href: "/dashboard"
    },
    {
      index: 3,
      name: "Message",
      icon: Mail,
      href: "/messages"
    },
    {
      index: 4,
      name: "Notifications",
      icon: Bell,
      href: "/notifications"
    },
    {
      index: 5,
      name: "Settings",
      icon: Settings,
      href: "/settings"
    },
    {
      index: 6,
      name: "Logout",
      icon: LogOut
    }
  ];
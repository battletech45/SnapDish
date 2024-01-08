import {
  Home,
  BadgeDollarSign,
  PieChart,
  PackagePlus,
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
      name: "AddProduct",
      icon: PackagePlus,
      href: "/addproduct"
    },
    {
      index: 4,
      name: "Settings",
      icon: Settings,
      href: "/settings"
    },
    {
      index: 5,
      name: "Logout",
      icon: LogOut
    }
  ];
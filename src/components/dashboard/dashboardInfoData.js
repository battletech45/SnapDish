import { CircleDollarSign, BookmarkMinus, User } from 'lucide-react';

export const dashboardInfoData = [
    {
        title: "Total Revenue",
        mainData: "$10,243.00",
        icon: CircleDollarSign,
        iconColor: "#9288E0",
        percent: +32.40
    },
    {
        title: "Total Dish Ordered",
        mainData: "23,456",
        icon: BookmarkMinus,
        iconColor: "#FFB572",
        percent: -12.40 
    },
    {
        title: "Total Customer",
        mainData: "1,234",
        icon: User,
        iconColor: "#65B0F6",
        percent: +2.40
    }
];
'use client'
import { Order } from "@/models";
import { addDays, format, isAfter, isMatch } from "date-fns";
import viLocale from "date-fns/locale/vi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
type CalendarProps = {
    orders: Array<Order>
}

export const RoomCalendar = ({ orders }: CalendarProps) => {
    const [state, setState] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function getDatesInRange(startDate: Date, endDate: Date) {
        const start = new Date(startDate);
        const end = new Date(endDate)

        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
    }

    const arrayDisabled = orders?.map((i: { check_in: Date; check_out: Date; }) => getDatesInRange(i.check_in, i.check_out)) as []
    console.log(orders)
    const disabled = [].concat.apply([], arrayDisabled)
    console.log(disabled)

    useEffect(() => {
        if (disabled.length > 0) {
            for (let i = 0; i < disabled.length; i++) {
                let length = Math.round((disabled[i + 1] - disabled[i]) / (1000 * 3600 * 24))
                if (length > 3 && isAfter(disabled[i + 1], new Date())) {
                    setState([
                        {
                            startDate: addDays(disabled[i], 1),
                            endDate: addDays(disabled[i], 3),
                            key: 'selection'
                        }
                    ])
                } else {
                    setState([
                        {
                            startDate: addDays(disabled[disabled.length - 1], 1),
                            endDate: addDays(disabled[disabled.length - 1], 3),
                            key: 'selection'
                        }
                    ])
                }
            }
        } else {
            if (searchParams.get('check_in') && searchParams.get('check_out')) {
                setState([
                    {
                        startDate: new Date(decodeURI(searchParams.get('check_in') as string)),
                        endDate: new Date(decodeURI(searchParams.get('check_out') as string)),
                        key: 'selection'
                    }
                ])
            } else {
                setState([
                    {
                        startDate: new Date(),
                        endDate: addDays(new Date(), 2),
                        key: 'selection'
                    }
                ])
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Set params when page room no param
    // useEffect(() => {
    //     if (!searchParams.get('check_in') || !searchParams.get('check_out')) {
    //         const check_in = format(state[0].startDate, "Y/MM/dd")
    //         const check_out = format(state[0].endDate, "Y/MM/dd")
    //         const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    //         current.set("check_in", check_in);
    //         current.set("check_out", check_out);
    //         current.set("adult", '1');
    //         current.set("child", '0');
    //         const search = current.toString();
    //         router.push(`${pathname}?${search}`)
    //     }
    // })

    const handleChangeDate = (item: RangeKeyDict) => {
        console.log(item.selection)
        setState([item.selection] as any)
        const check_in = format(new Date(item.selection.startDate as Date), "Y/MM/dd")
        const check_out = format(new Date(item.selection.endDate as Date), "Y/MM/dd")
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

        current.set("check_in", check_in);
        current.set("check_out", check_out);
        const search = current.toString();
        router.push(`${pathname}?${search}`, { scroll: false })
    }

    if (!searchParams.get('check_in') || !searchParams.get('check_out')) {
        router.push(`/`)
    }

    if (isMatch(searchParams.get('check_in') as string, 'yyyy/MM/dd') === false || isMatch(searchParams.get('check_out') as string, 'yyyy/MM/dd') === false) {
        router.push(`/`)
    }

    return (
        <>
            <DateRange
                locale={viLocale}
                ranges={state as []}
                onChange={item => handleChangeDate(item)}
                moveRangeOnFirstSelection={false}
                direction="horizontal"
                calendarFocus="backwards"
                dateDisplayFormat={'dd/MM/yyyy'}
                preventSnapRefocus={true}
                minDate={new Date()}
                disabledDates={disabled}
            />
        </>

    );
}

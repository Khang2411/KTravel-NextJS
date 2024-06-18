'use client'
import { format, differenceInMinutes, formatDistance } from "date-fns";
import viLocale from "date-fns/locale/vi";
import { useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

type CalendarProps = {
    onChange?: (payload: any) => void
}
export const Calendar = ({ onChange }: CalendarProps) => {
    const [state, setState] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }]);

    const handleChangeDate = (item: RangeKeyDict) => {
        console.log(item.selection)
        setState([item.selection] as any)
        const check_in = format(new Date(item.selection.startDate as Date), "dd/MM/Y")
        const check_out = format(new Date(item.selection.endDate as Date), "dd/MM/Y")
        const payload = {
            check_in,
            check_out
        }
        onChange?.(payload)
    }

    // console.log(format(new Date(), "Y/MM/dd HH:mm:ss"))
    // console.log(differenceInMinutes(new Date('2024-05-29 19:55:01'), new Date('2024-05-28 19:55:01')) > 1440)
    // console.log(new Date('2024-05-28 19:55:01').toDateString() === new Date('2024-05-27 19:55:01').toDateString())
    // console.log(format(new Date('2024-06-04T17:30:41.000000Z'), "dd/MM/Y HH:mm:ss"))
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
            />
        </>
    );
}

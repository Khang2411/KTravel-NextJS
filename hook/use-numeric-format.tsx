
import { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface CustomPropsNumeric {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export type typeNumericFormat = {
    option?: NumericFormatProps,
    condition?: (arg?: any) => any;
}

export const useNumericFormat = ({ option, condition }: typeNumericFormat) => forwardRef<NumericFormatProps, CustomPropsNumeric>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                isAllowed={condition}
                onValueChange={(values) => {
                    const { value }: any = values;
                    if (value[1] !== undefined) {
                        if (value[0] == 0 && value[1] !== 0) {
                            return onChange({
                                target: {
                                    name: props.name,
                                    value: value.replace("0", ""),
                                },
                            });
                        }
                    }
                    onChange({
                        target: {
                            name: props.name,
                            value: value,
                        },
                    });
                }}
                allowNegative={false}
                autoComplete="off"
                {...option}
            />
        );
    },
);
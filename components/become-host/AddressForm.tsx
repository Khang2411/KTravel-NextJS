
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SelectField } from "../form";
import InputField from "../form/InputField";
import { FooterBecomeHost } from "./";
import { Address, Country, CountryResponse } from '@/models';

interface AddressFormProps {
    onSubmit?: (payload: Address) => void,
    countries: Array<CountryResponse<Country>> | undefined,
    id: number
}

const schema = yup.object().shape({
    country: yup.string().required('Vui lòng chọn'),
    street: yup.string().required('Không được trống'),
    city: yup.string().required('Không được trống'),
    state: yup.string().required('Không được trống'),
});

export const AddressForm = ({ onSubmit, countries, id }: AddressFormProps) => {
    const { handleSubmit, control, formState: { isSubmitting } } = useForm<Address>({
        resolver: yupResolver(schema),
        defaultValues: {
            country: '',
            street: '',
            city: '',
            state: '',
        },
    });

    const handleFormSubmit = async (payload: Address) => {
        await onSubmit?.(payload)
    };

    return (
        <>
            <Box component={'form'} onSubmit={handleSubmit(handleFormSubmit)}>
                <Box sx={{
                    '& div': {
                        marginBottom: '5px'
                    }
                }}>
                    <Box>
                        <SelectField control={control} name="country" label='Quốc gia' options={countries}></SelectField>
                    </Box>

                    <Box>
                        <InputField control={control} name="street" label='Địa chỉ/Đường phố' />
                    </Box>

                    <Box>
                        <InputField control={control} name="city" label='Thành phố' />
                    </Box>
                    <Box>
                        <InputField control={control} name="state" label='Quận huyện/Tiểu bang (nếu có)' />
                    </Box>
                </Box>
                <Box mt={5}>
                    <FooterBecomeHost progressInput={40} disabled={isSubmitting} backTo={`/become-host/${id}/location`}/>
                </Box>
            </Box>
        </>
    );
}


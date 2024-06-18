'use client'
import { SelectField } from "@/components/form";
import InputField from "@/components/form/InputField";
import { Address, Country, CountryResponse, Room } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import "leaflet/dist/leaflet.css";
import 'leaflet-geosearch/dist/geosearch.css'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import * as yup from "yup";

const schema = yup.object().shape({
    longitude: yup.string().required(),
    latitude: yup.string().required(),
    country: yup.string().required('Vui lòng chọn'),
    street: yup.string().required('Không được trống'),
    city: yup.string().required('Không được trống'),
    state: yup.string().nullable(),
});

interface LocationFormProps {
    onSubmit?: (payload: Partial<Room>) => void,
    handleToggle?: () => void,
    longitude: number,
    latitude: number,
    countries: Array<CountryResponse<Country>> | undefined,
    address: Address
}

export const AddressForm = ({ onSubmit, handleToggle, longitude: longitudeProps, latitude: latitudeProps, countries, address }: LocationFormProps) => {
    const [longitude, setLongitude] = useState(longitudeProps)
    const [latitude, setLatitude] = useState(latitudeProps)

    const { handleSubmit, control, setValue, formState: { isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            longitude: "",
            latitude: "",
            country: address.country,
            street: address.street,
            city: address.city,
            state: address.state,
        },
    });

    const Search = () => {
        const map = useMap() // access to leaflet map
        useEffect(() => {
            const searchControl = new (GeoSearchControl as any)({
                provider: new OpenStreetMapProvider(),
                style: 'bar'
            })
            map.addControl(searchControl) // this is how you add a control in vanilla leaflet
            map.on('geosearch/showlocation', searchEventHandler);
            return () => { map.removeControl(searchControl) }
        })
        return null // don't want anything to show up from this comp
    }

    useEffect(() => {
        setValue('longitude', longitude.toString())
        setValue('latitude', latitude.toString())
    })

    const searchEventHandler = (result: any) => {
        console.log(result.location);
        setValue('longitude', result.location.x)
        setValue('latitude', result.location.y)
    }

    const handleFormSubmit = async (payload: Partial<Room>) => {
        console.log(payload)
        await onSubmit?.(payload)
    };

    return (
        <Box component='form' onSubmit={handleSubmit(handleFormSubmit)} sx={{
            position: 'relative',
            border: '1px solid rgb(221, 221, 221)',
            borderRadius: '16px',
            padding: '16px 24px',
        }}>
            <IconButton aria-label="delete" onClick={handleToggle}
                sx={{ position: 'absolute', right: '10px', top: '0' }}>
                <CloseIcon fontSize="small" />
            </IconButton>
            <Box marginBottom={2}><Typography fontWeight={600}>Địa chỉ cụ thể</Typography></Box>
            <Box>
                <Box sx={{ display: 'none' }}>
                    <InputField control={control} name="longitude" />
                    <InputField control={control} name="latitude" />
                </Box>
                <Box>
                    <MapContainer style={{ height: '50vh', width: '100wh' }}
                        center={[latitude, longitude]} zoom={18} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[latitude, longitude]}>
                            <Popup>
                                Vị trí bạn đã chọn
                            </Popup>
                        </Marker>
                        <Search />
                    </MapContainer >
                </Box>
            </Box>
            <Box sx={{
                marginTop: '15px',
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
            <Box sx={{ paddingBlock: '24px' }}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Button variant="text" onClick={handleToggle}>Hủy</Button>
                    <Button type="submit" variant="contained"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null} sx={{ backgroundColor: '#000000 !important' }}>Lưu</Button>
                </Stack>
            </Box>
        </Box>
    );
}

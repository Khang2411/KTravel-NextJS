'use client'
import { Room } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import "leaflet/dist/leaflet.css";
import 'leaflet-geosearch/dist/geosearch.css'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import * as yup from "yup";
import InputField from "../form/InputField";
import { FooterBecomeHost } from "./FooterBecomeHost";

type FormValues = {
    longitude: number,
    latitude: number,
};
const schema = yup.object().shape({
    longitude: yup.number().required(),
    latitude: yup.number().required(),
});

interface LocationFormProps {
    onSubmit?: (payload: Partial<Room>) => void,
    id: number
}
export const LocationForm = ({ onSubmit, id }: LocationFormProps) => {
    const [longitude, setLongitude] = useState(51.505)
    const [latitude, setLatitude] = useState(-0.09)

    const { handleSubmit, control, setValue, formState: { isSubmitting } } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            longitude: 0,
            latitude: 0
        },
    });

    useEffect(() => {
        const fetchCountry = async () => {
            const country = await fetch('http://ip-api.com/json/')
            const res = await country.json()
            setLongitude(res.lon)
            setLatitude(res.lat)
        }
        try {
            fetchCountry()
        } catch (err) {
            console.log(err)
        }
    }, [])

    const RecenterAutomatically = ({ lat, lng }: { lat: number; lng: number }) => {
        const map = useMap();
        useEffect(() => {
            map.setView([lat, lng])
        });
        return null;
    }

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

    const searchEventHandler = (result: any) => {
        console.log(result.location);
        setValue('longitude', result.location.x)
        setValue('latitude', result.location.y)
    }

    const handleFormSubmit = async (payload: Partial<Room>) => {
        await onSubmit?.(payload)
    };

    return (
        <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
            <Box>
                <Box sx={{ display: 'none' }}>
                    <InputField control={control} name="longitude" />
                    <InputField control={control} name="latitude" />
                </Box>
                <Box>
                    <MapContainer style={{ height: '50vh', width: '100wh' }} attributionControl={false}
                        center={[longitude, latitude]} zoom={6} scrollWheelZoom={false}>
                        <RecenterAutomatically lat={latitude} lng={longitude} />
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[longitude, latitude]}>
                            <Popup>
                                Vị trí bạn đã chọn
                            </Popup>
                        </Marker>
                        <Search />
                    </MapContainer >
                </Box>
            </Box>
            <Box mt={5}>
                <FooterBecomeHost progressInput={30} disabled={isSubmitting} backTo={`/become-host/${id}/amenities`} />
            </Box>
        </Box>
    );
}

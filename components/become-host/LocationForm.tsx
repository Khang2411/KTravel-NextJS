import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import "leaflet/dist/leaflet.css";
import 'node_modules/leaflet-geosearch/dist/geosearch.css';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import * as yup from "yup";
import InputField from "../form/PhotoField";
import { FooterBecomeHost } from "./FooterBecomeHost";

type FormValues = {
    long: string,
    lat: string,
};
const schema = yup.object().shape({
    long: yup.string().required(),
    lat: yup.string().required(),
});

export interface LocationFormProps {
    onSubmit?: (payload: FormValues) => void,
}
export const LocationForm = ({onSubmit}:LocationFormProps) => {
    const { handleSubmit, control, setValue } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            long: "",
            lat: ""
        },
        mode: "onChange"
    });

    const Search = () => {
        const map = useMap() // access to leaflet map
        useEffect(() => {
            const searchControl = new GeoSearchControl({
                provider: new OpenStreetMapProvider(),
                style: 'bar'
            })
            map.addControl(searchControl) // this is how you add a control in vanilla leaflet
            map.on('geosearch/showlocation', searchEventHandler);
            return () => map.removeControl(searchControl)
        })
        return null // don't want anything to show up from this comp
    }

    const searchEventHandler = (result: any) => {
        console.log(result.location);
        setValue('lat', result.location.y)
        setValue('long', result.location.x)
    }
    const handleFormSubmit = async (payload: FormValues) => {
        await onSubmit?.(payload)
    };
    return (
        <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
            <Box>
                <Box sx={{ display: 'none' }}>
                    <InputField control={control} name="long" />
                    <InputField control={control} name="lat" />
                </Box>
                <Box>
                    <MapContainer style={{ height: '50vh', width: '100wh' }}
                        center={[51.505, -0.09]} zoom={5} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Search provider={new OpenStreetMapProvider()} />
                    </MapContainer >
                </Box>
            </Box>
            <FooterBecomeHost progressInput={80} disabled={false}></FooterBecomeHost>
        </Box>
    );
}

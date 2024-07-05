'use client'
import { Room } from '@/models';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { addDays, format, isAfter } from "date-fns";
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

type RoomSearchMapProps = {
    rooms: Array<Room>
}

// delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
})

export const RoomSearchMap = ({ rooms }: RoomSearchMapProps) => {
    const searchParams = useSearchParams();
    const router = useRouter()

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

    const setParamUrl = (room: Room) => {
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form\
        current.set("adult", '1');
        current.set("child", '0');
        const arrayDisabled = room.orders.map((i: { check_in: Date; check_out: Date; }) => getDatesInRange(i.check_in, i.check_out)) as []
        const disabled = [].concat.apply([], arrayDisabled)
        if (disabled.length > 0) {
            for (let i = 0; i < disabled.length; i++) {
                let length = Math.round((disabled[i + 1] - disabled[i]) / (1000 * 3600 * 24))
                if (length > 3 && isAfter(addDays(disabled[i], 1), new Date())) {
                    const check_in = format(new Date(addDays(disabled[i], 1) as Date), "Y/MM/dd")
                    const check_out = format(new Date(addDays(disabled[i], 3) as Date), "Y/MM/dd")
                    current.set("check_in", check_in.toString());
                    current.set("check_out", check_out.toString());
                    const search = current.toString();
                    router.push(`/room/${room.id}?${search}`)
                } else {
                    const check_in = format(new Date(addDays(disabled[disabled.length - 1], 1) as Date), "Y/MM/dd")
                    const check_out = format(new Date(addDays(disabled[disabled.length - 1], 3) as Date), "Y/MM/dd")
                    current.set("check_in", check_in.toString());
                    current.set("check_out", check_out.toString());
                    const search = current.toString();
                    router.push(`/room/${room.id}?${search}`)
                }
            }
        } else {
            current.set("check_in", format(new Date(), "Y/MM/dd").toString());
            current.set("check_out", format(addDays(new Date(), 2), "Y/MM/dd").toString());
            const search = current.toString();
            router.push(`/room/${room.id}?${search}`)
        }
    }

    return (
        <Box height={'100%'}>
            <MapContainer
                className='h-full rounded-xl z-0'
                center={[rooms[0].latitude as number, rooms[0].longitude as number]} zoom={8} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    rooms.map((marker, index) => (
                        <Marker
                            key={index}
                            position={[marker.latitude as number, marker.longitude as number]}
                        >
                            <Popup className='search-map'>
                                <Box onClick={() => setParamUrl(marker)}>
                                    <Card sx={{ maxWidth: 345, borderRadius: '14px' }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={marker.images[0].image}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <Typography fontSize={14} fontWeight={600} component={'div'}>
                                                    {marker?.name}, {marker?.address.country}
                                                </Typography>
                                                <Typography fontSize={14} component={'div'}>
                                                    ${marker?.price} / đêm
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Box>
                            </Popup>
                        </Marker>
                    ))}
            </MapContainer>
        </Box>

    );
}

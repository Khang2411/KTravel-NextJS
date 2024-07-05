'use client'
import { Calendar } from '@/components/Calendar';
import InputField from '@/components/form/InputField';
import { Room } from '@/models';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import Tippy from '@tippyjs/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'tippy.js/dist/tippy.css'; // optional
import mutateSearch from './mutateSearch';

const dataList = [
    {
        name: 'Người lớn',
        type: 'adult'
    }
    ,
    {
        name: 'Trẻ em',
        type: 'child'
    },
]

export const Search = () => {
    const [searchCalendar, setSearchCalendar] = useState(0)
    const [searchPlace, setSearchPlace] = useState(0)
    const [searchFloorPlan, setSearchFloorPlan] = useState(0)
    const [state, setState] = useState<Partial<Room>>({ adult: 0, child: 0, })
    const searchParams = useSearchParams();
    const router = useRouter()
    const pathname = usePathname();

    const { handleSubmit, control, setValue, watch, formState: { isSubmitting } } = useForm({
        defaultValues: {
            place: "",
            adult: 0,
            child: 0,
            check_in: '',
            check_out: '',
        }
    });

    const handleIncrement = (type: "adult" | "child") => {
        setState({ ...state, [type]: Number(state[type]) + 1 });
        setValue(type, Number(state[type]) + 1)
    }

    const handleDecrement = (type: "adult" | "child") => {
        if (type === "child") {
            setState({ ...state, [type]: Number(state[type]) <= 0 ? 1 : Number(state[type]) - 1 });
            setValue(type, Number(state[type]) <= 0 ? 0 : Number(state[type]) - 1)
        } else {
            setState({ ...state, [type]: Number(state[type]) <= 1 ? 1 : Number(state[type]) - 1 });
            setValue(type, Number(state[type]) <= 1 ? 1 : Number(state[type]) - 1)
        }
    }

    const handlePalce = (valuePlace: string) => {
        //console.log(valuePlace)
        setValue('place', valuePlace)
    }

    const handleCalendar = (payload: any) => {
        //console.log(payload)
        setValue('check_in', payload.check_in)
        setValue('check_out', payload.check_out)
    }

    const handleSearchSubmit = async (payload: any) => {
        if (!payload.place && !payload.check_in && !payload.check_out && payload.adult === 0 && payload.child === 0) {
            return
        } else {
            const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
            current.set("place", payload.place);
            current.set("check_in", payload.check_in);
            current.set("check_out", payload.check_out);
            current.set("adult", payload.adult);
            current.set("child", payload.child);
            const search = current.toString();
            router.push(`/search?${search}`)

            if (pathname === "/search") {
                mutateSearch(`/search?${search}`)
            }
        }
    }

    return (
        <Box component={'form'} onSubmit={handleSubmit(handleSearchSubmit)} maxWidth={'460px'} width={'100%'}>
            <Stack direction={'row'}
                className='tippy-search'
                sx={{
                    border: '1px solid #DDDDDD',
                    borderRadius: '40px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
                    gap: '5px',
                    height: '60px',
                    "&:hover": {
                        backgroundColor: 'transparent',
                        border: '1px solid #DDDDDD',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.18)'
                    },
                }}>

                <Tippy
                    interactive
                    animation={false}
                    trigger={'click'}
                    placement='bottom'
                    render={attrs => (
                        <Box tabIndex={-1} {...attrs}>
                            {searchPlace === 1 &&
                                <Box sx={{
                                    overflowY: 'auto', bgcolor: "#fff", border: '1px solid #eee', borderRadius: '18px',
                                    boxShadow: '0 1px 8px rgba(0,0,0,.3)', width: { xs: '310px', md: '350px' }, height: '420px'
                                }}>
                                    <Box padding={'10px'} sx={{
                                        '& fieldset': {
                                            borderRadius: '15px'
                                        }
                                    }}>
                                        <InputField control={control} name="place" label='Địa điểm' />
                                    </Box>

                                    <Box>
                                        <Box mt={2} mb={2}><Typography textAlign={'center'}>Tìm kiếm theo khu vực</Typography></Box>
                                        <Stack direction={'row'} justifyContent={{ xs: 'space-around', md: 'space-between' }} alignItems={'center'} flexWrap={'wrap'} padding={'8px'} useFlexGap spacing={2} sx={{ '& img:hover': { boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;' } }}>
                                            <Box>
                                                <Box position={'relative'} width={100} height={100} onClick={() => handlePalce('Thailand')}>
                                                    <Image src={'https://a0.muscache.com/im/pictures/924d2b73-6c65-4d04-a2ad-bbc028299658.jpg?im_w=320'} fill alt='place-img' style={{ borderRadius: '10px' }} />
                                                </Box>
                                                <Box><Typography>Thái Lan</Typography></Box>
                                            </Box>
                                            <Box>
                                                <Box position={'relative'} width={100} height={100} onClick={() => handlePalce('Australia')}>
                                                    <Image src={'https://a0.muscache.com/im/pictures/42a1fb0f-214c-41ec-b9d7-135fbbdb8316.jpg?im_w=320'} fill alt='place-img' style={{ borderRadius: '10px' }} />
                                                </Box>
                                                <Box><Typography>Úc</Typography></Box>
                                            </Box>
                                            <Box>
                                                <Box position={'relative'} width={100} height={100} onClick={() => handlePalce('Japan')}>
                                                    <Image src={'https://a0.muscache.com/im/pictures/26891a81-b9db-4a9c-8aab-63486b7e627c.jpg?im_w=320'} fill alt='place-img' style={{ borderRadius: '10px' }} />
                                                </Box>
                                                <Box><Typography>Nhật Bản</Typography></Box>
                                            </Box>
                                            <Box>
                                                <Box position={'relative'} width={100} height={100} onClick={() => handlePalce('Vietnam')}>
                                                    <Image src={'https://res.cloudinary.com/dqsfwus9c/image/upload/v1716328006/ktravel/country/map-vn_egmokw.png'} fill alt='place-img' style={{ borderRadius: '10px' }} />
                                                </Box>
                                                <Box><Typography>Việt Nam</Typography></Box>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Box>}
                        </Box>)}>

                    <Button sx={{ color: '#717171', borderRadius: '30px', padding: '20px', maxWidth: '132px', width: '100%', backgroundColor: 'transparent !important' }} onClick={() => setSearchPlace(1)}>
                        <Typography>{watch('place') ? <Typography fontSize={14}>{watch('place').length > 9 ? watch('place').substring(0, 9) + "..." : watch('place')}</Typography> : 'Địa điểm'} </Typography>
                    </Button>
                </Tippy>
                <Divider orientation="vertical" flexItem />

                <Tippy
                    interactive
                    animation={false}
                    trigger={'click'}
                    placement='bottom'
                    render={attrs => (
                        <Box tabIndex={-1} {...attrs}>
                            {searchCalendar === 1 &&
                                <Box sx={{
                                    overflowY: 'auto', overflowX: 'hidden', bgcolor: "#fff", border: '1px solid #eee', borderRadius: '18px',
                                    boxShadow: '0 1px 8px rgba(0,0,0,.3)',
                                    width: { xs: '310px', md: '550px' }, height: '400px'
                                }}>
                                    <Box width={'100%'} sx={{
                                        '& div': {
                                            width: '100%',
                                        },

                                    }}>
                                        <Calendar onChange={handleCalendar} />
                                    </Box>
                                </Box>}
                        </Box>)}>
                    <Button sx={{ color: '#717171', borderRadius: '30px', maxWidth: '105px', width: '100%', backgroundColor: 'transparent !important' }} onClick={() => setSearchCalendar(1)}>
                        <Typography>{(watch('check_in') && watch('check_out')) ? <Box fontSize={14}><Box>{watch('check_in')}</Box><Box>{watch('check_out')}</Box></Box> : 'Tuần bất kỳ'} </Typography>
                    </Button>
                </Tippy>

                <Divider orientation="vertical" flexItem />

                <Stack sx={{ color: '#717171' }}
                    direction={'row'} justifyContent={'center'} alignItems={'center'}
                    maxWidth={'170px'} width={'100%'}>
                    <Tippy
                        interactive
                        animation={false}
                        trigger={'click'}
                        placement='bottom'
                        render={attrs => (
                            <Box tabIndex={-1} {...attrs}>
                                {searchFloorPlan === 1 &&
                                    <Box sx={{
                                        overflowY: 'auto', bgcolor: "#fff", border: '1px solid #eee',
                                        borderRadius: '18px', boxShadow: '0 1px 8px rgba(0,0,0,.3)',
                                        width: { xs: '250px', md: '380px' }, height: '200px'
                                    }}>
                                        <Box padding={'15px'}>
                                            {dataList.map((item, index) =>
                                                <Box key={index} padding={'16px 0'}>
                                                    <Stack direction={'row'} justifyContent={'space-between'}>
                                                        <Box><Typography>{item.name}</Typography></Box>
                                                        <Box>
                                                            <Stack direction={'row'} gap={2} alignItems={'center'}>
                                                                <IconButton aria-label="delete" size="small" onClick={() => handleDecrement(item.type as 'adult' | 'child')}
                                                                    sx={{ border: '1px solid #B0B0B0' }}>
                                                                    <RemoveIcon />
                                                                </IconButton>

                                                                <Typography component={'span'}>{state[item.type as keyof Partial<Room>] as string}</Typography>
                                                                <InputField control={control} name={item.type} label='Giá' sx={{ display: 'none' }} />

                                                                <IconButton aria-label="delete" size="small" onClick={() => handleIncrement(item.type as 'adult' | 'child')}
                                                                    sx={{ border: '1px solid #B0B0B0' }}>
                                                                    <AddIcon />
                                                                </IconButton>
                                                            </Stack>
                                                        </Box>
                                                    </Stack>
                                                    {index === dataList.length - 1 ? '' : <Divider sx={{ marginTop: '13px' }} />}
                                                </Box>
                                            )}
                                        </Box>

                                    </Box>}
                            </Box>)}>
                        <Button sx={{ color: '#717171', borderRadius: '30px', backgroundColor: 'transparent !important' }} onClick={() => setSearchFloorPlan(1)}>
                            <Typography>{(watch('adult') == 0 && (watch('child') == 0)) && 'Khách'}</Typography>
                            <Typography fontSize={{ xs: 11, sm: 12, md: 14 }}>{(watch('adult') !== 0) && `${watch('adult')} người lớn`} {(watch('child') !== 0) && `, ${watch('child')} trẻ em`}</Typography>
                        </Button>
                    </Tippy>
                    <IconButton aria-label="delete" type='submit'>
                        <SearchIcon
                            sx={{
                                fontSize: 18,
                                backgroundColor: '#ff385c',
                                color: '#fff',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                padding: '7px'
                            }} />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    );
}

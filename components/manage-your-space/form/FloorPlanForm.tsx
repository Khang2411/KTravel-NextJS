'use client'
import InputField from '@/components/form/InputField';
import { Room } from '@/models';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, CircularProgress, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';

interface FloorPlanFormProps {
    onSubmit?: (payload: Partial<Room>) => void,
    handleToggle?: () => void,
    adult: number | undefined
    child: number | undefined,
    bedroom: number | undefined,
    bathroom: number | undefined
}

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
    {
        name: 'Phòng ngủ',
        type: 'bedroom'
    },

    {
        name: 'Phòng tắm',
        type: 'bathroom'
    }
]

export const FloorPlanForm = ({ onSubmit, handleToggle, adult, child, bedroom, bathroom }: FloorPlanFormProps) => {
    const [state, setState] = useState<Partial<Room>>({ adult: adult, bedroom: bedroom, child: child, bathroom: bathroom })

    const { handleSubmit, control, setValue, formState: { isSubmitting } } = useForm<Partial<Room>>({
        defaultValues: {
            adult: adult,
            bedroom: bedroom,
            child: child,
            bathroom: bathroom
        },
    });

    const handleIncrement = (type: keyof Partial<Room>) => {
        setState({ ...state, [type]: Number(state[type]) + 1 });
        setValue(type, Number(state[type]) + 1)
    }

    const handleDecrement = (type: keyof Partial<Room>) => {
        setState({ ...state, [type]: Number(state[type]) <= 1 ? 1 : Number(state[type]) - 1 });
        setValue(type, Number(state[type]) <= 1 ? 1 : Number(state[type]) - 1)
    }

    const handleFormSubmit = async (payload: Partial<Room>) => {
        await onSubmit?.(payload)
    };

    return (
        <Box component={'form'} onSubmit={handleSubmit(handleFormSubmit)}
            sx={{
                position: 'relative',
                border: '1px solid rgb(221, 221, 221)',
                borderRadius: '16px',
                padding: '16px 24px',
            }}>
            <IconButton aria-label="delete" onClick={handleToggle}
                sx={{ position: 'absolute', right: '10px', top: '0', marginBlockEnd: '15px' }}>
                <CloseIcon fontSize="small" />
            </IconButton>
            <Box marginBottom={2}><Typography fontWeight={600}>Thông tin chỗ ở</Typography></Box>
            <Box>
                {dataList.map((item, index) =>
                    <Box key={index} padding={'16px 0'}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Box><Typography>{item.name}</Typography></Box>
                            <Box>
                                <Stack direction={'row'} gap={2} alignItems={'center'}>
                                    <IconButton aria-label="delete" size="small" onClick={() => handleDecrement(item.type as keyof Partial<Room>)}
                                        sx={{ border: '1px solid #B0B0B0' }}>
                                        <RemoveIcon />
                                    </IconButton>

                                    <Typography component={'span'}>{state[item.type as keyof Partial<Room>] as string}</Typography>
                                    <InputField control={control} name={item.type} label='Giá' sx={{ display: 'none' }} />

                                    <IconButton aria-label="delete" size="small" onClick={() => handleIncrement(item.type as keyof Room)}
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

            <Box sx={{ paddingBlock: '24px' }}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Button variant="text" onClick={handleToggle}>Hủy</Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
                        sx={{ backgroundColor: '#000000 !important' }}>Lưu</Button>
                </Stack>
            </Box>

        </Box>
    );
}

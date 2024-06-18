'use client'
import { Box, Typography, Modal, Divider } from '@mui/material';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter, useSearchParams } from 'next/navigation'

type ModalLayoutProps = {
    openModal: boolean;
    handleClose: (value: boolean) => void
    handleOpen: (value: boolean) => void
    title: string,
    heading: string,
    bodyContent: React.ReactNode
    footerContent: React.ReactNode
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
    p: 4,
};

export const ModalLayout = (props: ModalLayoutProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleClose = () => {
        props.handleClose(false)
        if (searchParams.get('back_to')) {
            router.push('/')
        }
    }
    return (
        <Box>
            <Modal
                sx={{ '& .MuiBackdrop-root': { backgroundColor: 'transparent' } }}
                open={props.openModal}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton aria-label="close" sx={{ position: 'absolute', top: '24px' }} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>

                    <Box className='heading' sx={{ textAlign: 'center', minHeight: '48px', padding: '0 24px' }}>
                        <Typography id="modal-modal-title" fontWeight={600}>
                            {props.title}
                        </Typography>
                    </Box>
                    <Divider variant='fullWidth' />
                    <Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight={600}>
                            {props.heading}
                        </Typography>
                        <Box id="modal-modal-description" sx={{ mt: 2 }}>
                            {props.bodyContent}
                        </Box>
                        <Box id="modal-modal-footer" sx={{ mt: 2 }}>
                            {props.footerContent}
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

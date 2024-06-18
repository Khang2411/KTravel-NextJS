'use client'
import { useAuth } from "@/hook";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { AccountAvatarForm, AccountEmailForm, AccountNameForm, AccountPasswordForm, AccountPhoneForm } from ".";

type BasicsProps = {
    edit?: boolean
}

export const AccountBasics = ({ edit = true }: BasicsProps) => {
    const [toggleName, setToggleName] = useState(false)
    const [toggleEmail, setToggleEmail] = useState(false)
    const [togglePhone, setTogglePhone] = useState(false)
    const [togglePassword, setTogglePassword] = useState(false)
    const [toggleAvatar, setToggleAvatar] = useState(false)
    const { profile, update } = useAuth()

    const handleNameSubmit = async (payload: { name: string }) => {
        try {
            await update({ name: payload.name })
            toast.success('Cập nhật thành công', { autoClose: 1000 });
        } catch (err) {
            toast.error('Có lỗi trong tài khoản', { autoClose: 1000 });
            console.log(err)
        }
        setToggleName(false)

    }

    const handleEmailSubmit = async (payload: { email: string }) => {
        try {
            await update({ email: payload.email })
            toast.success('Cập nhật thành công', { autoClose: 1000 });
        } catch (err) {
            toast.error('Có lỗi trong tài khoản', { autoClose: 1000 });
            console.log(err)
        }
        setToggleEmail(false)
    }

    const handlePhoneSubmit = async (payload: { phone: string }) => {
        try {
            await update({ phone: payload.phone })
            toast.success('Cập nhật thành công', { autoClose: 1000 });
        } catch (err) {
            toast.error('Có lỗi trong tài khoản', { autoClose: 1000 });
            console.log(err)
        }
        setTogglePhone(false)
    }

    const handlePasswordSubmit = async (payload: { password: string, password_confirmation: string, password_current: string }) => {
        try {
            await update({ password: payload.password, password_confirmation: payload.password_confirmation, password_current: payload.password_current })
            toast.success('Cập nhật thành công', { autoClose: 1000 });
        } catch (err) {
            toast.error('Mật khẩu hiện tại không khớp', { autoClose: 2000 });
        }
        setTogglePassword(false)
    }

    const handleAvatarSubmit = async (payload: { avatar: { file: File } }) => {
        try {
            await update({ avatar: payload.avatar.file })
            toast.success('Cập nhật thành công', { autoClose: 1000 });
        } catch (err) {
            toast.error('Có lỗi trong tài khoản', { autoClose: 1000 });
            console.log(err)
        }
        setToggleAvatar(false)
    }

    return (
        <Box id="basics" sx={{ '&>div': { paddingBlock: '24px' } }}>
            <Box>
                <Typography fontSize={'1.25rem'} fontWeight={600}>Thông tin tài khoản</Typography>
            </Box>

            {toggleName !== true ? <Box>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography>Tên người dùng</Typography>
                        <Box>{profile?.data.name}</Box>
                    </Box>
                    <Box>
                        {edit && <Button variant="text" onClick={() => setToggleName(!toggleName)} sx={{ textWrap: 'nowrap' }}>Chỉnh sửa</Button>}
                    </Box>
                </Stack>
            </Box> : <AccountNameForm name={profile?.data.name!} onSubmit={handleNameSubmit} handleToggle={() => setToggleName(!toggleName)} />}
            <Divider />

            {toggleEmail !== true ? <Box>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography>Email</Typography>
                        <Box>{profile?.data.email}</Box>
                    </Box>
                    <Box>
                        {edit && <Button variant="text" onClick={() => setToggleEmail(!toggleEmail)} sx={{ textWrap: 'nowrap' }}>Chỉnh sửa</Button>}
                    </Box>
                </Stack>
            </Box> : <AccountEmailForm email={profile?.data.email!} onSubmit={handleEmailSubmit} handleToggle={() => setToggleEmail(!toggleEmail)} />}
            <Divider />
            {togglePhone !== true ? <Box>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography>SĐT</Typography>
                        <Box>{profile?.data.phone}</Box>
                    </Box>
                    <Box>
                        {edit && <Button variant="text" onClick={() => setTogglePhone(!togglePhone)} sx={{ textWrap: 'nowrap' }}>Chỉnh sửa</Button>}
                    </Box>
                </Stack>
            </Box> : <AccountPhoneForm phone={profile?.data.phone!} onSubmit={handlePhoneSubmit} handleToggle={() => setTogglePhone(!togglePhone)} />}
            <Divider />
            {togglePassword !== true ? <Box>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography>Mật khẩu</Typography>
                        <Box>********</Box>
                    </Box>
                    <Box>
                        {edit && <Button variant="text" onClick={() => setTogglePassword(!togglePassword)} sx={{ textWrap: 'nowrap' }}>Chỉnh sửa</Button>}
                    </Box>
                </Stack>
            </Box> : <AccountPasswordForm onSubmit={handlePasswordSubmit} handleToggle={() => setTogglePassword(!togglePassword)} />}

            <Divider />

            {toggleAvatar !== true ? <Box>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography>Ảnh đại diện</Typography>
                        <Avatar
                            alt="avatar-img"
                            src={profile?.data.avatar as string || `https://ui-avatars.com/api/?name=${encodeURI(profile?.data.name!)}&background=232323&color=fff`}
                            sx={{ width: 56, height: 56, marginTop: '10px' }}
                        />
                    </Box>
                    <Box>
                        {edit && <Button variant="text" onClick={() => setToggleAvatar(!toggleAvatar)} sx={{ textWrap: 'nowrap' }}>Chỉnh sửa</Button>}
                    </Box>
                </Stack>
            </Box> : <AccountAvatarForm avatar={profile?.data.avatar as string || `https://ui-avatars.com/api/?name=${encodeURI(profile?.data.name!)}&background=232323&color=fff`}
                onSubmit={handleAvatarSubmit}
                handleToggle={() => setToggleAvatar(!toggleAvatar)} />}
        </Box>
    );
}



import { Box, FormHelperText, Typography } from '@mui/material'
import Image from 'next/image'
import { ChangeEvent } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { DEFAULT_THUMBNAIL_URL } from '../constants'

type PhotoFieldProps<T extends FieldValues> = {
	name: Path<T>
	control: Control<T>
	label?: string,
	src: string,
	srcHeight: number,
	srcWidth: number,
	editAvatar?: boolean
}

export function PhotoField<T extends FieldValues>({ name, control, label, src, srcHeight, srcWidth, editAvatar = false }: PhotoFieldProps<T>) {
	const {
		field: { onChange, value, ref },
		fieldState: { error },
	} = useController({
		name,
		control,
	})

	function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]
		if (!file) return

		const url = URL.createObjectURL(file)
		console.log({ url, file })
		onChange({
			file,
			previewUrl: url,
		})
	}

	// value data type
	// - null
	// - { file: File, previewUrl: string }
	const previewUrl = value?.['previewUrl'] || src
	const inputId = `photo-field-${name}`

	return (
		<Box>
			<Typography variant="body2">{label}</Typography>
			<Box component="label" htmlFor={inputId} sx={{ cursor: 'pointer' }} ref={ref}>
				<Image src={previewUrl} width={srcWidth} height={srcHeight} alt="verify-thumbnail" style={{ borderRadius: editAvatar ? '50%' : 'initial' }} />
			</Box>
			<Box
				id={inputId}
				component="input"
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				hidden
			></Box>
			<FormHelperText error={!!error} sx={{ textAlign: 'center' }}>{error?.message}</FormHelperText>
		</Box>
	)
}
import { Box, Typography, FormHelperText } from '@mui/material';
import error from 'next/error';
import React, { useEffect, useRef } from 'react'
import { Control, useController } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill';

type Props = {
    name: string,
    control: Control<any>,
    label?: string
}

export default function EditorField({ label, name, control }: Props) {
    const {
        field,
        fieldState,
    } = useController({
        name,
        control,
    });
    const forwardRef = useRef(null)

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, false] }],
                [{ color: [] }, { background: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['link'],
                ['clean'],
            ],
            handlers: {
                // image: imageHandler,
            },
        },
    }

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'color',
        'background',
    ]

    return (
        <Box sx={{ my: 1.5 }}>
            <Typography variant="body2">{label}</Typography>

            <Box>
                {/* editor - react quill */}
                <ReactQuill
                    {...field}
                    ref={forwardRef}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    onChange={(content) => field.onChange(content)}
                    style={{ height: '300px' }}
                />
            </Box>

            <FormHelperText error={!!error}>{fieldState.error?.message}</FormHelperText>
        </Box>
    )
}
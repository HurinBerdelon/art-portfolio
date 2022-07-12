import { useState } from "react";
import { Container } from "./style";

interface ImageFormatProps {
    setFieldValue(field: string, value: any): void
}

export function ImageFormat({ setFieldValue }: ImageFormatProps): JSX.Element {

    const [format, setFormat] = useState('square')

    return (
        <Container>
            <button
                type="button"
                className={format === 'square' ? 'active' : ''}
                onClick={() => {
                    setFormat('square')
                    setFieldValue('imageFormat', 'square')
                }}
            >
                Square
            </button>
            <button
                type="button"
                className={format === 'circle' ? 'active' : ''}
                onClick={() => {
                    setFormat('circle')
                    setFieldValue('imageFormat', 'circle')
                }}
            >
                Circle
            </button>
        </Container>
    )
}
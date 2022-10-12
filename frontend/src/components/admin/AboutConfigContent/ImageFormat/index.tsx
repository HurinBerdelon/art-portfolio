import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Container } from "./style";

interface ImageFormatProps {
    setFieldValue(field: string, value: any): void
}

export function ImageFormat({ setFieldValue }: ImageFormatProps): JSX.Element {

    const [format, setFormat] = useState('square')
    const { t } = useTranslation()

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
                {t('admin:square')}
            </button>
            <button
                type="button"
                className={format === 'circle' ? 'active' : ''}
                onClick={() => {
                    setFormat('circle')
                    setFieldValue('imageFormat', 'circle')
                }}
            >
                {t('admin:circle')}
            </button>
        </Container>
    )
}
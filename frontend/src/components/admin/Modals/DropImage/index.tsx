import { createRef } from "react";
import Dropzone, { DropzoneRef } from "react-dropzone";
import { Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { availableImageTypes } from "../../../../config/availableImageType";
import { Container } from "./style";
import { FormikErrors } from "formik";

interface ErrorProps {
    title?: string;
    uniqueCode?: string;
    category?: string;
    file?: string | undefined;
    description?: string;
    dimension?: string;
    productionDate?: string | FormikErrors<Date>;
}

interface DropImageProps {
    setFieldValue(field: string, value: any): void
    errors: ErrorProps
    preview: string
    setPreview(preview: string): void
}

export function DropImage({ errors, setFieldValue, preview, setPreview }: DropImageProps): JSX.Element {

    const dropzoneRef = createRef<DropzoneRef>()

    return (
        <Container>
            <Dropzone
                onDrop={(file) => {
                    setFieldValue('file', file[0])
                    const reader = new FileReader()
                    reader.readAsDataURL(file[0])
                    reader.onload = () => {
                        // reader.result = data:[dataType];[longstring]
                        // split(';')[0] gets the first part of the string, separeted on ;
                        // split(':')[1] takes the second parte of the current string, separeted on :
                        const dataType = String(reader.result).split(';')[0].split(':')[1]
                        if (availableImageTypes.includes(dataType)) {
                            setPreview(String(reader.result))
                        }
                    }
                }}
                ref={dropzoneRef}
            >
                {({ getRootProps, getInputProps, isDragActive }) => (
                    preview
                        ? <div
                            className={`previewZone`}
                        >
                            <img className="preview" src={preview} alt="art preview" />
                            <Tooltip title='Delete Preview'>
                                <DeleteIcon
                                    className="removeButton"
                                    onClick={() => setPreview('')}
                                />
                            </Tooltip>
                        </div>
                        : <div
                            className={
                                `dragZone 
                                ${errors.file ? 'dragZoneError' : ''} 
                                ${isDragActive ? 'isDragActive' : ''}`
                            }
                            {...getRootProps()}
                        >
                            < input {...getInputProps()} />
                            {isDragActive ?
                                <p>Drop the file Here</p> :
                                <p>Drag 'n Drop file here</p>}

                            {errors.file && <div className="errorMessage">{String(errors.file)}</div>}
                        </div>
                )}
            </Dropzone>
        </Container>
    )
}
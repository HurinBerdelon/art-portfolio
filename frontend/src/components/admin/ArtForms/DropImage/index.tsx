import { createRef } from "react";
import Dropzone, { DropzoneRef } from "react-dropzone";
import { Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import { availableImageTypes } from "../../../../config/availableImageType";
import { Container } from "./style";
import { FormikErrors } from "formik";
import { create } from "domain";

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
    errors: ErrorProps
    preview: string
    previewClassName?: string
    setPreview(preview: string): void
    setFieldValue(field: string, value: any): void
    createPreview?: () => void
}

export function DropImage({
    errors, setFieldValue, preview, previewClassName = 'square', setPreview, createPreview
}: DropImageProps): JSX.Element {

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
                            className={previewClassName === 'square' ? 'previewZone' : 'previewZoneCircle'}
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
                            {createPreview && <UndoIcon
                                className="undoButton" onClick={(event) => {
                                    // Recreate the preview
                                    createPreview()
                                    // prevent Input to be open
                                    event.stopPropagation()
                                }}
                            />}
                            {isDragActive ?
                                <p>Drop the file Here</p> :
                                <p>Click or Drag 'n Drop file here</p>}

                            {errors.file && <div className="errorMessage">{String(errors.file)}</div>}
                        </div>
                )}
            </Dropzone>
        </Container>
    )
}
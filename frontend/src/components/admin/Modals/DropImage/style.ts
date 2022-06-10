import styled from "styled-components";

export const Container = styled.div`
    
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .previewZone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border: 1px dashed var(--gray-500);
        border-radius: 0.25rem;
        position: relative;
        
        .preview {
            padding: 0.25rem;
            width: 100%;
            max-height: 500px;
            object-fit: contain;
            opacity: 0.85;
        }

        .removeButton {
            position: absolute;
            bottom: 0.5rem;
            right: 0.5rem;
            font-size: 2rem;

            &:hover{
                cursor: pointer;
                color: #f00;
            }
                }
    }

    .dragZone {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1px dashed var(--gray-500);
        border-radius: 0.25rem;
        cursor: pointer;

        p {
            padding: 15rem 8rem;
        }

        &:hover {
            border: 1px dashed #f00;
            color: #f00;
        }

        .errorMessage {
            text-align: center;
            height: 1.5rem;
        }
    }

    .dragZoneError {
        border: 1px dashed #f00;
        color: #f00;
   }

    .isDragActive {
        border: 1px dashed #f00;
        color: #f00;   
    }
`
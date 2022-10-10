import styled from "styled-components";

export const Container = styled.div`
    
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .previewZone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border: 1px dashed ${props => props.theme.colors.textOne};
        border-radius: 0.25rem;
        position: relative;
        
        .preview {
            padding: 0.25rem;
            width: 100%;
            max-height: 220px;
            max-width: 320px;
            object-fit: contain;
            opacity: 0.75;
        }

        .removeButton {
            position: absolute;
            bottom: 0.5rem;
            right: 0.5rem;
            font-size: 2rem;
            color: ${props => props.theme.colors.danger};
            
            &:hover{
                cursor: pointer;
                filter: brightness(1.2);
            }
        }
    }

    .previewZoneCircle {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border: 1px dashed ${props => props.theme.colors.textOne};
        border-radius: 50%;
        height: 250px;
        width: 250px;
        position: relative;
        
        
        .preview {
            padding: 0.25rem;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            opacity: 0.75;
        }

        .removeButton {
            position: absolute;
            bottom: 0.5rem;
            right: 0.5rem;
            font-size: 2rem;
            color: ${props => props.theme.colors.danger};
            
            &:hover{
                cursor: pointer;
            }
        }
    }

    .dragZone {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1px dashed ${props => props.theme.colors.textOne};
        border-radius: 0.25rem;
        cursor: pointer;
        position: relative;

        p {
            width: 320px;
            height: 220px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${props => props.theme.colors.textOne};
        }

        &:hover {
            border: 1px dashed ${props => props.theme.colors.danger};
            color: ${props => props.theme.colors.danger};
        }

        .undoButton {
            position: absolute;
            z-index: 2;
            bottom: 0.5rem;
            right: 0.5rem;
            font-size: 2rem;
            color: ${props => props.theme.colors.danger};

            &:hover{
                cursor: pointer;
                filter: brightness(1.2);
            }
        }

        .errorMessage {
            text-align: center;
            height: 1.5rem;
        }
    }

    .dragZoneError {
        border: 1px dashed ${props => props.theme.colors.danger};
        color: ${props => props.theme.colors.danger};
   }

    .isDragActive {
        border: 1px dashed ${props => props.theme.colors.danger};
        color: ${props => props.theme.colors.danger};   
    }

    @media (min-width: 1024px) {
        height: 100%;

        .previewZone {
            .preview {
                max-height: 520px;
                max-width: 420px;
            }
        }

        .dragZone {
            p {
                height: 520px;
                width: 420px;
            }
        }
    }
`
import styled from "styled-components";

export const Container = styled.div`

    .shareMediaButton {
        display: flex;
        gap: 0.5rem;
        color: ${props => props.theme.colors.textOne};
    }

    .dropdown-content {
        flex-direction: column;
        align-items: center;

        background: ${props => props.theme.colors.backgroundTwo};
        border-radius: 0.25rem;

        position: absolute;
        bottom: 2.5rem;
        left: 25%;
        z-index: 1;

        padding: 0.5rem 1rem;
        width: 50%;

        .socialMediaContent {
            display: flex;

            gap: 1rem;
            justify-content: center; 

            color: ${props => props.theme.colors.textOne};
            
            svg {
                font-size: 2rem;    
                
                &:hover {
                    filter: brightness(0.8);
                    cursor: pointer;
                }
            }
        }

        .copyPaste {
            display: flex;
            width: 100%;

            gap: 0.5rem;
            align-items: center;
            justify-content: center; 
            font-size: 1rem;

            color: ${props => props.theme.colors.textOne};

            &:hover {
                filter: brightness(0.8);
            }
        }
    }   
`
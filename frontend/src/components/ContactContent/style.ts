import styled from "styled-components";

export const Container = styled.section`
    
    background: ${props => props.theme.colors.backgroundOne};

    h1 {
        padding: 1rem;
        color: ${props => props.theme.colors.textOne};
        text-align: center;
    }

    .imageContainer {
        width: 100%;

        img {
            object-fit: contain;
            width: 100%;
        }
    }

    .contactInfos {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;
        gap: 0.5rem;

        .contactCard {
            display: flex;
            gap: 1rem;

            color: ${props => props.theme.colors.textOne};
            
            svg {
                align-self: center;
            }
        }
    }
`
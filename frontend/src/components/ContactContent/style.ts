import styled from "styled-components";

export const Container = styled.section`
    
    background: ${props => props.theme.colors.backgroundOne};
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
        padding: 1rem;
        color: ${props => props.theme.colors.textOne};
        text-align: center;
    }

    .imageContainer {
        width: 100%;
        max-width: 940px;
        margin: 0 auto;

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

    @media (min-width: 1024px) {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        padding: 2rem 0;
    }
`
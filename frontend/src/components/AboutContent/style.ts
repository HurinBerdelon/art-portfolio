import styled from "styled-components";

export const Container = styled.section`
    background: ${props => props.theme.colors.backgroundOne};
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1, h2, h3, h4 {
        padding: 1rem;
        color: ${props => props.theme.colors.textOne};
        text-align: center;
    }

    .imageContainer {
        max-width: 250px;
        height: 200px;

        img {
            object-fit: cover;
            width: 100%;
            max-height: 100%;
        }
    }

    .imageContainerCircle {
        width: 200px;
        height: 200px;

        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }

    p {
        color: ${props => props.theme.colors.textOne};
        padding: 1rem 2rem;
        text-align: justify;
    }
`
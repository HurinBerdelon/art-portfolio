import styled from "styled-components";

export const Container = styled.section`
    background: ${props => props.theme.colors.backgroundOne};
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;

    h1, h2, h3, h4 {
        color: ${props => props.theme.colors.textOne};
    }

    h1 {
        padding: 1rem 2rem ;
        text-align: center;
    }

    h2, h3, h4 {
        padding: .25rem 2rem ;
        text-align: left;
        width: 100%;
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
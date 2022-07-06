import styled from "styled-components";

export const Container = styled.section`
    background: ${props => props.theme.colors.backgroundOne};
    height: 80%;

    h1 {
        padding: 1rem;
        color: ${props => props.theme.colors.textOne};
        text-align: center;
    }

    p {
        color: ${props => props.theme.colors.textOne};
        padding: 1rem 2rem;
        text-align: justify;
    }
`
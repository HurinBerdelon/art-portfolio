import styled from "styled-components";

export const Container = styled.div`

    .pageTitle {
        color: ${props => props.theme.colors.textOne};
        margin: 1rem;
        text-align: center;
    }

    button {
        color: ${props => props.theme.colors.textOne};
    }
`
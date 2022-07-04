import styled from "styled-components";

export const Container = styled.nav`

    margin-top: 0.25rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    
    a {
        background: ${props => props.theme.colors.gray};
        color: ${props => props.theme.colors.textTwo};
        width: 125px;
        text-align: center;
        border-radius: 0.25rem;

        font-weight: 500;
        padding: 0.25rem;

        &.active {
            background: ${props => props.theme.colors.boxOne};
            color: ${props => props.theme.colors.textTwo};
        }
    }
`
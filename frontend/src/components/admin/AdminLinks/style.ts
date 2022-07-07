import styled from "styled-components";

export const Container = styled.nav`

    margin: 0.5rem 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
    
    a {
        background: ${props => props.theme.colors.gray};
        color: ${props => props.theme.colors.textThree};
        width: 100px;
        text-align: center;
        border-radius: 0.25rem;

        font-weight: 500;
        padding: 0.25rem;

        &.active {
            background: ${props => props.theme.colors.buttons};
            color: ${props => props.theme.colors.textThree};
        }
    }
`
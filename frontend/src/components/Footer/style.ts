import styled from "styled-components";

export const Container = styled.footer`
    background: ${props => props.theme.colors.boxOne};
    color: ${props => props.theme.colors.textThree};

    padding: 0.25rem 1rem;

    @media (min-width: 1024px) {
        display: none;
    }
    
`
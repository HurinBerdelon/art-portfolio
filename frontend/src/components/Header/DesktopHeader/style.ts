import styled from "styled-components";

export const Container = styled.header`
    display: none;
    background: ${props => props.theme.colors.boxOne};
    position: absolute;
    right: 0;
    z-index: 1;

    padding: 0.5rem 2rem;
    border-radius: 0 0 0rem 0.5rem;


    @media (min-width: 1024px) {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        gap: 1rem;
        box-shadow: 0.05rem 0.05rem 0.5rem ${props => props.theme.colors.boxTwo};
    }

`
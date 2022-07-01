import styled from "styled-components";

export const Container = styled.header`

    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 1rem; // 4px 16px

    background: ${props => props.theme.colors.boxOne};
    color: ${props => props.theme.colors.textOne};
    
    svg {
        color: ${props => props.theme.colors.textOne};
        font-size: 2.125rem; //34px
    }
`
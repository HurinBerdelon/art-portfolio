import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding-top: 1rem; // 16px
    margin: 0 auto;
    color: ${props => props.theme.colors.textOne};

    svg {
        cursor: pointer;
        color: ${props => props.theme.colors.textOne};
    }
    
    a {
        svg:hover {
            filter: brightness(0.8);
        }
    }
`
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding-top: 1rem; // 16px
    margin: 0 auto;
    color: ${props => props.theme.colors.textThree};

    svg {
        cursor: pointer;
        color: ${props => props.theme.colors.textThree};

        @media (min-width: 720px) {
            font-size: 2rem;
        }
    }
    
    a {
        svg:hover {
            filter: brightness(0.8);
        }
    }
`
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    position: absolute;
    bottom: 0rem;
    left: 0.5rem;

    svg {
        color: ${props => props.theme.colors.textThree};
        cursor: pointer;

        &:hover {
            filter: brightness(0.8);
        }
    }
    
    p {
        color: ${props => props.theme.colors.textThree};
        filter: brightness(1.4);
        font-weight: 400;
        font-size: 0.8rem;
    }
`
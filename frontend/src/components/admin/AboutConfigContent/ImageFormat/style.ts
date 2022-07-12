import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    gap: 1rem;
    
    button {
        background: ${props => props.theme.colors.gray};
        color: ${props => props.theme.colors.textThree};
        padding: 0.25rem .5rem;
        border-radius: 0.25rem;
        min-width: 75px;
        font-weight: 500;

        &.active {
            background: ${props => props.theme.colors.buttons};
        }
    }

`
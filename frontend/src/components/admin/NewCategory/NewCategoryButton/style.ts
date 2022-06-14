import styled from "styled-components";

export const Container = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 1rem;
    top: 0.15rem;

    button {
        background: none;
        border: none;
        color: var(--green-900);

        &:hover {
            filter: brightness(2);
        }
    }
`
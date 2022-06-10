import styled from "styled-components";

export const Container = styled.button`
    width: 10rem;
    font-size: 1.2rem;
    font-weight: 400;

    background: none;
    border: 1px solid;
    border-radius: 0.25rem;

    background: var(--green-600);
    color: var(--beige-100);

    &:hover {
        background: var(--green-400);
    }
`
import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    z-index: 1;
    border-radius: 0.25rem;
    box-shadow: 0.25rem 0.25rem 0.5rem var(--green-900);
    background: var(--beige-500); 

    padding: 1rem;
    display: flex;
    gap: 0.25rem;
    flex-direction: column;

    .content {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        border-bottom: 1px dashed var(--green-900);
    }

    button {
        background: none;
        border: none;
        color: var(--green-900);

        &:hover {
            filter: brightness(2);
        }
    }
`
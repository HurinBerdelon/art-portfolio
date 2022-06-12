import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    form {
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    h2 {
        margin-top: 1rem;
        color: var(--green-900);
    }
`
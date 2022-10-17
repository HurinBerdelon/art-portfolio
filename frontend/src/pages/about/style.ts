import styled from "styled-components";

export const Container = styled.main`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;

    @media (min-width: 1024px) {
        flex-direction: row;
    }
`
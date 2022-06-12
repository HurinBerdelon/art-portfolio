import styled from "styled-components";

export const Container = styled.div`
    min-width: 250px;
    min-height: 100px;
    padding: 1rem;

    display: flex;
    flex-direction: column;

    h2 {
        font-size: 1.125rem; // default: 18px
        font-weight: 700;
        margin-bottom: .5rem;
    }

    p {
        font-size: 1rem; // default: 16px
        padding-right: 0.5rem;
    }
`
import styled from "styled-components";

export const Container = styled.section`
    padding-top: 2rem;

    .buttonPrevious, .buttonNext {
        display: none;
    }

    img {
        object-fit: contain;
        width: 100%;
        max-height: 450px;
        border-radius: 0.5rem;
    }
`
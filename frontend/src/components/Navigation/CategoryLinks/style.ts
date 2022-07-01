import styled from "styled-components";

export const Container = styled.div`

    .categoriesButton {
        color: ${props => props.theme.colors.textThree};
        cursor: pointer;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        svg {
            margin-left: -0.8rem;
        }
    }

    .categoriesLink {
        padding-left: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        overflow-y: auto;
        overflow-x: hidden;
    }
`
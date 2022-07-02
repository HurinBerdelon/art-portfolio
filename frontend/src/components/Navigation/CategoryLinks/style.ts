import styled from "styled-components";

export const Container = styled.div`

    .categoriesButton {
        color: ${props => props.theme.colors.textTwo};
        cursor: pointer;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        svg {
            margin-left: -0.8rem; // -12.8px
        }
    }

    .categoriesLink {
        padding-left: 1.35rem; //21.6px
        display: flex;
        flex-direction: column;
        gap: 0.25rem; // 4px
        margin-bottom: 0.5rem;

        overflow-y: auto;
        overflow-x: hidden;
        color: ${props => props.theme.colors.textTwo};
    }
`
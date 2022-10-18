import styled from "styled-components";

export const Container = styled.div`
    background: ${props => props.theme.colors.backgroundOne};
    height: 100%;
    overflow: auto;

    @media (min-width: 1024px) {
        display: flex;
        flex: 1;

        .contentContainer {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
    }
`
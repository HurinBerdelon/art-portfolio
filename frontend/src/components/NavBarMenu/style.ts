import styled from "styled-components";

export const Container = styled.div`

    .menuContent {
        position: absolute;
        z-index: 1;
        background: ${props => props.theme.colors.boxOne};
        right: 0; 
    }
`
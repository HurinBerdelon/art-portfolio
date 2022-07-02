import styled from "styled-components";

export const Container = styled.div`
    flex: 1;
    height: 100%;
    background: ${props => props.theme.colors.backgroundTwo};
    
    main {
        height: 90%;
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding-bottom: 2rem;
    }
`
import styled from "styled-components";

export const Container = styled.div`
    height: 100%;
    width: 100%;
    background: ${props => props.theme.colors.backgroundOne};
    display: flex;
    flex-direction: column;
    
    main {
        padding: 0 1rem;
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-evenly;
        padding-bottom: 2rem;

        @media (min-width: 1024px) {
            flex-direction: row;
            padding: 1rem;
        }
    }

    @media (min-width: 1024px) {
        flex-direction: row;

        main {
            flex: 1;
        }
    }
`
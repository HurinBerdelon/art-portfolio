import styled from "styled-components";

export const Container = styled.nav`
    width: 20%;
    min-width: 200px;
    height: 100%;
    background: var(--gray-100);
    /* position: fixed; */
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    h1 {
        color: var(--gray-900);
    }

    .media-links {
        width: 8rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;

        color: var(--gray-900);

        a {
            svg:hover {
                filter: brightness(1.5)
            }
        }
    }
`
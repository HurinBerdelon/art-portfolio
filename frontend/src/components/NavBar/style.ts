import styled from "styled-components";

export const Container = styled.nav`
    width: 15%;
    min-width: 250px;
    height: 100%;
    background: var(--green-600);
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    h1 {
        color: var(--beige-100);
    }

    .media-links {
        width: 8rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;

        color: var(--beige-100);

        a {
            svg:hover {
                color: var(--beige-500);
            }
        }
    }
`
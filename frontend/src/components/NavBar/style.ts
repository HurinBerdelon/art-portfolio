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

    ul {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        width: 8rem;

        li {
            list-style: none;
            position: relative;
            cursor: pointer;

            &::after {
                content: '';
                height: 2px;
                border-radius: 0 0 2px 2px;
                width: 0%;
                position:absolute;
                bottom: 0.5px;
                left: 0px;
                background: var(--gray-500);
                transition: 0.75s;
            }

            &.active::after {
                width: 20%;
            }

            &:hover {
                &::after {
                    width: 100%;
                }
            }


        }      
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
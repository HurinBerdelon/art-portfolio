import styled from "styled-components";

export const Container = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 8rem;

    .categoryButton {
        color: var(--beige-100);
        cursor: pointer;

        display: flex;
        justify-content: flex-start;

        svg {
            margin-left: -0.6rem;
        }
    }

    .categoryPages {
        padding-left: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        max-height: 300px;
        overflow-y: auto;
        overflow-x: hidden;
        width: 140%;
    }
    
    a {
        position: relative;
        cursor: pointer;
        color: var(--beige-100);

        &::after {
            content: '';
            height: 2px;
            border-radius: 0 0 2px 2px;
            width: 0%;
            position:absolute;
            bottom: 0.5px;
            left: 0px;
            background: var(--beige-100);
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
`
import styled from "styled-components";

export const Container = styled.ul`
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
`
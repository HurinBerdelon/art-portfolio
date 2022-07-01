import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem; // 4px
    padding: 2rem; // 16px

    .effectLinks {
        position: relative;
        cursor: pointer;
        color: ${props => props.theme.colors.textThree};

        &::after {
            content: '';
            height: 2px;
            border-radius: 0 0 2px 2px;
            width: 0%;
            position: absolute;
            bottom: 0.5px;
            left: 0px;
            background: ${props => props.theme.colors.textThree};
            transition: 0.75s
        }

        &.active::after {
            width: 20%
        }

        &:hover {
            &::after {
                width: 100%;
            }
        }
    }
`
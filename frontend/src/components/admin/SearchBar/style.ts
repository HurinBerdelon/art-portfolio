import styled from "styled-components";

export const Container = styled.div`

    margin: 0.25rem;
    border: 1px solid ${props => props.theme.colors.textOne};
    border-radius: 0.25rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    position: relative;
    
    input {
        border: none;
        background: none;
        width: 100%;
        color: ${props => props.theme.colors.textOne};
        padding: 0 0.5rem;

        &:focus{
            border: none;
            outline: none;
        }
    }

    button {
        padding: 0.125rem 0 0.125rem 1rem;
        display: flex;
        align-items: center;
        border-radius: 0.25rem 0 0 0.25rem;

        color: ${props => props.theme.colors.textThree};
        background: ${props => props.theme.colors.boxOne};
        font-size: 1.125rem;
        font-weight: 500;

        span {
            color: ${props => props.theme.colors.textOne};
            font-size: 1.5rem;
        }
    }

    svg:last-child {
        color: ${props => props.theme.colors.textOne};
        margin-right: 0.5rem;
    }

    .options {
        position: absolute;
        top: 2.25rem;
        color: ${props => props.theme.colors.textThree};
        background: ${props => props.theme.colors.boxOne};
        padding: 1rem;
        list-style: none;

        border-radius: 0.25rem;

        span {
            display: flex;
            align-items: center;
            svg {
                font-size: 1rem;
            }
        }
    }
`
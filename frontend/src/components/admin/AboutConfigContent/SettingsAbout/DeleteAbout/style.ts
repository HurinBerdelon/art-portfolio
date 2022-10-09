import styled from "styled-components";

export const Container = styled.div`

    margin-top: 50%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6rem;

    padding: 1rem;

    h2 {
        color: ${props => props.theme.colors.textOne};
        margin-top: 1rem;
    }

    p {
        color: ${props => props.theme.colors.textOne};
        text-align: center;
        font-size: 1.125rem;
    }

    .buttons {
        display: flex;
        gap: 1rem;

        button {
            font-size: 1.125rem;
            font-weight: 500;
            padding: 0.25rem 0rem;
            border-radius: 0.25rem;
            width: 100px;
        }

        .cancelButton {
            background: ${props => props.theme.colors.gray};
            color: ${props => props.theme.colors.textThree};
        }

        .confirmButton {
            background: ${props => props.theme.colors.danger};
            color: ${props => props.theme.colors.textThree};
        }
    }

`
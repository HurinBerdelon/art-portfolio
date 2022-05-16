import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    h2 {
        margin-top: 2rem;
    }

    form {
        width: 50%;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        input {
            height: 2rem;
            border: solid 1px;
            border-radius: 0.25rem;
            text-align: center;
            font-size: 1.125rem;
        }

        textarea {
            height: 16rem;
            border: solid 1px;
            border-radius: 0.25rem;
            text-align: center;
            font-size: 1.125rem
        }

        button {
            height: 2rem;
            border: solid 1px;
            border-radius: 0.25rem;
        }
    }
`
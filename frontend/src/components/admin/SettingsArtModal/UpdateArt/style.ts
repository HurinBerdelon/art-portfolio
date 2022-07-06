import styled from "styled-components";

export const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    h2 {
        /* margin-top: 3rem; */
        color:${props => props.theme.colors.textOne};
    }

    .delete {
        display: flex;
        align-items: center;
        align-self: flex-end;
        font-weight: 500;
        color: ${props => props.theme.colors.danger};
        
        svg {
            font-size: 2rem;
        }
    }
`
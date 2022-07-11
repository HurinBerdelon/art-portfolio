import styled from "styled-components";

export const Container = styled.div`

    .pageTitle {
        color: ${props => props.theme.colors.textOne};
        margin-top: 1rem;
        text-align: center;
    }

    .pageDescription {
        padding: 1rem 3rem;
        font-size: 0.8rem;
        text-align: justify;
    }

    table {
        width: 100%;

        thead, tr {
            margin-bottom: 0.5rem;
        }

        tbody tr, thead tr {
            width: 100%;
            padding: 0 0.5rem;

            display: grid;
            grid-template-columns: 1.25fr repeat(3, 1fr);
        }

        .updateAt {
            display: flex;
            width: 100%;
            border: 1px solid;
            display: table-cell;
        }

        .title {
            font-size: 1.25rem;
        }

        .settings {
            display: flex;
            justify-content: center;
            font-size: 0.8rem;
            gap: 0.25rem;
        }

        th, td {
            display: flex;
            align-items: center;
            justify-content: center;
            /* text-align: center; */
            color: ${props => props.theme.colors.textOne};
        }
        
    }

    button {
        color: ${props => props.theme.colors.textOne};
    }
`
import styled from "styled-components";

export const Container = styled.section`

    table {
        width: 100%;

        tbody tr, thead tr {
            width: 100%;
            padding: 0 0.5rem;

            display: grid;
            grid-template-columns: repeat(4, 1fr);

            td {
                border-bottom: 1px dashed ${props => props.theme.colors.textOne};
            }

            .settings {
                display: flex;
                justify-content: center;
            }

            th, td {
                display: flex;
                align-items: center;
                text-align: left;
                color: ${props => props.theme.colors.textOne};
                min-height: 40px;

                svg {
                    cursor: pointer;
                    color: ${props => props.theme.colors.textOne};
                }
            }
        }
    }
`
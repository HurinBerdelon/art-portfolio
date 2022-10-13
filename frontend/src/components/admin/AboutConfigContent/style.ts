import styled from "styled-components";

export const Container = styled.div`

    .pageTitle {
        color: ${props => props.theme.colors.textOne};
        margin: 1rem 0;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: .5rem;

        button {
            display: flex;
        }
    }

    .pageDescription {
        position: absolute;
        z-index: 1;
        background: ${props => props.theme.colors.backgroundTwo};
        
        min-width: 180px;
        max-width: 280px;
        right: 1rem;
        border-radius: 0.25rem;
        
        padding: 1rem 2rem;
        font-size: 0.8rem;
        font-weight: 400;
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
            color: ${props => props.theme.colors.textOne};

            svg {
                cursor: pointer;

                &:hover {
                    filter: brightness(2);
                }
            }
        }
        
    }

    button {
        color: ${props => props.theme.colors.textOne};
    }

    @media (min-width: 1024px) {

        table {
            tbody tr, thead tr {
                td, th {
                    font-size: 1.2rem;
                }
            }
            
            .settings {
                font-size: 1rem;
            }
        }

        .pageDescription{
            font-size: 1rem;
            max-width: 380px;

            right: 17%;
        }
    }
`
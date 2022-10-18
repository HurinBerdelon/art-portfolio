import styled from "styled-components";

export const Container = styled.section`
    
    display: flex;
    flex-direction: column;
    overflow: auto;

    .updateArtsPages {
        align-self: center;
        width: fit-content;
        display: flex;
        align-items: center;              
        background: ${props => props.theme.colors.buttons};
        color: ${props => props.theme.colors.textThree};
        border-radius: 0.25rem;
        padding: 0.25rem 0.5rem;
        font-weight: 400;

        @media (min-width: 1024px) {
            font-size: 1rem;

            &:hover {
                filter: brightness(1.2);
            }
        }
    }

    table {
        width: 100%;

        thead tr {
            margin-bottom: 0.5rem;
        }

        tbody tr, thead tr {
            width: 100%;
            padding: 0 0.5rem;

            display: grid;
            grid-template-columns: 1.5fr 2fr 4fr 2fr;

            td {
                border-bottom: 1px dashed ${props => props.theme.colors.textOne};
            }

            .settings {
                display: flex;
                justify-content: center;

                .buttonAddArt {
                    display: flex;

                    span {
                        display: none;
                    }

                    svg {
                        font-size: 2rem;
                        color: ${props => props.theme.colors.textOne};
                    }
                }
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

                    &:hover {
                        filter: brightness(2);
                    }
                }

                .title {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 0.5rem;
                }

                .imageContainer {
                    max-width: 40px;
                    padding: 0.125rem;
                    display: flex;
                    align-items: center;

                    img {
                        object-fit: contain;
                        width: 100%;
                    }
                }
            }
        }

        @media (min-width: 1024px) {
            tbody tr, thead tr {

                .settings {
                    .buttonAddArt {
                        align-items: center;
                        gap: 0.5rem;
                        background: ${props => props.theme.colors.buttons};
                        border-radius: 0.25rem;
                        padding: 0.25rem 0.5rem;

                        svg {
                            font-size: 1.5rem;
                            color: ${props => props.theme.colors.textThree};
                        }

                        span {
                            display: flex;
                            font-weight: 600;
                            font-size: 0.85rem;
                            color: ${props => props.theme.colors.textThree};
                        }

                        &:hover {
                            filter: brightness(1.2);
                        }
                    }
                }

                th, td {
                    font-size: 1.25rem;

                    .imageContainer {
                        max-width: 70px;

                        img {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
`
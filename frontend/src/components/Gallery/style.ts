import styled from "styled-components";

export const NoArtsContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;

    background: ${props => props.theme.colors.backgroundOne};
    color: ${props => props.theme.colors.textOne};
    font-weight: 400;
`

export const Container = styled.section`

    background: ${props => props.theme.colors.backgroundOne};
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding-bottom: .5rem;
    overflow-y: auto;

    .galleryContent {

        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        gap: 2rem;
        width: 100%;       
        
        .card {
            width: calc(100% - 2rem);
            
            .content {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 100%;
                    max-height: 450px;
                    object-fit: contain;
                }

            }
        }

        @media (min-width: 1024px) {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;

            .card {
                width: calc((100% - 6rem)/3);
                aspect-ratio: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                    
                @media (min-width: 1280px) {
                    width: calc((100% - 6rem)/4);
                }

                &:hover {
                    cursor: pointer;
                    border: 2px solid #3D4D3E33;
                    transform: scale(1.1)
                }

                .content {

                    img {
                        width: 100%;
                        height: 100%;
                        filter: grayscale(1);
                        transition: 0.2s;
                        object-fit: contain;
                    }

                    &:hover {
                        img {
                            filter: grayscale(0)
                        }
                    }
                }
            }
        }
    }

    .LoadMoreButton {
        background: ${props => props.theme.colors.boxOne};
        color: ${props => props.theme.colors.textThree};
        width: fit-content;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        font-size: 1.0rem;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 115px;

        .loading {
            animation: spin 2s ease infinite;

            @keyframes spin {
                0% {transform: rotate(0deg)}
                100% {transform: rotate(360deg)}
            }

            &:hover {
                cursor: default;
            }
        };

        &:hover {
            filter: brightness(1.2);
        }

        &:disabled {
            filter: brightness(1);
            cursor: default;
        }
    }

`
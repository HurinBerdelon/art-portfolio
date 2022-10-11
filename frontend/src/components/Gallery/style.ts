import styled from "styled-components";

export const NoArtsContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;

    background: ${props => props.theme.colors.backgroundOne};
`

export const Container = styled.section`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    gap: 2rem;
    width: 100%;
    overflow-y: auto;
    
    background: ${props => props.theme.colors.backgroundOne};

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

`
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
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    gap: 2rem;
    width: 100%;
    
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

                @media (min-width: 720px) {
                    max-height: 720px;
                }
            }

        }
    }

`
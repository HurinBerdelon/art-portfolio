import styled from "styled-components";

export const ContentOverlay = styled.div`
    position: fixed;
    top: 0rem;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
`

export const Container = styled.div`
    position: absolute;
    z-index: 2;
    top: 1rem;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-y: scroll;
    
    display: flex;
    flex-direction: column;

    background: ${props => props.theme.colors.backgroundOne};

    .react-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }

    .imageContainer {

        padding-top: 2rem;

        .buttonPrevious, .buttonNext {
            display: none;
        }

        img {
            object-fit: contain;
            width: 100%;
            max-height: 450px;
            border-radius: 0.5rem;
        }
    }

    .infoContainer {
        background: ${props => props.theme.colors.boxOne};
        flex: 1;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        position: relative;

        .infos {
            display: flex;
            flex-direction: column;
            align-items: center;

            .dateInfo {
                font-size: .85rem;
                font-style: italic;
            }

            .descriptionInfo {
                padding-top: 1rem;
                text-align: justify;
                padding-right: 0.25rem;

                overflow-y: auto;
            }
        }

        .shareMedia {
            display: flex;
        }
    }
`
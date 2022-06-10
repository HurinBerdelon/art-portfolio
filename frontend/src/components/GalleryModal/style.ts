import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    gap: 1rem;

    .imageContainer {
        width: 65%;
        height: 100%;

        border-radius: 0.5rem;
        
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        img {
            height: 33rem;
        }

        button {
            background: none;
            border: none;
            outline: none;
            color: var(--green-900);

            svg:hover{
                filter: brightness(1.5);
            }
        }

        .buttonPrevious {
            position: absolute;
            left: 0rem;
        }

        .buttonNext {
            position: absolute;
            right: 1rem;
        }
    }

    .infoContainer {
        width: 35%;
        height: calc(100% - 2rem);

        background: var(--green-600);
        color: var(--beige-100);
        border-radius: 0.5rem;
        margin: 1rem 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        

        .infos {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0 1rem;
            height: 100%;

            .dateInfo {
                font-size: .85rem;
                font-style: italic;
            }
            
            .descriptionInfo {
                padding-top: 1rem;
                text-align: justify;
                max-height: 60%;
                padding-right: 0.25rem;

                overflow-y: auto;
            }
        }
            
        .shareMedia {
            position: absolute;
            bottom: 0;
            height: 2rem;
            width: 100%;
            margin-bottom: 0.5rem;

            display: flex;
            justify-content: center;
        }
    }
`
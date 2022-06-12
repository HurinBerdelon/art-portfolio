import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    background: var(--beige-100);

    display: flex;
    gap: 1rem;

    .dropdown {
        position: relative;
        z-index: 1;
        
        &:hover {
            .dropContent {
                display: flex;
            }
        }
    }

    .dropMenu {
        background: none;
        border: none;
        position: absolute;
        color: var(--green-900);
        border-radius: 0.25rem 0.25rem 0 0;
        
        margin: 0.5rem 0 0 0.5rem;
        width: 12.5rem;

        transition: 0.2s;

        &:hover {
            color: var(--beige-100);
            background: var(--green-600);
        }
    } 

    .dropContent {
        display: none;
        position: absolute;
        top: 2.5rem;

        margin: 0.5rem 0 0 0.5rem;
        width: 12.5rem;

        background: var(--green-600);
        border-radius: 0 0 0.25rem 0.25rem;        

        padding: 2rem 0 2rem 0.5rem;
    }

    .imageContainer {
        width: 65%;
        height: 96%;
        margin-top: 1rem;

        border-radius: 0.5rem;
        
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        img {
            object-fit: contain;
            width: 100%;
            max-height: 33rem;
        }
    }

    .infoContainer {
        width: 35%;
        height: 96%;
        margin: 1rem;

        background: var(--green-600);
        border-radius: 0.5rem;

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
            height: 100%;
            padding: 0 1rem;

            color: var(--beige-100);

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
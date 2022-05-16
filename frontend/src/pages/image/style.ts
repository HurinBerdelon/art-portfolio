import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;

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

    .dropbtn {
        background: none;
        border: none;
        position: absolute;
        
        margin: 0.5rem 0 0 0.5rem;

        &:hover {
            color: var(--gray-500);
        }
    } 

    .dropContent {
        display: none;
        position: absolute;
        top: 2rem;

        padding: 2rem 0 0 0.5rem;
    }

    .imageContainer {
        width: 65%;
        height: 96%;
        margin: 1rem;

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
            color: var(--gray-900);

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
        height: 96%;
        margin: 1rem;

        background: var(--gray-100);
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
import styled from "styled-components";

export const Container = styled.div`

    width: 320px;
    border: 1px solid ${props => props.theme.colors.backgroundTwo};
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;

    .editorMenu {
        padding: 0.25rem 0.5rem;

        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        .inlineControls, .blockControls {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
            
            button {
                min-width: 25px;
                min-height: 28px;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;

                background:  ${props => props.theme.colors.gray};
                color:  ${props => props.theme.colors.textThree};

                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 500;

                svg {
                    font-size: 1.5rem;
                }

                &:hover {
                    filter: brightness(1.2);
                }
            }

            .active {
                background:  ${props => props.theme.colors.boxOne};
            }
        }
    }

    .editorContent {
        padding: .5rem;
        min-height: 100px;
        background: ${props => props.theme.colors.inputBG};
        color: ${props => props.theme.colors.textOne};
        border-top: 1px solid ${props => props.theme.colors.backgroundTwo};
    }

    @media (min-width: 1024px) {
        height: 100%;

        .editorContent {
            height: 100%;
            .DraftEditor-root {
                height: 100%;
                
                .DraftEditor-editorContainer {
                    height: 100%;
                }
            }
        }
    }

    @media (min-width: 1320px) {
        width: 520px;
    }

`
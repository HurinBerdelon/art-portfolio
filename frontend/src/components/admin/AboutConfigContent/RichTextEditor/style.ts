import styled from "styled-components";

export const Container = styled.div`

    margin: 1rem;
    border: 1px solid ${props => props.theme.colors.backgroundTwo};
    border-radius: 0.25rem;

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
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                background:  ${props => props.theme.colors.gray};
                color:  ${props => props.theme.colors.textThree};
            }

            .active {
                background:  ${props => props.theme.colors.boxOne};
            }
        }
    }

    .editorContent {
        padding: .5rem;
        background: ${props => props.theme.colors.inputBG};
        color: ${props => props.theme.colors.textOne};
        border-top: 1px solid ${props => props.theme.colors.backgroundTwo};

        .buttonContainer {
            width: 100%;
            display: flex;
            justify-content: flex-end;

            .saveButton {
                background: ${props => props.theme.colors.buttons};
                color:  ${props => props.theme.colors.textThree};
                font-weight: 500;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
            }
        }

    }
`
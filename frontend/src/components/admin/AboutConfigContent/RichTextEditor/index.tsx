import { ContentState, convertFromHTML, convertToRaw, Editor, EditorState, RichUtils } from "draft-js";
import { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import { Container } from "./style";

import ReactHtmlParser from 'react-html-parser'

interface RichTextEditorProps {
    prevContent: string
}

const BLOCK_TYPES = [
    { label: "title", style: "header-two" },
    { label: "subtitle", style: "header-three" },
    { label: "subsubtitle", style: "header-four" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
]

const INLINE_STYLES = [
    { label: "B", style: "BOLD" },
    { label: "I", style: "ITALIC" },
    { label: "U", style: "UNDERLINE" },
    { label: "Monospace", style: "CODE" }
]

export function RichTextEditor({ prevContent }: RichTextEditorProps): JSX.Element {

    const [editorState, setEditorState] = useState<EditorState>()
    const [htmlContent, setHtmlContent] = useState('')
    const [editor, setEditor] = useState(false)
    const [activeStates, setActiveStates] = useState({
        "header-two": false,
        "header-three": false,
        "header-four": false,
        "unordered-list-item": false,
        "ordered-list-item": false,
    })

    useEffect(() => {
        const prevHtmlContent = convertFromHTML(prevContent)
        setEditorState(
            EditorState.createWithContent(
                ContentState.createFromBlockArray(prevHtmlContent.contentBlocks)
            ))
        setEditor(true)
    }, [])

    useEffect(() => {
        if (editorState) {
            const rawContent = convertToRaw(editorState.getCurrentContent())
            setHtmlContent(draftToHtml(rawContent))
        }
    }, [editorState])

    if (!editor) {
        return null
    }

    interface StyleButtonProps {
        label: string
        style: string
        isBlock: boolean
        onToggle(style: string): void
    }

    interface ControlProps {
        onToggle(style: string): void
    }

    function StyleButton({ label, isBlock, onToggle, style }: StyleButtonProps) {

        const defaultActiveBlockStates = {
            "header-two": false,
            "header-three": false,
            "header-four": false,
            "unordered-list-item": false,
            "ordered-list-item": false,
        }

        function onClickButton(event) {
            event.preventDefault()
            onToggle(style)
            setActiveStates(prevActiveStates => {
                if (isBlock) return { ...defaultActiveBlockStates, [label]: !prevActiveStates[label] }
                return { ...prevActiveStates, [label]: !prevActiveStates[label] }
            })
        }
        return (
            <button className={activeStates[label] === true ? 'active' : ''} onMouseDown={onClickButton}>{label}</button>
        )
    }

    function BlockStyleControls({ onToggle }: ControlProps) {
        return (
            <div className="blockControls">
                {BLOCK_TYPES.map(type => (
                    <StyleButton
                        isBlock={true}
                        key={type.label}
                        label={type.label}
                        onToggle={onToggle}
                        style={type.style}
                    />
                ))}
            </div>
        )
    }

    function InlineStyleControls({ onToggle }: ControlProps) {
        return (
            <div className="inlineControls">
                {INLINE_STYLES.map((type) => (
                    <StyleButton
                        isBlock={false}
                        key={type.label}
                        label={type.label}
                        onToggle={onToggle}
                        style={type.style}
                    />
                ))}
            </div>
        )
    }

    function onInlineClick(inlineType: string) {
        const nextState = RichUtils.toggleInlineStyle(editorState, inlineType)
        setEditorState(nextState)
    }

    function onBlockClick(blockType: string) {
        const nextState = RichUtils.toggleBlockType(editorState, blockType)
        setEditorState(nextState)
    }


    return (
        <Container>
            <div className="editorMenu">
                <BlockStyleControls onToggle={onBlockClick} />
                <InlineStyleControls onToggle={onInlineClick} />
            </div>

            <div className="editorContent">
                <Editor
                    editorKey="draftJsEditor"
                    editorState={editorState}
                    onChange={setEditorState}
                />
                <div className="buttonContainer">
                    <button className="saveButton">Save</button>
                </div>
            </div>
        </Container>
    )
}
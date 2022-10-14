import { ContentState, convertFromHTML, convertToRaw, Editor, EditorState, RichUtils } from "draft-js";
import { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import { Container } from "./style";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import BLOCK_TYPES from '../../../../config/richText/blockTypes'
import INLINE_STYLES from '../../../../config/richText/inlineTypes'
import { useTranslation } from "next-i18next";

interface RichTextEditorProps {
    prevContent?: string
    setHtmlContent(htmlContent: string): void
}

export function RichTextEditor({ prevContent = '', setHtmlContent }: RichTextEditorProps): JSX.Element {

    const { t } = useTranslation()
    const [editorState, setEditorState] = useState<EditorState>()
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
    }, [prevContent])

    useEffect(() => {
        if (editorState) {
            const rawContent = convertToRaw(editorState.getCurrentContent())
            setHtmlContent(draftToHtml(rawContent))
        }
    }, [editorState, setHtmlContent])

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
            ...activeStates
        }

        function onClickButton(event) {

            event.preventDefault()
            onToggle(style)
            setActiveStates(prevActiveStates => {
                if (isBlock) return { ...defaultActiveBlockStates, [style]: !prevActiveStates[style] }
                return { ...prevActiveStates, [style]: !prevActiveStates[style] }
            })
        }
        return (
            <button className={activeStates[style] === true ? 'active' : ''} onMouseDown={onClickButton}>
                {label === 'UL' && <FormatListBulletedIcon />}
                {label === 'OL' && <FormatListNumberedIcon />}
                {label !== 'UL' && label !== 'OL' && label}
            </button>
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
            </div>
        </Container>
    )
}
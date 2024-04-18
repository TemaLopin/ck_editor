import { useState, useEffect, useMemo, useRef } from 'react'
import './app.styled.js'
import { EditorState, getVisibleSelectionRect, RichUtils } from 'draft-js'

import {
  DraftContainer,
  EditorBarContainer,
  EditorBarLine,
  EditorBarButton,
  StyledEditor,
  FontSelector,
  FontsList,
  FontsListButton,
} from './app.styled.js'

//бери нужные шрифты и кидай их в раздел со шрифтами в объект styleMap

const fonts = [
  { name: 'Segoe UI', style: 'SEGOE_FF' },
  { name: 'Roboto', style: 'ROBOTO_FF' },
  { name: 'Ubuntu', style: 'UBUNTU_FF' },
  { name: 'Cantarell', style: 'CANTARELL_FF' },
  { name: 'Oxygen', style: 'OXYGEN_FF' },
]

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },

  SUBSCRIPT: { fontSize: '0.6em', verticalAlign: 'sub' },
  SUPERSCRIPT: { fontSize: '0.6em', verticalAlign: 'super' },

  //раздел шрифтов
  SEGOE_FF: { fontFamily: '"Segoe UI", sans-serif' },
  ROBOTO_FF: { fontFamily: '"Roboto", sans-serif' },
  CANTARELL_FF: { fontFamily: '"Cantarell", sans-serif' },
  OXYGEN_FF: { fontFamily: '"Oxygen", sans-serif' },
  UBUNTU_FF: { fontFamily: '"Ubuntu", sans-serif' },
}

const inlineTypes = [
  {
    icon: 'B',
    style: 'BOLD',
  },
  {
    icon: 'I',
    style: 'ITALIC',
  },
  {
    icon: 'U',
    style: 'UNDERLINE',
  },
  {
    icon: 'S',
    style: 'STRIKETHROUGH',
  },
  {
    icon: 'sup',
    style: 'SUPERSCRIPT',
  },
  {
    icon: 'sub',
    style: 'SUBSCRIPT',
  },
]

const EditorBar = ({ setEditorState, editorState, offset }) => {
  const [selectedFont, setSelectedFont] = useState({
    name: 'Roboto',
    style: 'ROBOTO_FF',
  })

  const [isFontsListOpen, setIsFontsListOpen] = useState(false)

  useEffect(() => {
    fonts.forEach((item) => {
      if (isInlineActive(item.style)) {
        setSelectedFont(item)
        return
      }
    })
  }, [])

  const handleFontsListOpen = () => setIsFontsListOpen(!isFontsListOpen)

  const isInlineActive = (style) => editorState.getCurrentInlineStyle().has(style)

  const isBlockActive = (block) => {
    const selection = editorState.getSelection()
    return block === editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType()
  }

  const handleInlineStyleChange = (style, e) => {
    e?.preventDefault()
    setEditorState(RichUtils.toggleInlineStyle(editorState, style))
  }

  const handleBlockTypeChange = (block, e) => {
    e?.preventDefault()
    setEditorState(RichUtils.toggleBlockType(editorState, block))
  }

  const handleFontChange = (data) => {
    const newEditorState = RichUtils.toggleInlineStyle(editorState, selectedFont.style)
    setEditorState(RichUtils.toggleInlineStyle(newEditorState, data.style))
    setSelectedFont(data)
  }

  return (
    <EditorBarContainer offset={offset} onMouseDown={(evt) => evt.preventDefault()}>
      <EditorBarLine>
        <div>
          {inlineTypes.map(({ icon, style }) => (
            <EditorBarButton
              key={style}
              onClick={(e) => handleInlineStyleChange(style, e)}
              isSelected={isInlineActive(style)}
            >
              {icon}
            </EditorBarButton>
          ))}
        </div>
        <div>
          <EditorBarButton
            onClick={(e) => handleBlockTypeChange('ordered-list-item', e)}
            isSelected={isBlockActive('ordered-list-item')}
          >
            ol
          </EditorBarButton>
          <EditorBarButton
            onClick={(e) => handleBlockTypeChange('unordered-list-item', e)}
            isSelected={isBlockActive('unordered-list-item')}
          >
            ul
          </EditorBarButton>
        </div>
      </EditorBarLine>
      <EditorBarLine>
        <FontSelector>
          <div onClick={handleFontsListOpen}>{selectedFont.name}</div>
          {isFontsListOpen && (
            <FontsList>
              {fonts.map((item) => (
                <FontsListButton
                  key={item.style}
                  name={item.name}
                  onClick={() => handleFontChange(item)}
                  isSelected={selectedFont.style === item.style}
                >
                  {item.name}
                </FontsListButton>
              ))}
            </FontsList>
          )}
        </FontSelector>
        <div>
          <EditorBarButton onClick={(e) => handleInlineStyleChange('CODE', e)} isSelected={isInlineActive('CODE')}>
            link
          </EditorBarButton>
        </div>
      </EditorBarLine>
    </EditorBarContainer>
  )
}

function App() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [isOpen, setIsOpen] = useState(false)

  const isCollapsed = useMemo(() => editorState.getSelection().isCollapsed(), [editorState])

  const isGetHasFocus = useMemo(() => editorState.getSelection().getHasFocus(), [editorState])

  const offset = useMemo(() => getVisibleSelectionRect(window), [editorState])

  useEffect(() => {
    if (!isGetHasFocus) {
      setIsOpen(false)
      return
    }

    if (isCollapsed) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }, [isCollapsed, isGetHasFocus])

  return (
    <>
      <DraftContainer>
        {isOpen && <EditorBar editorState={editorState} setEditorState={setEditorState} offset={offset} />}
        {typeof window !== 'undefined' && (
          <StyledEditor
            editorState={editorState}
            editorKey='CustomInlineToolbarEditor'
            onChange={(editorState) => setEditorState(editorState)}
            handleKeyCommand={(command, editorState) => {
              const newState = RichUtils.handleKeyCommand(editorState, command)
              if (newState) {
                setEditorState(newState)
                return 'handled'
              }
              return 'not-handled'
            }}
            customStyleMap={styleMap}
          />
        )}
      </DraftContainer>
    </>
  )
}

export default App

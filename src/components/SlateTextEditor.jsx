import isHotkey from 'is-hotkey'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { createEditor, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import styles from '../styles/SlateTextEditor.module.css'
import CodeElement from './custom-slate-element/CodeElement'
import HeaderElement from './custom-slate-element/HeaderElement'
import ParagraphElement from './custom-slate-element/ParagraphElement'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+/': 'code',
  'mod+d': 'strikethrough',
  'mod+h': 'header'
}

const ELEMENTS = {
  CODE: 'code',
  HEADER: 'header'
}

const SlateTextEditor = () => {
  const [editor] = useState(() => withReact(createEditor()))
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case ELEMENTS.CODE:
        return <CodeElement {...props} />
      case ELEMENTS.HEADER:
        return <HeaderElement {...props} />
      default:
        return <ParagraphElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props}/>
  }, [])
  

  const onKeyDownHandler = (event, editor) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault()
        const format = HOTKEYS[hotkey]
        const isElementFormat = Object.values(ELEMENTS).includes(format)
        if(isElementFormat){
          toggleMode(editor, format)
        }else{
          toggleMark(editor, format)
        }
      }
    }
  }

  const toggleMode = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === format,
    })

    Transforms.setNodes(
      editor,
      { type: match ? 'paragraph' : format },
      { match: n => Editor.isBlock(editor, n) }
    )
  }

  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  }

  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }

  return (
    <div className={styles.textEditorContainer}>
      <Slate editor={editor} value={initialValue}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some text here…"
          onKeyDown={(event) => onKeyDownHandler(event, editor)}
        />
      </Slate>
    </div>
  )
}

const Leaf = ({leaf, children, attributes}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>
  }

  return <span {...attributes}>{children}</span>
}

export default SlateTextEditor
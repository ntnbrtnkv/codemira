import { useContext, useEffect, useRef } from 'react'

import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'

import * as Y from 'yjs'
// @ts-ignore
import { yCollab } from 'y-codemirror.next'
// @ts-ignore
import { WebrtcProvider } from 'y-webrtc'

import UserDialog from './Components/UserDialog'
import { UserContext } from './State/User'
import './Room.css'

type Props = {
  roomID: string;
}

const userColor = {};

function App({ roomID }: Props) {
  const ref = useRef(null);
  const ref2 = useRef(true);
  const { user } = useContext(UserContext);

  console.log(user);

  useEffect(() => {
    if (ref.current && ref2.current && user.name) {
      ref2.current = false;
      const ydoc = new Y.Doc()
      const provider = new WebrtcProvider(`codemirra-${roomID}`, ydoc)
      const ytext = ydoc.getText('codemirror')

      const undoManager = new Y.UndoManager(ytext)

      provider.awareness.setLocalStateField('user', {
        name: user.name,
        color: user.color,
        colorLight: user.light
      })

      const state = EditorState.create({
        doc: ytext.toString(),
        extensions: [
          basicSetup,
          javascript(),
          yCollab(ytext, provider.awareness, { undoManager })
        ]
      })

      new EditorView({ state, parent: ref.current })
    }
  }, [user.name]);

  if (!user.name) {
    return <UserDialog />
  }

  return (
    <div ref={ref} className='editor' />
  )
}

export default App

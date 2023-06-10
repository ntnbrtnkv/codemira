import { useContext, useEffect, useRef } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { EditorSelection, EditorState } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'

import * as Y from 'yjs'
// @ts-ignore
import { yCollab } from 'y-codemirror.next'
// @ts-ignore
import { WebrtcProvider } from 'y-webrtc'

import UserDialog from './Components/UserDialog'
import { UsersContext } from './State/Users'
import './Room.css'
import Header from './Components/Header'
import { useParams } from 'react-router-dom'
import { emit } from './events'

function Room() {
  let { roomID } = useParams();
  const editorElementRef = useRef(null);
  const onceRef = useRef(true);
  const viewRef = useRef<EditorView>();
  const providerRef = useRef<WebrtcProvider>();
  const { user, setAllUsers } = useContext(UsersContext);

  useEffect(() => {
    if (editorElementRef.current && onceRef.current && user.name) {
      onceRef.current = false;
      const ydoc = new Y.Doc()
      const roomName = `codemirra-${roomID}`
      const provider = new WebrtcProvider(roomName, ydoc)
      console.debug('Connecting to room:', roomName)
      providerRef.current = provider
      const ytext = ydoc.getText('codemirror')

      const undoManager = new Y.UndoManager(ytext)

      const awareness = provider.awareness;

      awareness.setLocalStateField('user', {
        name: user.name,
        color: user.color,
        colorLight: user.light
      })

      const state = EditorState.create({
        doc: ytext.toString(),
        extensions: [
          basicSetup,
          javascript(),
          yCollab(ytext, awareness, { undoManager })
        ]
      })

      const editor = new EditorView({ state, parent: editorElementRef.current })
      viewRef.current = editor

      awareness.on('change', () => {
        const users: any = [];

        [...awareness.getStates().values()].forEach((state, clientId) => {
          console.debug(`client id = ${clientId} with state`, state)
          if (state.focus && clientId !== 0) {

            const selection = EditorSelection.range(state.focus.anchor, state.focus.head)

            setTimeout(() => {
              editor.dispatch({
                effects: EditorView.scrollIntoView(selection, { x: 'center', y: 'center' })
              })
            }, 0)
          }

          users.push(state.user)
        });

        setAllUsers(users);
      })
    }
  }, [user.name]);

  if (!user.name) {
    return <UserDialog />
  }

  const handleScroll = () => {
    if (viewRef.current) {
      const { state } = viewRef.current;

      emit(providerRef.current.awareness, 'focus', {
        head: state.selection.main.head,
        anchor: state.selection.main.anchor
      });
    }
  }

  return (
    <div className='container'>
      <Header handleScroll={handleScroll} />
      <div ref={editorElementRef} />
    </div>
  )
}

export default Room

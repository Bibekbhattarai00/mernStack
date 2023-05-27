import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
// import './App.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import { json } from 'stream/consumers';
import Note from './components/Note';
import style from './styles/Notespage.module.css'
import * as NotesApi from "./network/notes_apis"
import AddNoteDialog from './components/AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);
  return (
    <Container>
      <Button onClick={() => setShowAddNoteDialog(true)}>
        + ADD
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map(note => (
          <Col key={note._id}>
            <Note note={note} className={style.note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog &&
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={() => { }}
        />
      }
    </Container>
  );
}

export default App;

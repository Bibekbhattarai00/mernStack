import { Button, Form, Modal } from "react-bootstrap";
import React from "react";
import { Note } from "../models/note";
import { NoteInput } from "../network/notes_apis";
import { useForm } from 'react-hook-form';
import * as NotesApi from "../network/notes_apis"

interface AddNoteDialogProps {
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void,
}
const AddNoteDialog = ({ onDismiss, onNoteSaved }: AddNoteDialogProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>();
    async function onSubmit(input: NoteInput) {
        try {
            const noteResponse = await NotesApi.createNote(input);
            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }

    return (
        <Modal show onHide={() => onDismiss()}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Note
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addNotes" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register("title", { required: "REQUIRED" })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>

                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="text"
                            {...register("text",)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" form="addNotes" disabled={isSubmitting}>
                    save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddNoteDialog;

//timpstamp 4:16:10
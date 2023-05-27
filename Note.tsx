import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import React from 'react';
import Styles from "../styles/Note.module.css";

interface NoteProps {
    note: NoteModel,
    className?: string,
}

const Note = ({ note, className }: NoteProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note;
    let createdupdatedText: string;
    if (createdAt < updatedAt) {
        createdupdatedText = "Updated-:" + updatedAt;
    } else {
        createdupdatedText = "Created-:" + createdAt;
    }

    return (
        <Card className={Styles.noteCard}>
            <Card.Body className={`${className} ${Styles.cardBody}`}>
                <Card.Title className={`${Styles.cardTitle}`}>
                    {title}
                </Card.Title>
                <Card.Text className={Styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdupdatedText}
            </Card.Footer>
        </Card>
    )
}
export default Note;
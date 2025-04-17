import React, { useEffect, useState } from "react"
import { creatNote, deleteNote, getNotes, updateNote } from "../services/noteservice";
import { Note } from "../types/note";

const Notelist = () => {

    const [notes, setNotes] = useState<Note[]>([]);
    const [msg, setMsg] = useState("");
    const [refresh, setRefresh] = useState<boolean>(false);
    const [editmode, setEditMode] = useState<boolean>(false);
    const [editId, setEditId] = useState("");

    const makeRefresh = () => {
        setRefresh(!refresh);
    }

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await getNotes();
                setNotes(data)
            } catch (error) {
                throw new Error("Failed ot fetch data.")
            }
        };

        fetchNotes();
    },[refresh]);

    const submitHandler = async (e : React.FormEvent) => {
        e.preventDefault();
        if(msg.trim().length === 0) {
            return;
        }
        try {
            if(editmode){
                await updateNote(editId, msg);
                setEditMode(false);
            }else{
                await creatNote(msg);
            }
            setMsg("");
            makeRefresh();
        } catch (error) {
            throw new Error("Failed ot fetch data.");
        }
    }

    const handleChangeMode = (id : string, title: string) => {
        setEditMode(true);
        setMsg(title);
        setEditId(id);
    }

    const deleteExistingNote = async (id : string) => {
        try {
            await deleteNote(id);
            makeRefresh();
        } catch (error) {
            throw new Error("Failed ot fetch data.");
        }
    }

    return(
        <div>
            <h2>Notelist</h2>
            <ul>
                {
                    notes.map((note, index)=> <li key={index}>{note.title} 
                    <button type="button" onClick={() => deleteExistingNote(note._id)}>delete</button>
                    <button type="button" onClick={() => handleChangeMode(note._id,note.title)}>Edit</button>
                    </li>)
                }
            </ul>
            <form onSubmit={submitHandler}>
                <input type="text" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                <button>{editmode ? "Update" : "Create"}</button>
            </form>
        </div>
    )


}

export default Notelist
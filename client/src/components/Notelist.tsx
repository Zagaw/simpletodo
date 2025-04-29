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
            <h2 className="text-2xl font-bold my-4">Shares</h2>
            <ul>
                {
                    notes.map((note, index)=> <li className="flex items-center gap-2 mb-2" key={index}>
                        <p className="font-semibold">{note.title}</p>
                        <button className="border text-white bg-red-600 font-medium p-2" type="button" onClick={() => deleteExistingNote(note._id)}>Delete</button>
                        <button className="font-medium border p-2" type="button" onClick={() => handleChangeMode(note._id,note.title)}>Edit</button>
                    </li>)
                }
            </ul>
            <form onSubmit={submitHandler}>
                <input className="border p-2 text-sm mr-2" type="text" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                <button className="text-white bg-black px-4 py-2 text-sm">{editmode ? "Update" : "Create"}</button>
            </form>
        </div>
    )


}

export default Notelist
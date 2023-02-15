import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:7000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    const [Taxes, setTaxes] = useState([]);

    const userInit = [];

    const [user, setUser] = useState(userInit);
    const [remaiderStaus, setRemainderStatus] = useState(false);

    //Add a note
    const addNote = async (bas, lta, hra, fa, inv, med, rent,finalTax) => {
        //API CALL
        const response = await fetch(`${host}/api/taxUser/addDetails`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ bas, lta, hra, fa, inv, med, rent,finalTax }),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    };


    //get user details for about page
    const getUser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        setUser(json);
        console.log(user);
    }

    //get all taxes of user
    const getTaxes = async () => {
        const response = await fetch(`${host}/api/taxUser/get_all_tax`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        setTaxes(json);
        console.log(Taxes);
    }

    const updateTaxStaus = async (id) => {
        const response = await fetch(`${host}/api/taxUser/update_tax/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            // body: JSON.stringify({ bas, lta, hra, fa, inv, med, rent, status, date }),
        });
        const json = await response.json();
        let newTaxes = JSON.parse(JSON.stringify(Taxes));
        for (let index = 0; index < newTaxes.length; index++) {
            const element = newTaxes[index];
            if (element._id === id) {
                newTaxes[index].status = true;
                break;
            }
        }
        setTaxes(newTaxes)
    }


    const remainderAPI = async (email, id, userId, date) => {
        console.log(email);
        const response = await fetch(`${host}/api/taxUser/setRemainder/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ email, id, userId, date }),
        });
        const json = await response.json();
        if (json) {
            setRemainderStatus(true);
        }
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, getUser, user, getTaxes, Taxes, updateTaxStaus, remainderAPI, remaiderStaus }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
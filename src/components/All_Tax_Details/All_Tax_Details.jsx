import React, { useContext, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import noteContext from '../../context/data/NoteContext';
import Success from '../success_alert/Success';
import In_Tax from './In_Tax';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import "./All_Tax_Details.css"
import Excel_down from './Excel_down';

const All_Tax_Details = () => {
    let history = useHistory();
    const ref = useRef(null);
    const closeRef = useRef(null);

    const context = useContext(noteContext);
    const { getTaxes, Taxes, updateTaxStaus, remainderAPI, remaiderStaus } = context;
    const [storeTax, setTaxStore] = useState(Taxes);

    useEffect(() => { //for showing all the notes. which we fetched from mongoDb
        if (localStorage.getItem('token')) {
            getTaxes();
        }
        else {
            history.push("/login");
        }
        // eslint-disable-next-line
    }, []);


    useEffect(() => { //for showing all the notes. which we fetched from mongoDb
        setTaxStore(Taxes)
        // eslint-disable-next-line
    }, [Taxes]);

    useEffect(() => { //for showing all the notes. which we fetched from mongoDb
        if (remaiderStaus) {
            closeRef.current.click();
        }
        // eslint-disable-next-line
    }, [remaiderStaus]);

    const updateTax = (id) => {
        updateTaxStaus(id);
    }


    const [date, setDate] = useState('');

    const handleInputChange = (e) => {
        const inputDate = new Date(e.target.value);
        const year = inputDate.getFullYear().toString();
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        const day = inputDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
    };

    const [TaxId, setTaxId] = useState('');
    const [detail, setDetail] = useState({ id: "", email: "", userId: localStorage.getItem('token') });

    const onchange = (e) => {
        setDetail({ ...detail, [e.target.name]: e.target.value }) //iska matlab agar pahle jo value hai usko rahne do. aur jo bhi change ho rha uske name ko value ke barabar kar do
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const setRemainder = (id) => {
        setTaxId(id);
        ref.current.click();
    }

    const handleClick = (e) => {
        e.preventDefault(); //protecting page to not reload while clicking on submit button
        if (!isValidEmail(detail.email)) {
            alert('Enter Valid Email');
        }
        else {
            remainderAPI(detail.email, TaxId, detail.userId, date);
        }
        // closeRef.current.click(); //for closing the tab after clicking on update button
    }


    return (
        <div className='All_Tax_Details'>

            <Excel_down storeTax={storeTax} />

            {/* Modal for taking email, due date and reamainder date as input */}
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Set Remainder</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Customer Email</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onchange} name='email' value={detail.email} />
                                </div>
                                <div className="mb-3">
                                    <div>
                                        <label htmlFor="calendar-input">Enter Shedule date:</label>
                                        <input id="calendar-input" type="date" value={date} onChange={handleInputChange} />
                                        <p>Date: {date}</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                            <button type="button" disabled={!date || !detail.email} onClick={handleClick} className="btn btn-primary" >Schedule</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2 className='m-auto d-flex justify-content-center'>Customers Tax Info</h2>
                <div className="container mx-2">
                    {Taxes.length === 0 && 'No Tax to display'}
                </div>
                {
                    remaiderStaus && <Success />
                }

                {!remaiderStaus && Taxes.map((tax) => {
                    return <In_Tax key={tax._id} tax={tax} updateTax={updateTax} setRemainder={setRemainder} remaiderStaus={remaiderStaus} />
                })}
            </div>
        </div>
    )
}

export default All_Tax_Details
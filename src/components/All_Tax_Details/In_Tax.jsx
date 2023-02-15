import React, { useContext, useEffect, useRef, useState } from 'react';
import "./In_Tax.css"

const In_Tax = (props) => {

    const { tax, updateTax, setRemainder, remaiderStaus } = props;

    return (
        <>

            <div className='col-md-6'>
                <div className="card my-3 card-sh">
                    <div className="card-body m-auto">
                        <h5 className="card-title"><span className='tax-title'>Tax Id : </span> <span className='ad-tax-id tax-value'>{tax._id}</span></h5>
                        <h5 className="card-text"><span className='tax-title'>Bas : </span> <span className='tax-value'>{tax.bas} <span className='rs-tag'>Rs</span></span></h5>
                        <h5 className="card-text"><span className='tax-title'>Lta Id : </span> <span className='tax-value'>{tax.lta} <span className='rs-tag'>Rs</span></span></h5>
                        <h5 className="card-text"><span className='tax-title'>Hra Id : </span> <span className='tax-value'>{tax.hra} <span className='rs-tag'>Rs</span></span></h5>
                        <h5 className="card-text"><span className='tax-title'>FA Id : </span> <span className='tax-value'>{tax.fa} <span className='rs-tag'>Rs</span></span></h5>
                        <h5 className="card-text"><span className='tax-title'>Inv Id : </span> <span className='tax-value'>{tax.inv} <span className='rs-tag'>Rs</span></span></h5>
                        <h5 className="card-text"><span className='tax-title'>Med Id : </span> <span className='tax-value'>{tax.med} <span className='rs-tag'>Rs</span></span></h5>
                        <h5 className="card-text"><span className='tax-title'>Rent Id : </span> <span className='tax-value'>{tax.rent} <span className='rs-tag'>Rs</span></span></h5>


                        {
                            tax.TotalTax && <h5 className="mt-4  card-text"><span className='taxTotal'>Total Tax Payable : </span> <span className='totalTax'>{tax.TotalTax} <span className='rs-tag'>Rs</span></span></h5>
                        }
                        {
                            tax.userNameTax && <h5 className=" card-text"><span className='taxTotal'>User Email : </span> <span className='totalTax'>{tax.userNameTax}</span></h5>
                        }

                        {
                            tax.remainderDate && <h5 className="mt-4 card-text"><span>Remainder Scheduled on </span> <span>{tax.remainderDate}</span></h5>
                        }


                        {
                            tax.status === false ? <div className='adj-status mt-3'>
                                <img class="adj-pending-img" src='https://cdn.pixabay.com/photo/2016/03/31/18/31/dialog-1294429_960_720.png' />
                                <h5 className='mx-2 mt-1'>Unpaid</h5>
                            </div> :
                                <div className='adj-status mt-3'>
                                    <img class="adj-pending-img" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuYITzz03wDFoEUTd25T9TiJxsYKsSXcHd5_0rTAxHRTewGw82PRE0Tcz3XpXdp_bh-fo&usqp=CAU' />
                                    <h5 className='mx-2 mt-1'>Paid</h5>
                                </div>
                        }

                        {
                            tax.isRemainder && <div className='adj-status mt-3'>
                                <img class="adj-pending-img" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuYITzz03wDFoEUTd25T9TiJxsYKsSXcHd5_0rTAxHRTewGw82PRE0Tcz3XpXdp_bh-fo&usqp=CAU' />
                                <h5 className='mx-2 mt-1'>Remainder Sent</h5>
                            </div>
                        }

                        <div class="btn-group " role="group" aria-label="Basic mixed styles example">
                            {
                                tax.status === false && <button type="button " onClick={() => updateTax(tax._id)} class="btn btn-warning">Mark Paid</button>
                            }
                            {
                                !tax.status && <button type="button" class="btn btn-success" onClick={() => setRemainder(tax)}> {remaiderStaus ? "Reschedule" : "Set Remainder"}</button>
                            }
                        </div>

                        {/* <p className="card-text">{note.description}</p> */}
                        {/* <i className="fas fa-trash-alt mx-2" onClick={() => { deleteNote(note._id) }}></i> */}
                        {/* //sending id in deleteNote function of noteState.js */}
                        {/* <i className="fas fa-edit mx-2" onClick={() => updateNote(note)}>edit</i> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default In_Tax
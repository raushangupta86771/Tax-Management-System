import React from 'react'
import { Link } from 'react-router-dom'

const ShowAns = (props) => {
    return (
        <>
            <div className="">
                <div className="card d-flex cardSet my-5" id='main-result'>
                    <img src="https://jzr.co.nz/wp-content/uploads/2021/02/BLOG_POST_TAX_CHANGES-1080x628.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Taxable Income</h5>
                        <p className="card-text" id='ans-txt'>{props.value} Rupees</p>
                        <div className="d-flex align-items-center justify-content-center">
                            <Link to="/about" className="btn mx-2 d-flex justify-content-center align-items-center btn-primary adj-w" id=''>About</Link>
                            <Link to="/Tax-Details" className="btn adj-w d-flex justify-content-center align-items-center btn-primary " id=''>Taxes</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowAns
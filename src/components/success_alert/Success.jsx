import React from 'react'
import "./Success.css"

const Success = () => {
    return (
        <div className="main-success">
            <div className="card-sucess">
                <div style={{ borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto' }}>
                    <i className="checkmark">✓</i>
                </div>
                <h1 className='h1-success'>Success</h1>
                <p className='p-success'>We scheduled the Tax Notification ;<br /> you will receive an email on the deadline !!</p>
            </div>
        </div>
    )
}

export default Success
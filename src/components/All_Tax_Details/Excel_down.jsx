import React from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Excel_down = ({storeTax}) => {
    return (
        <>

            {/* generating excel */}
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-success"
                table="table-to-xls"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Download as Excel" />
            <table id="table-to-xls" className='adj-block-table'>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Remainder Date</th>
                        <th>TotalTax</th>
                        <th>User Id</th>
                        <th>Payment Initiated</th>
                        <th>bas</th>
                        <th>lta</th>
                        <th>hra</th>
                        <th>fa</th>
                        <th>inv</th>
                        <th>med</th>
                        <th>rent</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        storeTax.map((ele) => {
                            return (
                                <tr>
                                    <td>{ele.userNameTax ? ele.userNameTax : "No Remainder Assigned"}</td>
                                    <td>{ele.remainderDate ? ele.remainderDate : "No Remainder Assigned"}</td>
                                    <td>{ele.TotalTax}</td>
                                    <td>{ele.user}</td>
                                    <td>{ele.bas}</td>
                                    <td>{ele.lta}</td>
                                    <td>{ele.hra}</td>
                                    <td>{ele.fa}</td>
                                    <td>{ele.med}</td>
                                    <td>{ele.rent}</td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </table>
        </>
    )
}

export default Excel_down
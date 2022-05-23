import React, { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext";

import Pagination from "../Pagination/Pagination";

import "./QueryPage.css";

const itemsPerPage = 20;

export default function QueryPage (props) {
    const {user} = useAuthContext();
    const navigate = useNavigate()
    const [data, setData] = useState(null);
    const pageInput = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSearch, setCurrentSearch] = useState(null);
    const [maxItems, setMaxItems] = useState(20);
    const [maxPages, setMaxPages] = useState(20);
    const [showItem, setShowItem] = useState(false);

    useEffect(() => {
        fetch(props.honeypot_url + '/honeypot/get_all', {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Cache-Control': 'no-cache, no-store, must-revalidate'}})
        .then(response => response.json())
        .then(response => {
            if (response.status === 200){
                setData(response.result);
            }
        })
        .catch(err => {
            console.log(err);
        });

        fetch(props.honeypot_url + '/honeypot/get_count?sort=1', {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Cache-Control': 'no-cache, no-store, must-revalidate'}})
        .then(response => response.json())
        .then(response => {
            if (response.status === 200){
                setMaxItems(response.result[0]['maxRows']);
                setMaxPages(Math.ceil(response.result[0]['maxRows'] / itemsPerPage))
            }
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const fetchData = (body) => {
        let q = "?";
        for (let i of Object.keys(body)) {
            if (body[i] != null) q += (i + "=" + body[i] + "&");
        }
        q = q.slice(0, -1);
        fetch(props.honeypot_url + '/honeypot/search' + q, {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Cache-Control': 'no-cache, no-store, must-revalidate'}})
        .then(response => response.json())
        .then(response => {
            console.log(response.result, typeof response.result);
            if (response.status === 200){
                setData(response.result);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleChangePage = (page, searchValue=null) => {
        if(searchValue === null) {
            searchValue = currentSearch;
        }
        fetchData({"lowerLimit": (page-1)*itemsPerPage, 'upperLimit': page * itemsPerPage, "searchValue": searchValue});
        setCurrentPage(page);
    };

    const handleSearch = () => {
        const searchValue = document.querySelector("#search").value;
        console.log(searchValue);
        handleChangePage(1, searchValue === null ? "" : searchValue);
        setCurrentSearch(searchValue === null ? "" : searchValue);
    };

    return(
        <>
            <div className="query-container flexColumn">
                <div className="query-container-header flexRow">
                    <Button variant="outline-primary" size="lg" onClick={() => navigate('/')} >Go back home</Button>
                    <Button variant="outline-primary" size="lg" onClick={() => navigate('/management')} >Go back</Button>
                </div>
                <div className="query-seacrh flexRow">
                    <div className="text-1">
                        <input id="search" placeholder="Search" onKeyUp={() => handleSearch()} />
                    </div>
                </div>
                <div className="query-table flexColumn">
                    <table cellSpacing="0" cellPadding="0">
                        <thead>
                            <tr>
                                {/*console.log("in query: ", data)*/}
                                {Object.entries({'th-date': 'Date', 'th-ip': 'Ip', 'th-service': 'Service', 'th-request': 'Request', 'th-request-headers': 'Request Header', 'th-http-request-path': 'Request Path'}).map(([k,v]) => {
                                    return(
                                        <th className={k}><span>{v}</span></th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data ? Object.keys(data).map( (k,index) => {
                                    let t = Object.keys(data[k])
                                    return (
                                        <tr> 
                                            <td>{new Date(data[k]['date']).toUTCString().replace("GMT", "").trimEnd()}</td>
                                            <td>{data[k]['ip']}</td>
                                            <td>{data[k]['service']} </td>
                                            <td className="td-hover">{data[k]['request']}</td>
                                            <td className="td-hover">{data[k]['request_headers']} </td>
                                            <td>{data[k]['http_request_path']} </td>
                                        </tr>
                                    )
                                    }) : ""}
                        </tbody>
                    </table>
                </div>
            <Pagination
                currentPage = {currentPage}
                maxPages = {Math.ceil(maxItems / itemsPerPage)}
                handleChangePage = {(page) => handleChangePage(page)}
                itemsPerPage = {itemsPerPage}
            />
            </div>
        </>
    )
}

import React, {useRef} from "react";
import './Pagination.css';

export default function Pagination (props) {
    const pageInput = useRef(null);

    const maxPages = props.maxPages;
    const currentPage = props.currentPage;

    const handleClick = (type = null) => {
        if (type === "previous") {
            if (currentPage - 1 > 0) props.handleChangePage(currentPage - 1);
        } else if (type === "next") {
           if (currentPage + 1 <= maxPages) props.handleChangePage(currentPage + 1);
        } else {
            if (pageInput.current.value <= maxPages) props.handleChangePage(pageInput.current.value);
        }
    };

    return (
        <div className="pg-container">
            <div>
                <div className={"controller" + (currentPage === 1 ? " inactive" : "")} onClick={() => handleClick("previous")}>{"<"}</div>
                <input ref={pageInput} className="page-input" type="number" value={currentPage} onChange={() => handleClick()}/>
                <div className={"controller" + (currentPage === maxPages ? " inactive" : "")} onClick={() => handleClick("next")}>{">"}</div>
                <div className="n-Of-Pages">of {maxPages}</div>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaForward, FaBackward } from "react-icons/fa6";

const DataTable = ({ headers = [], api, slice, modalToggle } = {}) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentpPges] = useState(1);
  const ticketCount = useSelector((state) => state[slice].count);
  const list = useSelector((state) => state[slice].list);
  const [openAction, setOpenAction] = useState("");

  const tableHeader = headers.map((item) => {
    return (
      <th style={{ width: `${80 / headers.length}%` }} key={item}>
        {item[0].toUpperCase() + item.slice(1)}
      </th>
    );
  });

  const tableData =
    list &&
    list.slice(0, 15).map((item, index) => (
      <tr key={index} className="tableDataRow">
        {headers.map((header) => (
          <td key={header} style={{ width: `${80 / headers.length}%` }}>
            {item[header] ? item[header] : "N/A"}
          </td>
        ))}
        <td
          key={headers + ":"}
          style={{ width: `1px` }}
          onClick={() =>
            setOpenAction((state) => (state === item.id ? false : item.id))
          }
        >
          &#8942;
        </td>
        {openAction === item.id && (
          <div className="actionInDatatable">
            <button
              className="actionButton"
              onClick={() => modalToggle(item.id)}
            >
              Edit
            </button>
            <button className="actionButton">Delete</button>
          </div>
        )}
      </tr>
    ));

  const handlePageChange = (page) => {
    if (isNaN(page)) {
      const numberOfPages = Math.ceil(ticketCount / 15);
      let cuPage = currentPage;
      if (page === "minus" && cuPage > 0) cuPage -= 1;
      else if (page === "add") cuPage += 1;
      if (cuPage < 1 || cuPage > numberOfPages) return;
      setCurrentpPges(cuPage);
    } else setCurrentpPges(page);
  };

  const paginationButton = () => {
    const numberOfPages = Math.ceil(ticketCount / 15);
    return (
      <div className="pagginationContainer">
        <span onClick={() => handlePageChange("minus")}>
          <FaBackward className="forwadAndBackWordIcon" />
        </span>
        {Array.from({ length: numberOfPages }, (_, index) => (
          <button
            className="paginationPoint"
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              backgroundColor: currentPage === index + 1 ? "blue" : "lightgray",
              color: currentPage === index + 1 ? "white" : "black",
            }}
          >
            {index + 1}
          </button>
        ))}
        <span onClick={() => handlePageChange("add")}>
          <FaForward className="forwadAndBackWordIcon" />
        </span>
      </div>
    );
  };

  const fatchData = () => {
    dispatch(api({ offset: (currentPage - 1) * 15 }));
  };

  useEffect(() => {
    fatchData();
  }, [currentPage, ticketCount]);

  return (
    <div className="DataTable">
      <table>
        <tbody>
          <tr>{tableHeader}</tr>
          {tableData}
        </tbody>
      </table>
      {ticketCount === 0 ? (
        <p style={{ alignSelf: "center" }}>
          Empty table Please create a ticket
        </p>
      ) : (
        paginationButton()
      )}
    </div>
  );
};

export default DataTable;

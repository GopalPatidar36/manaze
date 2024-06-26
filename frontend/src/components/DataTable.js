import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaForward, FaBackward, FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { dataFormate } from "../utils/index";

const revertSort = {
  asc: "desc",
  desc: "asc",
  default: "asc",
};

const date = {
  createdAt: 1,
  deletedAt: 1,
  updatedAt: 1,
};

const DataTable = ({ headers = [], api, slice, modalToggle } = {}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentpPges] = useState(1);
  const ticketCount = useSelector((state) => state[slice].count);
  const list = useSelector((state) => state[slice].list);
  const [openAction, setOpenAction] = useState("");
  const [sorting, setSorting] = useState("");
  const [direction, setDirection] = useState("");
  const [searchText, setSearchText] = useState("");
  const [priority, setPriority] = useState();
  const [status, setStatus] = useState();

  const handleNavigate = (id) => {
    navigate(`/details/${id}`);
  };

  const tableDataFormate = (item, field) => {
    return item[field] ? (date[field] ? dataFormate(item[field]) : item[field].length < 50 ? item[field] : item[field].slice(0, 50) + "...") : "N/A";
  };

  const sortOnField = (item, sort) => {
    const direction = revertSort[sort] || revertSort.default;
    setSorting(item);
    setDirection(direction);
    fatchData({ order: `${item}:${direction}` });
  };
  new Date().toLocaleString();
  const tableHeader = headers.map(({ field }) => {
    return (
      <th className="tableHeader" id={field} key={field}>
        <span onClick={() => sortOnField(field, direction)} style={{ cursor: "pointer" }}>
          {field[0].toUpperCase() + field.slice(1)}
          {direction && sorting == field ? direction === "asc" && field === sorting ? <FaArrowDownLong /> : <FaArrowUpLong /> : ""}
        </span>
      </th>
    );
  });

  const tableData =
    list &&
    list.slice(0, 15).map((item, index) => (
      <tr key={index} className="tableDataRow">
        {headers.map(({ field }) => (
          <td id={field} key={field} onClick={() => handleNavigate(item.id)}>
            {tableDataFormate(item, field)}
          </td>
        ))}
        <td
          id="action"
          key={headers.length + ":"}
          style={{ width: `1px`, zIndex: 5 }}
          onClick={() => setOpenAction((state) => (state === item.id ? false : item.id))}
        >
          &#8942;
          <div className="actionInDatatable">
            <button className="actionButton" onClick={() => modalToggle({ id: item.id, isEdit: true })}>
              Edit
            </button>
            <button className="actionButton" onClick={() => modalToggle({ id: item.id, isDelete: true })}>
              Delete
            </button>
          </div>
        </td>
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

  const fatchData = ({ order } = {}) => {
    const searchOnThisFields = {};
    if (status) searchOnThisFields.status = status;
    if (priority) searchOnThisFields.priority = priority;
    headers.map(({ searchable, field }) => {
      if (searchable) searchOnThisFields[field] = `or|%${searchText}%`;
    });
    dispatch(api({ offset: (currentPage - 1) * 15, order, ...searchOnThisFields }));
  };

  useEffect(() => {
    fatchData();
  }, [currentPage, ticketCount, searchText, status, priority]);

  return (
    <div className="DataTable">
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "5px" }}>
        <input value={searchText} placeholder="Search Ticket" onChange={(ev) => setSearchText(ev.target.value)} className="searchInput" />
        <div style={{ flexDirection: "column", display: "flex", marginLeft: "10px" }}>
          <label className="label">Priority</label>
          <select className="selectOption" id="country" value={priority} onChange={(ev) => setPriority(ev.target.value)}>
            <option value="">None</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div style={{ flexDirection: "column", display: "flex", marginLeft: "10px" }}>
          <label className="label">Status</label>
          <select className="selectOption" id="country" value={status} onChange={(ev) => setStatus(ev.target.value)}>
            <option value="">None</option>
            <option value="OPEN">Open</option>
            <option value="INPROGRESS">In Progress</option>
            <option value="CLOSED">Close</option>
          </select>
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table>
          <tbody>
            <tr>
              {tableHeader} <th id="actionHeader"></th>
            </tr>
            {tableData}
          </tbody>
        </table>
      </div>
      {ticketCount === 0 ? <p style={{ alignSelf: "center" }}>Empty table Please create a ticket</p> : paginationButton()}
    </div>
  );
};

export default memo(DataTable);

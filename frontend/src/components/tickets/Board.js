import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeUserState } from "../../redux/slices/authSlice";

const Board = () => {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flex: 1,
        borderColor: "orange",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div style={{ padding: "20px", border: "2px", borderColor: "red", minWidth: "400px", maxWidth: "500px" }}>
        <button onClick={() => dispatch(changeUserState({ name: "krishn" }))}>Check Update state</button>
        <h3>OPEN</h3>
      </div>
      <div style={{ padding: "20px", border: "2px", borderColor: "black", minWidth: "400px", maxWidth: "500px" }}>
        <h3>In Progress</h3>
      </div>
      <div style={{ padding: "20px", border: "2px", borderColor: "black", minWidth: "400px", maxWidth: "500px" }}>
        <h3>Close</h3>
      </div>
    </div>
  );
};
export default Board;

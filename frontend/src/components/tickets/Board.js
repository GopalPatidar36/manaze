import React from "react";

const Board = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap:"wrap",
        flex: 1,
        borderColor: "orange",
        justifyContent: "space-between",
        width:"100%"
      }}
    >
      <div style={{ padding: "20px", border: "2px", borderColor: "red" }}>
        <h3>OPEN</h3>
      </div>
      <div style={{ padding: "20px", border: "2px", borderColor: "black" }}>
        <h3>In Progress</h3>
      </div>
      <div style={{ padding: "20px", border: "2px", borderColor: "black" }}>
        <h3>Close</h3>
      </div>
    </div>
  );
};
export default Board;

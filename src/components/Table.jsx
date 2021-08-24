import React from "react";

function Table({ comments, onSort, sort, sortField }) {
  return (
    <div>
      <table
        className="table
      table-striped
      table-dark
      table-bordered
      "
      >
        <thead>
          <tr style={{ cursor: "pointer" }}>
            <th style={{ width: "70px" }} onClick={() => onSort("id")}>
              ID <small> {sortField === "id" && sort}</small>
            </th>
            <th onClick={() => onSort("name")}>
              Name <small> {sortField === "name" && sort}</small>
            </th>
            <th onClick={() => onSort("email")}>
              Email <small> {sortField === "email" && sort}</small>
            </th>
            <th onClick={() => onSort("body")}>
              Text <small> {sortField === "body" && sort}</small>
            </th>
          </tr>
        </thead>
        <tbody>
          {comments?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

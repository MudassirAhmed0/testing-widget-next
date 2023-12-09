"use client";
import { sort } from "fast-sort";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export interface User {
  email: string;
  username: string;
}

interface Props {
  data: User[];
  sortParam?: "email" | "username";
}

const Table = ({ data, sortParam }: Props) => {
  const sortedUsers = sort(data).desc((user) => user[sortParam || "email"]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <Link href={"?sort=email"}>Email</Link>
          </th>
          <th>
            <Link href={"?sort=username"}>UserName</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.email}>
            <td>{user.email}</td>
            <td>{user.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

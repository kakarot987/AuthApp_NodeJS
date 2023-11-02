import React, { useState, useEffect } from "react";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome to the Admin Page where you can find information about admin rights.</p>

      <h2>Admin Rights</h2>
      <ul>
        <li>Access to sensitive data and user management</li>
        <li>Ability to modify application settings</li>
        <li>Approval of user requests and permissions</li>
        <li>Admin-level privileges in the application</li>
      </ul>

      <p>
        Admins play a crucial role in managing and maintaining the application,
        ensuring its security, and controlling access to various features.
      </p>
    </div>
  );
};

export default BoardAdmin;

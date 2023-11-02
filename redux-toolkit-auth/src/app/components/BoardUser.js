import React, { useState, useEffect } from "react";

const BoardUser = () => {

  return (
    <div>
      <h1>User Board</h1>
      <p>Welcome to the User Board, where you can find information about user rights and privileges.</p>

      <h2>User Rights</h2>
      <ul>
        <li>Access to personal profile information</li>
        <li>Use of core application features</li>
        <li>View and interact with content based on user permissions</li>
        <li>Participate in discussions, activities, and more</li>
      </ul>

      <p>
        Users have essential rights and privileges within the application, which allow them to
        make the most of their experience and access relevant features and information.
      </p>
    </div>
  );
};

export default BoardUser;

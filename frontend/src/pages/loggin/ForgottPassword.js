import React from "react";
import { Link } from "react-router-dom";

export const ForgottPassword = () => {
  return (
    <form>
      <h2> Password</h2>

      <input type="email" name="mail" required placeholder="mailadress"></input>
      <div className="mail error"></div>
      <Link to="/signin">
        <button>Send new password</button>
      </Link>
    </form>
  );
};

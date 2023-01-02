import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { addSearchTerm } from "../reducer/search";
import style from "../styles/navbar.module.css";

const Navbar = () => {
  // Define local state for search term and function to update it
  const [searchTerm, setSearchTerm] = useState("");

  // Import useDispatch function from react-redux to dispatch addSearchTerm action
  const dispatch = useDispatch();

  // Use useEffect to update search term when searchTerm is modified
  useEffect(() => {
    dispatch(addSearchTerm(searchTerm));
  }, [searchTerm]);

  return (
    <nav className={style.navContainer}>
      <div className={style.logo}>My Own Mails</div>
      <div className={style.searchContainer}>
        {/* Use "label" attribute to make search bar more accessible */}
        <form aria-label="Mail search form">
          {/* Input field for search term */}
          <input
            type="text"
            placeholder="Search in mails..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          {/* Submit button for search form */}
          <button type="submit" className={style.searchButton}>
            {/* Search icon */}
            <FaSearch className={style.searchIcon} />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;

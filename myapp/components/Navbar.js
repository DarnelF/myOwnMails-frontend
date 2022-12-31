import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addSearchTerm } from "../reducer/search";
import style from "../styles/navbar.module.css";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const handleSearchChange = (e) => {
    dispatch(addSearchTerm(searchTerm));
    setSearchTerm("");
  };
  return (
    <nav className={style.navContainer}>
      <div className={style.logo}>My Own Mails</div>
      <div className={style.searchContainer}>
        <form>
          <input
            type="text"
            placeholder="Rechercher dans les mails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button" onClick={handleSearchChange}>
            <FaSearch className={style.searchIcon} />
          </button>
        </form>
      </div>
    </nav>
  );
}

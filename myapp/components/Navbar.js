import React from "react";
import { FaSearch } from "react-icons/fa";
import style from "../styles/navbar.module.css";
export default function Navbar() {
  return (
    <nav className={style.navContainer}>
      <div className={style.logo}>My Own Mails</div>
      <div className={style.searchContainer}>
        <form>
          <input type="text" placeholder="Rechercher dans les mails..." />
          <button type="submit">
            <FaSearch className={style.searchIcon} />
          </button>
        </form>
      </div>
    </nav>
  );
}

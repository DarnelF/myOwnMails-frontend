import React, { useState } from "react";
import style from "../styles/sender.module.css";

export default function Sender() {
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [body, setBody] = useState("");

  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImgUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={style.senderContainer}>
      <form className={style.senderForm}>
        <div className={style.senderInfo}>
          <label htmlFor="profile-img">
            <img src={profileImgUrl} alt="Profile" />
            <input
              className={style.senderPic}
              type="file"
              id="profile-img"
              accept="image/*"
              onChange={handleProfileImgChange}
            />
          </label>
          <input
            className={style.senderName}
            type="text"
            placeholder="Nom de l'émetteur"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
        </div>
        <input
          className={style.mailObject}
          type="text"
          placeholder="Objet du courrier électronique"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          className={style.mailContent}
          placeholder="Corps du message"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className={style.submitButton} type="submit">
          Envoyer
        </button>
      </form>
    </div>
  );
}

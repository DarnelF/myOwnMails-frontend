import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmail } from "../reducer/emails";
import style from "../styles/sender.module.css";

export default function Sender() {
  const dispatch = useDispatch();
  //Sender's name
  const [sender, setSender] = useState("");
  //Subject of the email
  const [subject, setSubject] = useState("");
  //Profile picture url
  const [profileImgUrl, setProfileImgUrl] = useState("");
  //Body of the email
  const [body, setBody] = useState("");

  //The full email in an object form
  const [emailToSend, setEmailToSend] = useState({});

  //Charge a profile picture on the computer
  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
      console.log(profileImgUrl);
    }
  };

  //Function that sends the email to the reducer when the form is submitted
  const handleSendEmail = () => {
    if (sender === "" || subject === "" || body === "") {
      // Afficher un message d'erreur ou une alerte ici
      return;
    }

    const emailToSend = {
      sender: {
        name: sender,
        profileImageUrl: profileImgUrl,
      },
      subject: subject,
      excerpt: body,
    };
    dispatch(addEmail(emailToSend));
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
        <button
          className={style.submitButton}
          type="button"
          onClick={() => handleSendEmail()}
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addEmail } from "../reducer/emails";
import style from "../styles/sender.module.css";

export default function Sender() {
  // Import the useDispatch hook from react-redux to dispatch the addEmail action
  const dispatch = useDispatch();
  // Declare state variables for the sender's name, the subject of the email, the profile image URL, and the body of the email
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [body, setBody] = useState("");

  // Declare a state variable for the email object to be sent
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
     // Dispatch the addEmail action with the email object
    dispatch(addEmail(emailToSend));
  };
  useEffect(() => {
    return () => {
      setSender("");
      setSubject("");
      setProfileImgUrl("");
      setBody("");
    };
  }, []);

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
              required
            />
          </label>
          <input
            className={style.senderName}
            type="text"
            placeholder="Nom de l'émetteur"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            required
          />
        </div>
        <input
          className={style.mailObject}
          type="text"
          placeholder="Objet du courrier électronique"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
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

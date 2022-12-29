import React, { useState } from "react";
import style from "../styles/inbox.module.css";
import { List, Avatar, Typography, Modal, Button } from "antd";

const { Text } = Typography;
const emailsExemple = [
  {
    sender: {
      name: "Alice",
      profileImageUrl:
        "https://cinepassion34.fr/wp-content/uploads/2021/11/Alice-Dufour-cinepassion34.jpg",
    },
    subject: "Bonjour",
    excerpt: "Comment ça va ?",
  },
  {
    sender: {
      name: "Bob",
      profileImageUrl:
        "https://www.elite-hair.fr/176-large_default/bob-solaire-homme.jpg",
    },
    subject: "Demande de renseignements",
    excerpt: "Avez-vous des disponibilités pour une réunion demain ?",
  },
  {
    sender: {
      name: "Charlie",
      profileImageUrl:
        "http://media.nrj.fr/raw/2020/11/charlie-puth-un-prodige-a-l-oreille-absolue-1605615010.jpg",
    },
    subject: "Invitation à une conférence",
    excerpt:
      "Je vous invite à une conférence sur les technologies de l'information la semaine prochaine",
  },
];

export default function Inbox() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [emails, setEmails] = useState(emailsExemple);

  const deleteEmail = (email) => {
    const updatedEmails = emails.filter((e) => e !== email);
    setEmails(updatedEmails);
    setSelectedEmail(null);
    setModalVisible(false);
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setModalVisible(true);
  };

  const onModalClose = () => {
    setModalVisible(false);
  };

  const modalContent = ({ email, visible, onClose }) => {
    return (
      <Modal
        title={email.subject}
        visible={visible}
        onCancel={onClose}
        footer={<Button onClick={() => deleteEmail(email)}>Supprimer</Button>}
        width={600}
      >
        <p>De : {email.sender.name}</p>
        <hr />
        <p>{email.excerpt}</p>
      </Modal>
    );
  };

  return (
    //Affiche les mails sous forme de list Ant Design qui permet une rapide mise en forme
    //de l'inbox
    <>
      <List
        className={style.inboxContainer}
        dataSource={emails}
        renderItem={(email) => (
          <List.Item
            onClick={() => handleEmailClick(email)}
            className={style.inboxItem}
          >
            <List.Item.Meta
              avatar={<Avatar src={email.sender.profileImageUrl} />}
              title={<Text strong>From : {email.sender.name}</Text>}
              description={<Text strong> Objet : {email.subject}</Text>}
            />
            {email.excerpt}
          </List.Item>
        )}
      />
      {modalVisible &&
        modalContent({
          email: selectedEmail,
          visible: modalVisible,
          onClose: onModalClose,
        })}
    </>
  );
}

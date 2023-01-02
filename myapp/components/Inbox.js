import React, { useEffect, useState } from "react";
import style from "../styles/inbox.module.css";
import { List, Avatar, Typography, Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmail } from "../reducer/emails";

const { Text } = Typography;

export default function Inbox() {
  const dispatch = useDispatch();
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  //Access the emails in the reducer
  const emails = useSelector((state) => state.emails.value);

  //Access the searchterms
  const searchTerms = useSelector((state) => state.search.value);

  const [filteredEmails, setFilteredEmails] = useState(
    emails.filter((email) => {
      return (
        email.sender.name.includes(searchTerms) ||
        email.subject.includes(searchTerms) ||
        email.excerpt.includes(searchTerms)
      );
    })
  );

  // Use the useEffect hook to update the filteredEmails state after the deleteEmail action is dispatched
  useEffect(() => {
    // Refilter emails and update filteredEmails state
    const updatedFilteredEmails = emails.filter((email) => {
      return (
        email.sender.name.includes(searchTerms) ||
        email.subject.includes(searchTerms) ||
        email.excerpt.includes(searchTerms)
      );
    });
    setFilteredEmails(updatedFilteredEmails);
  }, [emails, searchTerms]);

  //Delete the selected email from the reducer
  const deleteEmailItem = (email) => {
    dispatch(deleteEmail(email));
    setSelectedEmail(null);
    setModalVisible(false);
  };

  //Open the selected email in a modal
  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setModalVisible(true);
  };

  //Boolean to handle the closing and opening of the modal
  const onModalClose = () => {
    setModalVisible(false);
  };

  const modalContent = ({ email, visible, onClose }) => {
    return (
      <Modal
        title={email.subject}
        visible={visible}
        onCancel={onClose}
        footer={
          <Button onClick={() => deleteEmailItem(email)}>Supprimer</Button>
        }
        width={600}
      >
        <p>De : {email.sender.name}</p>
        <hr />
        <p>{email.excerpt}</p>
      </Modal>
    );
  };

  return (
    <div className={style.inboxContainer}>
      <h1>Boîte de réception</h1>
      <List
        dataSource={filteredEmails}
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
    </div>
  );
}

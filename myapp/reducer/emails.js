import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
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
  ],
};

export const emailsSlice = createSlice({
  name: "emails",

  initialState,
  reducers: {
    addEmail: (state, action) => {
      state.value.push(action.payload);
    },
    deleteEmail: (state, action) => {
      state.value = state.value.filter((e) => e !== action.payload);
    },
  },
});

export const { addEmail, deleteEmail } = emailsSlice.actions;
export default emailsSlice.reducer;

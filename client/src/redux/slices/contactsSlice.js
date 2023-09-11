import { createSlice } from '@reduxjs/toolkit';
import axios from '../Api';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  loading: false,
  error: { isError: false, message: '' },
  contactsListDisplay: [],
  contactsData: {
    totalPages: 1,
    currentPage: 1,
    contactsList: [],
  },
  contactDetails: {},
  updatedContactsData: {
    loading: false,
    totalPages: 1,
    currentPage: 1,
    contactsList: [],
  },
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setContactsListDisplay: (state, { payload }) => {
      state.contactsListDisplay = payload;
    },
    setUpdatedContactsDataLoading: (state, { payload }) => {
      state.updatedContactsData.loading = payload;
    },
    setContactListCurrentPage: (state, { payload }) => {
      state.contactsData.currentPage = payload;
    },
    setUpdatedContactListCurrentPage: (state, { payload }) => {
      state.updatedContactsData.currentPage = payload;
    },
    setAllContactsSuccess: (state, { payload }) => {
      state.contactsData.loading = false;
      state.contactsData.contactsList = [...payload.data];
      state.error = { isError: false, message: '' };
    },
    setUpdatedAllContactsSuccess: (state, { payload }) => {
      state.updatedContactsData.loading = false;
      state.updatedContactsData.contactsList = [...payload.data];
      state.error = { isError: false, message: '' };
    },
    setUpdatedAllContactsFailure: (state, { payload }) => {
      state.updatedContactsData.loading = false;
      state.error = { isError: true, message: payload };
    },
    setContactDetailsSuccess: (state, { payload }) => {
      state.loading = false;
      state.contactDetails = payload;
      state.error = { isError: false, message: '' };
    },
    setContactDetailsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = { isError: true, message: payload };
    },
    setSearchedContactsSuccess: (state, { payload }) => {
      state.updatedContactsData.contactsList = [...payload];
      state.error = { isError: false, message: '' };
    },
    setSortedContactsSuccess: (state, { payload }) => {
      state.updatedContactsData.contactsList = [...payload];
      state.error = { isError: false, message: '' };
    }
  }
})

export const { setLoading, setContactsListDisplay, setUpdatedContactsDataLoading, setContactListCurrentPage, setUpdatedContactListCurrentPage, setAllContactsSuccess, setUpdatedAllContactsSuccess, setUpdatedAllContactsFailure, setContactDetailsSuccess, setContactDetailsFailure, setSearchedContactsSuccess, setSortedContactsSuccess } = contactsSlice.actions;

export default contactsSlice.reducer;

export const getAllContacts = () => async (dispatch) => {
  try {
    dispatch(setUpdatedContactsDataLoading(true));
    const response = await axios.get(`/api/contacts`);

    dispatch(setAllContactsSuccess(response.data));
    dispatch(setUpdatedAllContactsSuccess(response.data));
  } catch (error) {
    console.log(error.message);
    if (error.response.status === 404) {
      toast.error(error.message);
    }
    else {
      toast.error(error.response.data.message);
    }
    dispatch(setUpdatedAllContactsFailure(error.response.data.message));
  }
}

export const getContactDetails = (contactId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`/api/contacts/${contactId}`);
    dispatch(setContactDetailsSuccess(response.data.contactData));

  } catch (error) {
    console.log(error.message);
    if (error.response.status === 404) {
      toast.error(error.message);
    }
    else {
      toast.error(error.response.data.message);
    }
    dispatch(setContactDetailsFailure(error.response.data.message));
  }
}

export const getSearchedContacts = ({ contactsList, searchInput }) => async (dispatch) => {
  searchInput = String(searchInput).toLowerCase();
  const keysToSearch = ['name', 'email', 'phoneNumber'];
  const searchedData = contactsList.filter((contact) => {
    return (
      keysToSearch.some((key) => contact[key].toString().toLowerCase().includes(searchInput))
    )
  })
  dispatch(setSearchedContactsSuccess(searchedData));
}

export const getSortedContactsByName = ({ contactsList, sortType }) => async (dispatch) => {

  const sortedList = contactsList?.slice().sort((a, b) => {
    const nameA = a.name?.toLowerCase();
    const nameB = b.name?.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })
  if (sortType === 1) {
    dispatch(setSortedContactsSuccess(sortedList));
  } else if (sortType === -1) {
    dispatch(setSortedContactsSuccess([...sortedList.reverse()]));
  }
}

export const createNewContact = (contactData, callback) => async (dispatch) => {
  const { firstName, lastName, email, phoneNumber } = contactData;
  try {
    const response = await axios.post(`/api/contacts`, {
      name: `${firstName} ${lastName}`,
      email,
      phoneNumber,
    });
    if (callback) {
      callback();
    }
    console.log(response.data);
    toast.success('Added New Contact Successfully');

  } catch (error) {
    console.log(error);
    if (error.response.status === 409) {
      toast.error(error.message);
    }
    else {
      toast.error(error.response.data.message);
    }
  }
}

export const updateContact = (contactData) => async (dispatch) => {
  const { contactId, firstName, lastName, email, phoneNumber } = contactData;
  try {
    const response = await axios.patch(`/api/contacts/${contactId}`, {
      name: `${firstName} ${lastName}`,
      email,
      phoneNumber,
    });
    console.log(response);
    if (response.status === 201) {
      dispatch(getAllContacts());
      toast.success('Contact updated Successfully');
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message);
  }
}

export const deleteContact = (_id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/contacts/${_id}`);
    console.log(response);
    if (response.status === 200) {
      dispatch(getAllContacts());
      toast.success('Contact Deleted Successfully');
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
}

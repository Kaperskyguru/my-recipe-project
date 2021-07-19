import Vue from "vue";
const state = {
  searchParam: "",
  searchResults: [],
  bookmarks: JSON.parse(window.localStorage.getItem("bookmarks")),
};
const getters = {
  getSearchResults: (state) => state.searchResults,
  getSearchParam: (state) => state.searchParam,
  getBookmarks: (state) => {
    return state.bookmarks;
  },
};
const actions = {
  async fetchSearchResult({ commit }, searchItem) {
    const res = await Vue.axios.get(
      `https://api.edamam.com/search?q=${searchItem}&app_id=82c456d5&app_key=6257caa65622b5ae1d4e180d283d2d77&from=0&to=20`
    );
    const results = res.data.hits;
    commit("updateSearchResults", results);
  },
  async fetchSearchItem({ commit }, item) {
    commit("updateSearchItem", item);
  },
};
const mutations = {
  updateSearchResults: (state, results) => {
    state.searchResults = results;
  },
  updateSearchItem: (state, item) => {
    state.searchParam = item;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};

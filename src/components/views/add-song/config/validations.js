export const validations = {
  addSong: {
    titleFieldValidation: { required: "This field is required" },
    artistFieldValidation: { required: "This field is required" },
    albumFieldValidation: { required: "This field is required" },
    ytLinkFieldValidation: {
      required: "This field is required",
      pattern: {
        value: /^https:\/\/www.youtube.com\/watch\?v=/,
        message: "Must start with https://www.youtube.com/watch?v=",
      },
    },
  },
};

export default validations;

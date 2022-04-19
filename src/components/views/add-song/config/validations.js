export const validations = {
  addSong: {
    titleFieldValidation: { required: "This field is required" },
    artistFieldalidation: { required: "This field is required" },
    albumFieldalidation: { required: "This field is required" },
    ytLinkFieldalidation: {
      required: "This field is required",
      pattern: {
        value: /^https:\/\/www.youtube.com\/watch\?v=/,
        message: "Must start with https://www.youtube.com/watch?v=",
      },
    },
  },
};

export default validations;

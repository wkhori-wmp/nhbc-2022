export const validations = {
  addSong: {
    title: { required: "This field is required" },
    artist: { required: "This field is required" },
    album: { required: "This field is required" },
    ytLink: {
      required: "This field is required",
      pattern: {
        value: /^https:\/\/www.youtube.com\/watch\?v=/,
        message: "Must start with https://www.youtube.com/watch?v=",
      },
    },
  },
};

export default validations;

export const translations = {
  addSong: {
    inputs: {
      title: {
        label: "title",
        placeholder: "Enter the title of your song here",
      },
      artist: {
        label: "artist",
        placeholder: "Enter the artist here",
      },
      album: {
        label: "album",
        placeholder: "Enter the album here",
      },
      ytLink: {
        label: "ytLink",
        placeholder:
          "Enter a YouTube link here. Note: must start with https://www.youtube.com/watch?v=",
      },
    },
  },
};

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

export const formFields = {
  inputs: {
    title: {
      label: "title",
      placeholder: "Enter the title of your song here",
      validation: { required: "This field is required" },
    },
    artist: {
      label: "artist",
      placeholder: "Enter the artist here",
      validation: { required: "This field is required" },
    },
    album: {
      label: "album",
      placeholder: "Enter the album here",
      validation: { required: "This field is required" },
    },
    ytLink: {
      label: "ytLink",
      placeholder:
        "Enter a YouTube link here. Note: must start with https://www.youtube.com/watch?v=",
      validation: {
        required: "This field is required",
        pattern: {
          value: /^https:\/\/www.youtube.com\/watch\?v=/,
          message: "Must start with https://www.youtube.com/watch?v=",
        },
      },
    },
  },
};

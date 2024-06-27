const NotEmpty = (value) =>
  value !== undefined && value !== null && value.trim() !== "";

export default NotEmpty;

export default (e: any, action: string, queryColor: string) => {
    if (action === "underline") {
      e.currentTarget.style.textDecoration = "underline";
      e.currentTarget.style.color = "#C3AD60";
    } else {
      e.currentTarget.style.textDecoration = "none";
      e.currentTarget.style.color = queryColor || "inherit";
    }
  };
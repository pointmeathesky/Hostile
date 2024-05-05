import React from "react";
import ReactDOM from "react-dom/client";
import Profile from "../src/components/profile"
import "../src/styles.css";
import Menu from "../src/components/menu";
import Window from "../src/components/window";
import Post from "../src/components/Post";
import ViewPost from "../src/components/viewPost";
import Posting from "../src/components/viewPost";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Posting/>
  </React.StrictMode>,
);

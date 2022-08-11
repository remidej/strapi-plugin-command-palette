/**
 *
 * PluginIcon
 *
 */

import React, { useState } from "react";
import Puzzle from "@strapi/icons/Puzzle";
import { useHotkeys } from "react-hotkeys-hook";
import Modal from "./Modal";

const PluginIcon = () => {
  const [modalIsShown, setModalIsShown] = useState(false);

  // Open modal on keyboard shortcut
  useHotkeys(
    "command+k,ctrl+k",
    (event, handler) => {
      event.preventDefault();
      setModalIsShown(true);
    },
    { enableOnTags: ["INPUT"] }
  );

  return (
    <>
      <Puzzle />
      {modalIsShown && <Modal handleClose={() => setModalIsShown(false)} />}
    </>
  );
};

export default PluginIcon;

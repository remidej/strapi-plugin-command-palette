/**
 *
 * PluginIcon
 *
 */

import React, { useState, useEffect } from "react";
import Puzzle from "@strapi/icons/Puzzle";
import CommandMenu from "./CommandMenu";

const PluginIcon = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Open modal on keyboard shortcut
  useEffect(() => {
    const down = (e) => {
      console.log('down', e.key, e.metaKey);
      if (e.key === 'k' && e.metaKey) {
        console.log('toggle!')
        setModalIsOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Puzzle />
      <CommandMenu open={open} onOpenChange={setModalIsOpen} />
    </>
  );
};

export default PluginIcon;

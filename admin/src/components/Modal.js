import React, { useState, useRef, useEffect } from "react";
import { NotFound } from "@strapi/helper-plugin";
import { useIntl } from "react-intl";
import { useHotkeys } from "react-hotkeys-hook";
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Typography,
  Box,
  TextInput,
  Information,
  Stack,
  MainNav,
  NavBrand,
  NavSections,
  NavLink,
  NavSection,
  NavUser,
  NavCondense,
} from "@strapi/design-system";
import useMatches from "../hooks/useMatches";

const hotKeyOptions = { enableOnTags: ["INPUT"] };

const Modal = ({ handleClose }) => {
  const { formatMessage } = useIntl();

  // Search state
  const [searchInput, setSearchInput] = useState("");
  const groupedMatches = useMatches(searchInput);
  const orderedMatches = Object.values(groupedMatches).reduce(
    (matches, section) => [...matches, ...section],
    []
  );
  const [selectedMatch, setSelectedMatch] = useState(orderedMatches[0]?.id);

  // Prevent stale closure
  const selectedMatchRef = useRef();
  selectedMatchRef.current = selectedMatch;

  const matchElementRef = useRef(null);

  const formRef = useRef(null);
  // useEffect(() => {
  //   formRef.current?.querySelector("input").focus();
  // });

  const handleMoveMatch = (direction) => {
    const currentIndex = orderedMatches.findIndex(
      (match) => match.id === selectedMatchRef.current
    );
    const nextIndex = currentIndex + direction;

    if (nextIndex >= orderedMatches.length) {
      console.log("back to first");
      // Back to first
      setSelectedMatch(orderedMatches[0]?.id);
    } else if (nextIndex < 0) {
      console.log("back to last");
      // Back to last
      const lastIndex = orderedMatches.length - 1;
      setSelectedMatch(orderedMatches[lastIndex]?.id);
    } else {
      console.log("go to sibling");
      // Move to sibling result
      setSelectedMatch(orderedMatches[nextIndex]?.id);
    }
    matchElementRef.current.scrollIntoView({ block: "nearest" });
  };

  useHotkeys(
    "down",
    (event) => {
      console.log("down");
      event.preventDefault();
      handleMoveMatch(1);
    },
    hotKeyOptions
  );

  useHotkeys(
    "up",
    (event) => {
      console.log("up");
      event.preventDefault();
      handleMoveMatch(-1);
    },
    hotKeyOptions
  );

  return (
    <ModalLayout onClose={handleClose} labelledBy="title" basis="500px">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {formatMessage({
            id: "plugin.name",
            defaultMessage: "Command Palette",
          })}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <Box minHeight="60vh" as="form" ref={formRef}>
          <TextInput
            name="search"
            label="Jump to..."
            placeholder="Search for an action or a page"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            autoComplete="off"
          />
          <NavSections marginLeft="-12px" marginRight="-12px">
            {Object.entries(groupedMatches).map(
              ([sectionName, sectionMatches]) => (
                <NavSection label={sectionName} key={sectionName}>
                  {sectionMatches.map((match) => {
                    const ResutIcon = match.icon;
                    const isActive = selectedMatch === match.id ? "active" : "";

                    return (
                      <div
                        key={match.id}
                        ref={isActive ? matchElementRef : null}
                        style={{ scrollMargin: "16px" }}
                      >
                        <NavLink
                          as="button"
                          onClick={() => {
                            match.handleClick();
                            handleClose();
                          }}
                          icon={<ResutIcon />}
                          style={{ display: "block", width: "100%" }}
                          className={isActive}
                        >
                          {match.title}
                        </NavLink>
                      </div>
                    );
                  })}
                </NavSection>
              )
            )}
            {/* Empty view */}
            {orderedMatches.length === 0 && (
              <Typography>No results for "{searchInput}"</Typography>
            )}
          </NavSections>
        </Box>
      </ModalBody>
    </ModalLayout>
  );
};

export default Modal;

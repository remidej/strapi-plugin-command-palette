import { useHistory } from "react-router-dom";
import matchSorter from "match-sorter";
import _ from "lodash";
import Link from "@strapi/icons/Link";
import Eye from "@strapi/icons/Eye";
import Landscape from "@strapi/icons/Landscape";
import User from "@strapi/icons/User";
import ShoppingCart from "@strapi/icons/ShoppingCart";
import Layout from "@strapi/icons/Layout";
import Write from "@strapi/icons/Write";
import Puzzle from "@strapi/icons/Puzzle";
import { toggleTheme } from "../utils/theme";
import { logOut } from "../utils/auth";

function useMatches(searchInput) {
  const history = useHistory();

  const sectionPages = "Pages";
  const sectionActions = "Actions";

  const possibleResults = [
    {
      id: "pages.content-manager",
      section: sectionPages,
      title: "Open Content Manager",
      handleClick: () => history.push("/content-manager"),
      icon: Write,
    },
    {
      id: "pages.content-type-builder",
      section: sectionPages,
      title: "Open Content-Type Builder",
      handleClick: () => history.push("/plugins/content-type-builder"),
      icon: Layout,
    },
    {
      id: "pages.media-library",
      section: sectionPages,
      title: "Open Media Library",
      handleClick: () => history.push("/plugins/upload"),
      icon: Landscape,
    },
    {
      id: "pages.list-plugins",
      section: sectionPages,
      title: "Open Plugins",
      handleClick: () => history.push("/list-plugins"),
      icon: Puzzle,
    },
    {
      id: "pages.marketplace",
      section: sectionPages,
      title: "Open Marketplace",
      handleClick: () => history.push("/marketplace"),
      icon: ShoppingCart,
    },
    {
      id: "pages.settings",
      section: sectionPages,
      title: "Open Settings",
      handleClick: () => history.push("/settings"),
      icon: ShoppingCart,
    },
    {
      id: "actions.toggle-theme",
      section: sectionActions,
      title: "Toggle theme",
      handleClick: toggleTheme,
      icon: Eye,
    },
    {
      id: "actions.log-out",
      section: sectionActions,
      title: "Log out",
      handleClick: logOut,
      icon: User,
    },
  ];

  const orderedMatches = matchSorter(possibleResults, searchInput, {
    keys: ["title", "section"],
  });

  return _.groupBy(orderedMatches, "section");
}

export default useMatches;

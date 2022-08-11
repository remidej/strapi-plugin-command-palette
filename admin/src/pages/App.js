import React from "react";
import { HeaderLayout } from "@strapi/design-system";
import { useIntl } from "react-intl";
import pluginId from "../pluginId";

const App = () => {
  const { formatMessage } = useIntl();

  return (
    <HeaderLayout
      title={formatMessage({
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Command Palette",
      })}
      subtitle={formatMessage({
        id: `${pluginId}.page.instructions`,
        defaultMessage:
          "Hit command+k from anywhere in Strapi to get the Command Palette.",
      })}
    />
  );
};

export default App;

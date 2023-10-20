import React from "react";
import { Helmet } from "react-helmet";
import Icon from "@/assets/svg";

/**
 * 404
 */
const NotFound: React.FC = (): React.ReactElement => {
  return (
    <>
      <Helmet title="404" /* 404 */ />
      <div className="not-found flex-center flex-direction-column ">
        <p className="m-b-10">
          <Icon name="404" />
        </p>
      </div>
    </>
  );
};

export default NotFound;

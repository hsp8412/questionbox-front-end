import React from "react";
import { Box } from "../../interfaces/boxInterface";

interface Props {
  box: Box;
}

const BoxCard: React.FC<Props> = ({ box }) => {
  return (
    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <p></p>
    </div>
  );
};

export default BoxCard;

import React from "react";

interface NodesEditorInfoProps {
  id: string;
  type?: string;
}
export const NodesEditorInfo: React.FC<NodesEditorInfoProps> = ({id, type}) => {
  return (
    <>
      <p>id: {id}</p>
      <p>type: {type}</p>
    </>
  );
};

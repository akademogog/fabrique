import React, { ReactNode } from "react";
import style from "../NodesEditor.module.scss";

interface NodesEditorSectionProps {
  title: string;
  children: ReactNode;
}

export const NodesEditorSection: React.FC<NodesEditorSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className={style.nodesEditorSection}>
      <h4 className={style.nodesEditorSectionTitle}>{title}</h4>
      {children}
    </div>
  );
};

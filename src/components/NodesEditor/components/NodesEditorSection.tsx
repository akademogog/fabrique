import React, { ReactNode } from "react";
import style from "../NodesEditor.module.scss";

interface NodesEditorSectionProps {
  title: string;
  children: ReactNode;
  control?: ReactNode;
}

export const NodesEditorSection: React.FC<NodesEditorSectionProps> = ({
  title,
  children,
  control
}) => {
  return (
    <div className={style.nodesEditorSection}>
      <div className={style.nodesEditorSectionTop}><h4 className={style.nodesEditorSectionTitle}>{title}</h4>{control}</div>
      {children}
    </div>
  );
};

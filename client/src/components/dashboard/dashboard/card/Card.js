import React from "react";
export default function Card({ icon, title, content }) {
  return (
    <div className="Card">
      {icon}
      <div className="Card_body">
        <span className="Card_title">{title}</span>
        <span className="Card_content"> {content}</span>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";

export default function SimpleCard({ categoryData, currentCardIndex }) {
  useEffect(() => {
    // console.log(currentCardIndex);
    if (currentCardIndex === -1) {
      document.getElementById(`card-0`) &&
        document.getElementById(`card-0`).blur();
    } else {
      document.getElementById(`card-${currentCardIndex}`) &&
        document.getElementById(`card-${currentCardIndex}`).focus();
    }
  }, [currentCardIndex]);

  return (
    <div className="parent">
      {categoryData.map((v, i) => (
        <div
          className="card"
          style={{ width: "100%" }}
          id={`card-${i}`}
          key={i}
          tabIndex="0"
        >
          <div className="cards-img">
            <img
              className="card-img-top"
              src={v.image.p_small.url}
              alt="Card cap"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{v.title}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}

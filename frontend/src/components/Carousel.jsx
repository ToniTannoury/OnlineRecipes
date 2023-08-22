import React, { useState, useRef, useEffect } from "react";
import "../styles/Carousel.css";

const Carousel = ({ followings }) => {
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);

  const handleDragStart = (e) => {
    e.preventDefault();
    setStartX(e.clientX);
    setIsDragging(true);
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const offsetX = e.clientX - startX;
    const newScrollLeft = scrollLeft - offsetX;
    carouselRef.current.scrollLeft = newScrollLeft;
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      setScrollLeft(carouselRef.current.scrollLeft);
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
    }
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, []);

  return (
    <>
      <h2 className="carousel-heading">Followings</h2>
      <div
        className="carousel"
        ref={carouselRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        style={{ display: "flex", overflowX: "scroll" }}
      >
        <div style={{ display: "flex", gap: "40px", textAlign: "center" }}>
          {followings.map((student) => (
            <div
              key={student.id}
              className="student-image"
              style={{
                flex: "0 0 auto",
              }}
            >
              <div className="student-wrapper">
                <div className="profile-pic-image-carousel">
                  <img
                    className="profile-pic-image-car"
                    src={`http://127.0.0.1:8000/images/${student.pic_url}`}
                  />
                </div>
                <p className="student-username">{student.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;

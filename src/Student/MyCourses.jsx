import React, { useEffect } from "react";

export default function MyCourses() {
  useEffect(() => {
    document.title = "SKILLIFY | My Courses";
  }, []);
  return (
    <>
      <div className="container my-5">
        <h1 className="text-center fw-bold" style={{ color: "#5151D3" }}>
          My Courses
        </h1>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div class="card">
              <div
                className="card-img"
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src="https://picsum.photos/200"
                  alt=""
                  style={{
                    objectFit: "cover",
                    height: "250px",
                    width: "100%",
                  }}
                />
              </div>
              <div class="card-body">
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

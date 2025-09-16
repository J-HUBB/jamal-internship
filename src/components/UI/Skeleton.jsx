import React from "react";

const Skeleton = ({ width, height, borderRadius, count }) => {
  return (
    <div style={{display: "flex"}}>
    <div className="px-1">
      <div className="nft_coll">
        <div className="nft_wrap">
          <div
            className="skeleton-box"
            style={{ width: "100%", height: "200px" }}
          ></div>
        </div>
        <div className="nft_coll_pp">
          <div
            className="skeleton-box"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50px",
            }}
          ></div>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <div
            className="skeleton-box"
            style={{ width: "100px", height: "20px" }}
          ></div>
          <br />
          <div
            className="skeleton-box"
            style={{ width: "60px", height: "20px" }}
          ></div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Skeleton;

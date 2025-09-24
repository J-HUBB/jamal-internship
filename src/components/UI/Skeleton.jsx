import React from "react";

const Skeleton = ({ width, height, count, borderRadius }) => {
  const containerStyle = {display:"flex",flexDirection: "row"};
  const skeletons = Array.from({length: count, width: width, height: height, borderRadius: borderRadius},(_,index) => (
        <div key={index} className="px-1">
      <div className="nft_coll">
        <div className="nft_wrap">
          <div
            className="skeleton-box"
            style={{ width: width, height: "150px" }}
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

  )
  )
  return (
    <div style={containerStyle}>
      {skeletons}
    </div>
  );
};

export default Skeleton;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";
/*import Skeleton from "react-loading-skeleton";*/
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const { nftId } = useParams();
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breakpoint, setBreakpoint] = useState("mobile");
  //const [error, setError] = useState(null);

  async function fetchImages() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setImg(data);
    console.log(data);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setBreakpoint("desktop");
      } else if (window.innerWidth >= 768) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("mobile");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderSkeleton = () => {
    switch (breakpoint) {
      case "desktop":
        return (
          <>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
              <PrevArrow />
              <NextArrow />
              <Skeleton count={4} width={260} height={253} />
            </div>
          </>
        );
      case "tablet":
        return (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrevArrow />
              <NextArrow />
              <Skeleton count={2} width={285} height={267} />
            </div>
          </>
        );
      case "mobile":
      default:
        return (
          <>
           <div style={{ display: "flex", justifyContent: "center"}}>
            <Skeleton count={1} width={295} height={273} />
            </div>
          </>
        );
    }
  };

  function NextArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="custom-arrow--next"
        /*style={{
          position: "absolute",
          top: "50%",
          right: "-25px",
          transform: "translateY(-50%)",
          zIndex: 2,
          width: 40,
          height: 40,
          background: "#fff",
          borderRadius: "50%",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}*/
      >
        <i className="fa fa-chevron-right" style={{ fontSize: 16 }} />
      </div>
    );
  }

  function PrevArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="custom-arrow--prev"
        /*style={{
          position: "absolute",
          top: "50%",
          left: "-25px",
          transform: "translateY(-50%)",
          zIndex: 2,
          width: 40,
          height: 40,
          background: "#fff",
          borderRadius: "50%",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}*/
      >
        <i className="fa fa-chevron-left" style={{ fontSize: 16 }} />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section
      id="section-collections"
      className="no-bottom"
      data-aos="fade-up"
      data-aos-duration="1500"
      data-aos-delay="1000"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div>
            {loading ? (
              renderSkeleton()
            ) : (
              <Slider {...settings}>
                {img.map((image, index) => (
                  <div key={nftId} className="px-1">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={image.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={image.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{image.title}</h4>
                        </Link>
                        <span>ERC-{image.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;

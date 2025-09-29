import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const { nftId } = useParams();
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breakpoint, setBreakpoint] = useState("sm-mobile");

  async function fetchImages() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setImg(data);
    console.log(data);
  }

  /*useEffect(() => {
    fetchImages();
  }, []);*/

  /*setTimeout(() => {
    setLoading(false);
  }, 3000);*/

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setBreakpoint("lg-desktop");
      /*} else if (window.innerWidth >= 1090) {
        setBreakpoint("md-desktop");*/
      } else if (window.innerWidth >= 992) {
        setBreakpoint("desktop");
      } else if (window.innerWidth >= 768) {
        setBreakpoint("tablet");
      } else if (window.innerWidth >= 576) {
        setBreakpoint("lg-mobile");
      } else if (window.innerWidth >= 480) {
        setBreakpoint("mobile");
      } else {
        setBreakpoint("sm-mobile");
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      fetchImages();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /*const renderSkeleton = () => {
    switch (breakpoint) {
      case "lg-desktop":
        return (
          <>
            <div style={{display:"flex", justifyContent:"center"}}>
              <Skeleton count={4} width={260} height={253.57} />
            </div>
          </>
        );
      /*case "md-desktop":
        return (
          <>
            <div style={{display:"flex", justifyContent:"center"}}>
              <Skeleton count={4} width={229} height={236.12} />
            </div>
          </>
        );
      case "desktop":
        return (
          <>
            <div style={{display:"flex", justifyContent:"center"}}>
              <Skeleton count={3} width={296} height={273.85} />
            </div>
          </>
        );
      case "tablet":
        return (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Skeleton count={2} width={296} height={273.85} />
            </div>
          </>
        );
      case "lg-mobile":
        return (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Skeleton count={1} width={455} height={363.43} />
            </div>
          </>
        );
      case "mobile":
        return (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Skeleton count={1} width={380} height={321.18} />
            </div>
          </>
        );
      case "sm-mobile":
      default:
        return (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Skeleton count={1} width={295} height={273.29} />
            </div>
          </>
        );
    }
  };*/

  function NextArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="custom-arrow--next"
        /*style={{
          position: "absolute",
          top: "50%",
          right: "98%",
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
          left: "90%",
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
    dots: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 900, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 0, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
    /*customPaging: function(i) {
      const slide = img[i];
      return (
        <a href={slide.nftImage}>
          <div className="slick-dots slick-thumb">
            {slide.id}
          </div>
        </a>
      );
    },*/
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
            {loading ? (<div className="slider_container">
              <Slider {...settings}>
                {new Array(8).fill(0).map((_, index) => (
                 <div key={index} className="px-1" style={{margin:"10px"}}>
                  <div className="nft_coll" key={index} >
                    <div className="nft_wrap">
                      <Link to={``}>
                        <Skeleton width="100%" height="150px" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={``}>
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="">
                        <Skeleton width="100px" height="20px" />
                      </Link>
                      <br />
                      <Skeleton width="60px" height="20px" />
                    </div>
                  </div>
                  </div>
                ))}
              </Slider></div>
              ) : (
              <div className="slider_container">
                <Slider {...settings}>
                  {img.map((image, index) => (
                    <div key={index} className="px-1" style={{margin:"10px"}}>
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
                          <Link to={`/author/${image.authorId}`}>
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
              </div>
            )}
          </div>
        </div>
    </section>
  );
};

export default HotCollections;

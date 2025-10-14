import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchImages() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setImg(data);
    console.log(data);
  }

  useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      fetchImages();
    },[]);

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
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 }},
      { breakpoint: 900, settings: { slidesToShow: 3, slidesToScroll: 1 }},
      { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 1 }},
    ]
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row fadeIn">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-in" data-aos-duration="1000">Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div className="slider_container">
              <Slider {...settings} data-aos="fade-in">
                {new Array(8).fill(0).map((_, index) => (
                  <div key={index} className="px-1" style={{ margin: "10px" }}>
                    <div className="nft_coll">
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
              </Slider>
            </div>
          ) : (
            <div className="slider_container">
              <Slider {...settings}>
                {img.map((image, index) => (
                  <div key={index} className="px-1" >
                    <div className="nft_coll" key={index}>
                      <div className="nft_wrap">
                        <Link to={`/item-details/${image.nftId}`}>
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

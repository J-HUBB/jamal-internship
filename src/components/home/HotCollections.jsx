import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//import AuthorImage from "../../images/author_thumbnail.jpg";
//import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const HotCollections = () => {
  const { nftId } = useParams();
  const [img, setImg] = useState([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      );
      setImg(data);
      console.log(data);
    }
    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {/*new Array(4).fill(0).map((_, index) =>  */}
         <OwlCarousel className="owl-theme" loop margin={4} nav {...settings}>
          {img.slice(0, 6).map((image, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nftId}>
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
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;

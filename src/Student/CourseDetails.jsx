/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import baseURL from "../BaseURL/BaseURL";
import { useParams } from "react-router-dom";
import { getCookie, setCookie } from "../Helper/CookiesHelper";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import style from "./CourseDetails.module.css";
import logo from "../assets/icon-logo.png"; // Placeholder for video thumbnails

export default function CourseDetails() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addloading, setAddLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  
  const [courseContent, setCourseContent] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);

  const { id } = useParams();

  const fetchCourseContent = async () => {
    setLoadingContent(true);
    const token = getCookie("AccessTokenStudent");

    try {
      const response = await axios.get(
        `${baseURL}/users/courses/content/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + token,
          },
        }
      );
      setCourseContent(response.data);
    } catch (error) {
      console.error("Error fetching course content:", error);
    } finally {
      setLoadingContent(false);
    }
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const token = getCookie("AccessTokenStudent");

      try {
        const response = await axios.get(`${baseURL}/users/courses/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "SHA " + token,
          },
        });
        
        setCourse(response.data);
        setLoading(false);

        const courses = JSON.parse(getCookie("courses") || "[]");
        const purchased = courses.includes(id);
        setIsPurchased(purchased);

        const cart = JSON.parse(getCookie("cart") || "[]");
        setIsInCart(cart.includes(id));

        const favoriteIds = JSON.parse(getCookie("favorites") || "[]");
        setIsFavorite(favoriteIds.includes(id));

        if (purchased) {
          fetchCourseContent();
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch course details");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, fetchCourseContent]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    const token = getCookie("AccessTokenStudent");

    try {
      await axios.post(
        `${baseURL}/users/cart/${id}`,
        {},
        {
          headers: { Authorization: "SHA " + token },
        }
      );
      
      const cart = JSON.parse(getCookie("cart") || "[]");
      if (!cart.includes(id)) {
        cart.push(id);
        setCookie("cart", JSON.stringify(cart));
      }
      setIsInCart(true);

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Course added to cart successfully",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "You already bought this course, or it's in your cart.", "error");
    } finally {
      setAddLoading(false);
    }
  };

  const toggleFavorite = async () => {
    let favorites = JSON.parse(getCookie("favorites") || "[]");
    const token = getCookie("AccessTokenStudent");

    if (isFavorite) {
      // Remove
      const index = favorites.indexOf(id);
      if (index > -1) favorites.splice(index, 1);
      setCookie("favorites", JSON.stringify(favorites));
      setIsFavorite(false);

      try {
        await axios.delete(`${baseURL}/users/favorite/${id}`, {
          headers: { Authorization: "SHA " + token },
        });
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to remove from favorites", "error");
      }
    } else {
      // Add
      favorites.push(id);
      setCookie("favorites", JSON.stringify(favorites));
      setIsFavorite(true);

      try {
        await axios.post(
          `${baseURL}/users/favorite/${id}`,
          {},
          { headers: { Authorization: "SHA " + token } }
        );
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to add to favorites", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className={style.loadingWrapper}>
        <div className="spinner-border" style={{ width: "4rem", height: "4rem" }} role="status"></div>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.pageContainer}>
        <div className="alert alert-danger text-center fw-bold" style={{ borderRadius: 16 }}>
          Oops! {error}
        </div>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className={style.pageContainer}>
      
      <div className={style.courseHeader}>
        <h1 className={style.courseTitle}>{course.title}</h1>
        <p className={style.courseSubtitle}>
          Here you are on the right path to becoming a hero in your field. Complete this course to achieve your goals!
        </p>
      </div>

      <div className={style.layoutGrid}>
        
        {/* ── Left Column: Information & Course Content ── */}
        <div className={style.mainColumn}>
          
          <div className={style.infoCard}>
            <div className={style.infoRow}>
              <div className={style.infoIcon}><i className="fa-solid fa-chalkboard-user"></i></div>
              <div>
                <div className={style.infoLabel}>Instructor</div>
                <div className={style.infoValue}>{course.instructorId?.name || "Unknown"}</div>
              </div>
            </div>
            
            <div className={style.infoRow}>
              <div className={style.infoIcon}><i className="fa-solid fa-clock"></i></div>
              <div>
                <div className={style.infoLabel}>Duration</div>
                <div className={style.infoValue}>{course.duration} Hours</div>
              </div>
            </div>
            
            <div className={style.infoRow}>
              <div className={style.infoIcon}><i className="fa-solid fa-language"></i></div>
              <div>
                <div className={style.infoLabel}>Language</div>
                <div className={style.infoValue}>{course.language}</div>
              </div>
            </div>

            <div className={style.infoRow}>
              <div className={style.infoIcon}><i className="fa-solid fa-layer-group"></i></div>
              <div>
                <div className={style.infoLabel}>Level</div>
                <div className={style.infoValue}>{course.level}</div>
              </div>
            </div>

            <div className={style.infoRow}>
              <div className={style.infoIcon}><i className="fa-regular fa-calendar-check"></i></div>
              <div>
                <div className={style.infoLabel}>Last Updated</div>
                <div className={style.infoValue}>{new Date(course.updatedAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          <div className={style.contentCard}>
            <h2 className={style.sectionTitle}>
              <i className="fa-solid fa-list-ul" style={{ color: '#5151D3' }}></i> Course Curriculum
            </h2>
            
            {!isPurchased ? (
              <div className={style.emptyContent}>
                <i className="fa-solid fa-lock" style={{ fontSize: '2.5rem', marginBottom: '12px', color: '#cbd5e1' }}></i>
                <p>Course content is locked.</p>
                <span style={{ fontSize: '0.9rem' }}>Purchase this course to unlock access to all video materials.</span>
              </div>
            ) : loadingContent ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status"></div>
                <div className="mt-2 text-muted fw-bold">Loading curriculum...</div>
              </div>
            ) : courseContent.length === 0 ? (
              <div className={style.emptyContent}>
                No video content has been uploaded to this course yet.
              </div>
            ) : (
              <div className={style.videoList}>
                {courseContent.map((content, index) => (
                  <div key={content._id} className={style.videoItem} onClick={() => handleVideoClick(content)}>
                    <img src={logo} alt="Thumbnail" className={style.videoThumbnail} />
                    <div className={style.videoDetails}>
                      <div className={style.videoTitle}>
                        {index + 1}. {content.title}
                      </div>
                      <div className={style.videoDate}>
                        Added {new Date(content.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={style.playIcon}>
                      <i className="fa-solid fa-play"></i>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right Column: Sticky Action Card ── */}
        <div>
          <div className={style.actionCard}>
            <img 
              src={course.image || "https://picsum.photos/400/250"} 
              alt={course.title} 
              className={style.cardImage} 
            />
            
            <div className={style.cardBody}>
              <div className={style.priceRow}>
                <span className={style.priceLabel}>Price:</span>
                <span className={style.priceValue}>${parseFloat(course.price).toFixed(2)}</span>
              </div>
              
              <p className={style.courseDesc}>
                {course.description}
              </p>

              <button
                className={`${style.actionBtn} ${isPurchased ? style.btnPurchased : isInCart ? style.btnCart : ''}`}
                onClick={!isInCart && !isPurchased ? handleAddToCart : undefined}
                disabled={isInCart || isPurchased || addloading}
              >
                {isPurchased ? (
                  <><i className="fa-solid fa-circle-check"></i> Purchased</>
                ) : isInCart ? (
                  <><i className="fa-solid fa-cart-arrow-down"></i> In Cart</>
                ) : addloading ? (
                  <><i className="fa-solid fa-spinner fa-spin"></i> Adding...</>
                ) : (
                  <><i className="fa-solid fa-cart-plus"></i> Add to Cart</>
                )}
              </button>

              <div className={style.actionsSecondary}>
                <button 
                  className={`${style.favoriteBtn} ${isFavorite ? style.active : ''}`}
                  onClick={toggleFavorite}
                >
                  <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton style={{ borderBottom: 'none', padding: '24px 24px 0' }}>
            <Modal.Title style={{ fontWeight: 800, color: '#1e293b' }}>{selectedVideo.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: '24px' }}>
            <video 
              controls 
              className="w-100" 
              style={{ borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', background: '#000' }}
              controlsList="nodownload"
            >
              <source src={selectedVideo.media} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: 'none', padding: '0 24px 24px' }}>
            <Button variant="secondary" onClick={handleCloseModal} style={{ borderRadius: '8px', fontWeight: 600 }}>
              Close Video
            </Button>
          </Modal.Footer>
        </Modal>
      )}

    </div>
  );
}

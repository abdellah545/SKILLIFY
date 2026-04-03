import React, { useCallback, useEffect, useState } from "react";
import style from "./Home.module.css";
import { Link } from "react-router-dom";
import HomeImage from "../../assets/home-page.png";
import { getCookie } from "../../Helper/CookiesHelper";
import baseURL from "../../BaseURL/BaseURL";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = useCallback(() => {
    document.title = "SKILLIFY | Home";
    const url = `${baseURL}/users/courses`;
    const token = getCookie("AccessTokenStudent");
    
    // We fetch courses regardless of being logged in or not if it's the home page, 
    // but we pass auth header if available.
    axios
      .get(url, {
        headers: token ? {
          "Content-Type": "application/json",
          Authorization: "SHA " + token,
        } : {},
      })
      .then((response) => {
        setCourses(response.data.searchResults || []);
      })
      .catch((error) => {
        console.error("There was an error fetching courses!", error);
      });
  }, []);

  function handleGetStarted() {
    window.location.pathname = "/categories";
  }

  const sliderSettings = {
    dots: false,
    infinite: courses.length > 3,
    slidesToShow: Math.min(courses.length || 3, 3), // don't show more than we have
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(courses.length || 2, 2) } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const reviewSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    rtl: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className={style.pageWrapper}>
      <div className={style.contentContainer}>
        
        {/* ── HERO SECTION ── */}
        <section className={style.heroSection}>
          <div className={style.heroContent}>
            <div className={style.heroBadge}>
              <i className="fa-solid fa-star"></i> 4.9/5 from over 25,000 students
            </div>
            <h1 className={style.heroTitle}>
              Master New Skills on <span>Your Own Schedule</span>
            </h1>
            <p className={style.heroSubtitle}>
              Learn from the comfort of your home. Our courses are designed to help you grow on your own terms — anytime, anywhere.
            </p>
            <div className={style.heroButtons}>
              <button className={style.primaryBtn} onClick={handleGetStarted}>
                Explore Courses
              </button>
              <Link to="/register" className={style.secondaryBtn}>
                Join for Free
              </Link>
            </div>
          </div>

          <div className={style.heroVisual}>
            {/* Highly reduced image size as requested */}
            <img src={HomeImage} alt="Skillify Platform" className={style.heroImage} />
            
            {/* Floating decoration cards */}
            <div className={`${style.floatingCard} ${style.cardTopLeft}`}>
              <div className={`${style.floatingIcon} ${style.iconBlue}`}>
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div className={style.floatingText}>
                <strong>+1,000</strong>
                <span>Expert Courses</span>
              </div>
            </div>
            
            <div className={`${style.floatingCard} ${style.cardBottomRight}`}>
              <div className={`${style.floatingIcon} ${style.iconOrange}`}>
                <i className="fa-regular fa-bell"></i>
              </div>
              <div className={style.floatingText}>
                <strong>Live Class</strong>
                <span>Starting in 10m</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES SECTION ── */}
        <section className={style.featuresSection} id="offer">
          <div className={style.sectionHeader}>
            <span className={style.sectionBadge}>Our Features</span>
            <h2 className={style.sectionTitle}>Why Choose SKILLIFY?</h2>
            <p className={style.sectionDesc}>
              Experience interactive learning with rich content, live classes, and a vibrant community — all in one accessible platform.
            </p>
          </div>

          <div className={style.featuresGrid}>
            <div className={style.featureCard}>
              <div className={style.featureIcon}><i className="fa-solid fa-video"></i></div>
              <h3 className={style.featureTitle}>Audio & Video</h3>
              <p className={style.featureDesc}>
                Choose your preferred way of learning for maximum effectiveness and understanding with our HD lectures.
              </p>
            </div>
            <div className={style.featureCard}>
              <div className={style.featureIcon}><i className="fa-solid fa-laptop-file"></i></div>
              <h3 className={style.featureTitle}>Virtual Classroom</h3>
              <p className={style.featureDesc}>
                Join live interactive sessions with expert instructors and peers in a real-time virtual environment.
              </p>
            </div>
            <div className={style.featureCard}>
              <div className={style.featureIcon}><i className="fa-solid fa-users"></i></div>
              <h3 className={style.featureTitle}>Group Learning</h3>
              <p className={style.featureDesc}>
                Collaborate with peers who share your passion for learning, work on group projects, and grow together.
              </p>
            </div>
          </div>
        </section>

        {/* ── POPULAR COURSES SECTION ── */}
        {courses.length > 0 && (
          <section className={style.sliderSection}>
            <div className={style.sectionHeader}>
              <span className={style.sectionBadge}>Trending Now</span>
              <h2 className={style.sectionTitle}>Popular Courses</h2>
              <p className={style.sectionDesc}>The most enrolled and highly rated courses on our platform right now.</p>
            </div>
            
            <Slider {...sliderSettings}>
              {courses.map((course, index) => (
                <div key={index} style={{ padding: "0 15px" }}>
                  <div className={style.courseCard}>
                    <div className={style.courseImgWrapper}>
                      <img src={course.image || "https://picsum.photos/400/225"} alt={course.title} className={style.courseImg} />
                    </div>
                    <div className={style.courseContent}>
                      <h3 className={style.courseTitle}>{course.title}</h3>
                      <p className={style.courseDesc}>{course.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </section>
        )}

        {/* ── TESTIMONIALS SECTION ── */}
        <section className={style.sliderSection}>
          <div className={style.sectionHeader}>
            <span className={style.sectionBadge}>Student Voices</span>
            <h2 className={style.sectionTitle}>What Our Alumni Say</h2>
          </div>
          
          <Slider {...reviewSettings}>
            {[
              { name: "Sarah Johnson", location: "Web Designer", review: "SKILLIFY transformed my career. The courses are top-notch and the instructors are world-class. Highly recommended!" },
              { name: "Andrew Chris", location: "Software Engineer", review: "An incredible learning platform. The virtual classroom experience felt just like being there in person. Amazing!" },
              { name: "Maria Garcia", location: "Data Analyst", review: "I got certified in 3 months! The structured curriculum and mentor support made all the difference in my journey." },
              { name: "James Wilson", location: "Digital Marketer", review: "Best investment I've made in my education. The content quality and platform experience are second to none." },
              { name: "Ahmed Youssef", location: "Frontend Developer", review: "The platform is incredibly smooth, and the live sessions are very beneficial." },
            ].map((review, i) => (
              <div key={i} style={{ padding: "0 15px" }}>
                <div className={style.testimonialCard}>
                  <div className={style.stars}>★★★★★</div>
                  <p className={style.quote}>"{review.review}"</p>
                  <h4 className={style.authorName}>{review.name}</h4>
                  <p className={style.authorLocation}>{review.location}</p>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* ── CTA / STATS SECTION ── */}
        <section className={style.ctaSection}>
          <div className={style.statsGrid}>
            <div className={style.statItem}>
              <div className={style.statNumber}>25K+</div>
              <div className={style.statLabel}>Active Students</div>
            </div>
            <div className={style.statItem}>
              <div className={style.statNumber}>1M+</div>
              <div className={style.statLabel}>Video Lectures</div>
            </div>
            <div className={style.statItem}>
              <div className={style.statNumber}>95%</div>
              <div className={style.statLabel}>Got Certified</div>
            </div>
          </div>
          
          <div className={style.ctaContent}>
            <h2>Ready to start your new career?</h2>
            <button className={style.btnGetStarted} onClick={handleGetStarted}>
              Start Learning Today
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

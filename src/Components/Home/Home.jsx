import React, { useCallback, useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import HomeImage from "../../assets/home-page.png";
import Swal from "sweetalert2";
import { cookieExists, getCookie } from "../../Helper/CookiesHelper";
import baseURL from "../../BaseURL/BaseURL";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "animate.css";


export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = useCallback(() => {
    document.title = "SKILLIFY | Home";
    const url = `${baseURL}/users/courses/?page=1&limit=6`;
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "SHA " + getCookie("AccessTokenStudent"),
        },
      })
      .then((response) => {
        setCourses(response.data.searchResults);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        Swal.fire("Error", "Failed to fetch courses", "error");
      });
  }, []);
  function handleGetStarted() {
    if (cookieExists("AccessTokenStudent")) {
      window.location.pathname = "/categories";
    } else {
      Swal.fire("Error", "Please login to continue", "error");
    }
  }

  return (
    <div className="main__page position-relative">
      <div className="main-page p-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-6 col-md-8 col-sm-10 p-3 d-flex align-items-center flex-column justify-content-evenly">
              <h1 className="text-center animate__animated animate__bounceInLeft">LEARN ON YOUR OWN SCHEDULE</h1>
              <h3 className="text-center animate__animated animate__bounceInLeft animate__delay-1s">
                Learn from the comfort of your home. Our courses are designed to
                help you learn on your own schedule.
              </h3>

              <a className="home-btn animate__animated animate__bounceInUp animate__delay-2s" href="#offer">
                Get Started
              </a>
            </div>
            <div className="col-lg-6 col-md-8 col-sm-10 p-3">
              <img src={HomeImage} className="img-fluid animate__animated animate__pulse animate__slower animate__infinite" alt="" />
            </div>
          </div>

          {/* <div className="row justify-content-center mb-5" id="offer">
            <div className="col-lg-2 col-md-4 co-sm-4 mb-1">
              <div className="btns d-flex justify-content-center align-items-center">
                <svg
                  id="khan-academy-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="52.652"
                  height="70.308"
                  viewBox="0 0 82.652 90.308"
                >
                  <path
                    id="Path_536"
                    data-name="Path 536"
                    d="M5.247,18.711A11.509,11.509,0,0,0,0,27.74V62.567A11.509,11.509,0,0,0,5.247,71.6L36.063,89.074a11.779,11.779,0,0,0,10.494,0L77.4,71.6a11.508,11.508,0,0,0,5.247-9.029V27.74A11.508,11.508,0,0,0,77.4,18.711L46.589,1.233a11.777,11.777,0,0,0-10.494,0Z"
                    fill="#14bf96"
                  />
                  <path
                    id="Path_537"
                    data-name="Path 537"
                    d="M93.325,111.527c-17.109,0-29.893,14.382-29.893,32.021v.742H60v-.742c0-17.639-12.72-31.957-29.957-32.021v3.225a31.95,31.95,0,0,0,20.353,30.054A32.891,32.891,0,0,0,61.81,146.87a33.424,33.424,0,0,0,11.512-2.064,31.983,31.983,0,0,0,20.322-30.054C93.485,113.72,93.421,112.623,93.325,111.527Z"
                    transform="translate(-20.341 -75.015)"
                    fill="#fff"
                  />
                  <ellipse
                    id="Ellipse_75"
                    data-name="Ellipse 75"
                    cx="9.54"
                    cy="9.674"
                    rx="9.54"
                    ry="9.674"
                    transform="translate(31.801 18.518)"
                    fill="#fff"
                  />
                </svg>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 co-sm-4 mb-1">
              <div className="btns d-flex justify-content-center align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100.492"
                  height="62.328"
                  viewBox="0 0 146.492 82.328"
                >
                  <path
                    id="edx"
                    d="M38.814,36.752A10.065,10.065,0,0,1,39.3,39.9q-.008.706-.067,1.41H20.918a17.046,17.046,0,0,1,1.6-3.931,12.192,12.192,0,0,1,2.38-3.034,10.153,10.153,0,0,1,3.07-1.959A9.546,9.546,0,0,1,31.6,31.7a7.968,7.968,0,0,1,3.351.659,6.919,6.919,0,0,1,2.4,1.782A7.465,7.465,0,0,1,38.814,36.752ZM72.043,34.31a7.361,7.361,0,0,0-2.661-1.862,9.034,9.034,0,0,0-3.54-.659,10.246,10.246,0,0,0-4.822,1.16,11.915,11.915,0,0,0-3.852,3.223A15.931,15.931,0,0,0,54.6,41.1a20.173,20.173,0,0,0-.94,6.281,11.955,11.955,0,0,0,.61,3.913,9.094,9.094,0,0,0,1.709,3.052,7.7,7.7,0,0,0,2.631,1.972,8.1,8.1,0,0,0,3.418.708A9.866,9.866,0,0,0,66.9,55.789a12.667,12.667,0,0,0,3.9-3.382,16.541,16.541,0,0,0,2.6-5.042,20.256,20.256,0,0,0,.94-6.25,11.835,11.835,0,0,0-.6-3.882,8.576,8.576,0,0,0-1.7-2.924Zm74.448-15.553L131.855,87.584H65.476L69.29,70.176H0L13.593,5.256H96.465l-2.82,13.5ZM44.936,40.591A15.32,15.32,0,0,0,43.9,34.768,12.629,12.629,0,0,0,41.115,30.5a11.909,11.909,0,0,0-4.083-2.649,13.55,13.55,0,0,0-4.938-.9A16.663,16.663,0,0,0,25,28.444a16.041,16.041,0,0,0-5.561,4.242,20.109,20.109,0,0,0-3.62,6.574,26.527,26.527,0,0,0-1.294,8.5,15.789,15.789,0,0,0,1.08,6.043,12.269,12.269,0,0,0,7.312,7.154,15.223,15.223,0,0,0,5.323.922,19.815,19.815,0,0,0,5.4-.7,15.564,15.564,0,0,0,4.321-1.941,11.692,11.692,0,0,0,3.082-2.93A11.231,11.231,0,0,0,42.8,52.677H37.075a7.807,7.807,0,0,1-3.1,3.131,10.9,10.9,0,0,1-5.39,1.16,9.162,9.162,0,0,1-3.034-.519,7.337,7.337,0,0,1-2.71-1.672,8.606,8.606,0,0,1-1.959-2.991,11.677,11.677,0,0,1-.751-4.431q0-.439.018-.842c.012-.269.024-.549.049-.842h24.33c.061-.311.116-.7.159-1.141l.122-1.379q.108-1.276.128-2.557ZM75.675,61.3,85.7,14.131H80.216L76.054,33.767h-.5A8.581,8.581,0,0,0,74.161,31a9.522,9.522,0,0,0-2.289-2.161A10.9,10.9,0,0,0,68.9,27.443a11.78,11.78,0,0,0-3.461-.5,15.3,15.3,0,0,0-8.851,2.783,17.652,17.652,0,0,0-3.51,3.259,20.585,20.585,0,0,0-2.71,4.273,23.957,23.957,0,0,0-1.74,5.133,27.22,27.22,0,0,0-.61,5.811,15.767,15.767,0,0,0,.971,5.67,12.947,12.947,0,0,0,2.649,4.321,11.455,11.455,0,0,0,3.9,2.741,11.871,11.871,0,0,0,4.761.958A13.345,13.345,0,0,0,70.945,56.7h.5l-.971,4.6h5.2Zm37.331-8.484,21.839-25.178h-12.22l-13.331,16.5h-.659l-7.05-16.5H89.226l10.6,23.976-22.877,27.1H89.006L103.692,61.3h.989l7.935,17.408H124.75l-11.744-25.9Z"
                    transform="translate(0 -5.256)"
                  />
                </svg>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 co-sm-4 mb-3">
              <div className="btns d-flex justify-content-center align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="155.21"
                  height="32.67"
                  viewBox="0 0 242.21 36.67"
                >
                  <g id="coursera" transform="translate(-0.665 -0.424)">
                    <path
                      id="Path_529"
                      data-name="Path 529"
                      d="M234.624,13.587a12.7,12.7,0,0,1,2.763-7.563V3.407h-2.119c-4.284,0-7.91,1.777-10.018,5.793h-.123V3.849H214.139V36.482h10.989V23.309c0-5.591,1.511-9.855,7.609-9.855a13.745,13.745,0,0,1,1.886.133Z"
                      transform="translate(-112.224 -1.452)"
                      fill="#717172"
                    />
                    <path
                      id="Path_530"
                      data-name="Path 530"
                      d="M411.759,13.466a19.683,19.683,0,0,1,4.317-7.514V3.4h-2.115c-4.286,0-7.908,1.777-10.027,5.79h-.119V3.847H392.822V36.48h10.994V23.306c0-5.591,1.516-9.855,7.614-9.855l.33.015Z"
                      transform="translate(-206.158 -1.449)"
                      fill="#717172"
                    />
                    <path
                      id="Path_531"
                      data-name="Path 531"
                      d="M279.4,11.642a13.158,13.158,0,0,0-5.932-1.59c-1.261,0-3.438.568-3.438,2.226,0,2.229,3.438,2.544,4.958,2.87,5.122,1.078,9,3.625,9,9.66,0,8.585-7.43,12.159-14.622,12.159a23.131,23.131,0,0,1-12.5-3.756l3.986-8.085c2.232,1.661,5.977,3.309,8.695,3.309,1.39,0,3.442-.7,3.442-2.479,0-2.544-3.442-2.678-6.89-3.63s-6.876-2.731-6.876-8.585c0-8.017,6.876-11.574,13.654-11.574a23.5,23.5,0,0,1,10.2,2.1L279.4,11.642Z"
                      transform="translate(-134.685 -0.849)"
                      fill="#717172"
                    />
                    <path
                      id="Path_532"
                      data-name="Path 532"
                      d="M471.3,35.872H460.315v-3.63h-.121c-1.933,3.244-5.746,4.705-9.363,4.705-9.186,0-15.643-8.08-15.643-17.432s6.342-17.362,15.52-17.362a12.35,12.35,0,0,1,9.606,4.258V3.24H471.3l0,32.633ZM446.543,19.586c0,4.132,2.6,7.313,7.064,7.313s7.058-3.176,7.058-7.313c0-4.008-2.59-7.378-7.058-7.378s-7.064,3.37-7.064,7.378Z"
                      transform="translate(-228.429 -0.842)"
                      fill="#717172"
                    />
                    <path
                      id="Path_533"
                      data-name="Path 533"
                      d="M351.354,21.506H328.216c0,4.7,2.362,7.245,6.889,7.245a5.435,5.435,0,0,0,5.255-2.989h10.572c-1.752,7.7-8.7,11.2-15.764,11.2-10.261,0-17.93-6.111-17.93-17.364,0-10.877,7.058-17.427,17.143-17.427,10.749,0,16.977,7,16.977,18.126l0,1.212Zm-10.209-6.684a6.517,6.517,0,0,0-12.745,0Z"
                      transform="translate(-166.423 -0.849)"
                      fill="#717172"
                    />
                    <path
                      id="Path_534"
                      data-name="Path 534"
                      d="M66.961,18.176c-.011-.282-.029-.556-.049-.835v-.01a18.913,18.913,0,0,0-2.738-8.42,18.186,18.186,0,0,0-2.4-3.108,17.389,17.389,0,0,0-4.528-3.38,18.163,18.163,0,0,0-8.433-2c-.3,0-.606,0-.917.017a19,19,0,0,0-6.116,1.311A17.135,17.135,0,0,0,36.75,4.733c-.283.243-.59.541-.919.869l-.238.253-.325.374h0l-.152.163-.074.087-.388.442c-.287.35-.561.7-.816,1.042l0,0-.009-.01a18.031,18.031,0,0,0-1.384,2.073c-.244.418-.484.847-.713,1.277l-3.169,6.936,0,0-.166.352-.35.767a31.857,31.857,0,0,1-2.272,4.292,8.241,8.241,0,0,1-6.647,3.28c-.188,0-.381-.01-.579-.022A8.335,8.335,0,0,1,14.3,25.632q-.2-.127-.384-.262a7.5,7.5,0,0,1-2.362-2.821,8.493,8.493,0,0,1-.9-4.093c0-.039,0-.073,0-.1a7.636,7.636,0,0,1,2.5-5.567,8.717,8.717,0,0,1,1.231-.954q.091-.058.182-.109A7.934,7.934,0,0,1,18.7,10.662l.487.015a8.105,8.105,0,0,1,5.925,2.581L29.9,3.947a18.375,18.375,0,0,0-3.866-2.124c-.054-.022-.11-.046-.166-.066-.17-.066-.339-.134-.514-.194A19.131,19.131,0,0,0,20.611.523h0c-.04-.007-.085-.012-.126-.017-.251-.017-.507-.051-.758-.063-.274-.012-.549-.017-.819-.019h-.155a18.14,18.14,0,0,0-8.37,2,17.535,17.535,0,0,0-6.912,6.48,18.99,18.99,0,0,0-2.79,9.265c-.011.286-.018.571-.018.85a17.673,17.673,0,0,0,4.7,12.241,17.433,17.433,0,0,0,12.62,5.8c.327.015.65.024.973.024a18.722,18.722,0,0,0,7.953-1.668,17.7,17.7,0,0,0,1.774-.964c.323-.2.628-.415.931-.643l.224-.163.377-.279a14.787,14.787,0,0,0,1.29-1.139l.144-.148c.242-.25.484-.5.713-.762l.859-1.051.327-.444.152-.243.153-.238c1.276-2.321,5.43-10.768,5.43-10.768v-.017l.247-.515.206-.4a30.642,30.642,0,0,1,1.639-2.964l.016-.027a8.618,8.618,0,0,1,6.481-3.928A8.22,8.22,0,0,1,56.961,18.1a8.427,8.427,0,0,1-7.733,8.944,8.59,8.59,0,0,1-2.792-.192l-.022.01c-3.407-.767-5.575-3.457-6.645-4.659L35.3,31.1a27.45,27.45,0,0,0,2.339,2.272,17.472,17.472,0,0,0,3.167,1.959,18.446,18.446,0,0,0,7.841,1.763c.332,0,.265,0,.61-.015a18.284,18.284,0,0,0,12.918-5.968,17.458,17.458,0,0,0,4.8-12.018v-.138c0-.257-.009-.517-.018-.779Z"
                      transform="translate(0 0)"
                      fill="#717172"
                    />
                    <path
                      id="Path_535"
                      data-name="Path 535"
                      d="M159.49,38a21.306,21.306,0,0,1-6.3-.874,12.108,12.108,0,0,1-4.831-2.765,12.493,12.493,0,0,1-3.1-4.819,20.217,20.217,0,0,1-1.09-7.038V4.254h10.6v18.1a6.217,6.217,0,0,0,1.357,4.465,4.612,4.612,0,0,0,3.451,1.394,4.777,4.777,0,0,0,3.476-1.3c.888-.867,1.337-2.3,1.337-4.324V4.254h10.6v18a20.7,20.7,0,0,1-1.115,7.23,12.57,12.57,0,0,1-3.137,4.87,12.343,12.343,0,0,1-4.9,2.765A21.843,21.843,0,0,1,159.49,38Z"
                      transform="translate(-75.44 -1.863)"
                      fill="#717172"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 co-sm-4 mb-3">
              <div className="btns d-flex justify-content-center align-items-center">
                <svg
                  id="linkedin-linked-in"
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="55"
                  viewBox="0 0 84 84"
                >
                  <path
                    id="Path_538"
                    data-name="Path 538"
                    d="M60.375,0H23.625A23.527,23.527,0,0,0,0,23.625v36.75A23.527,23.527,0,0,0,23.625,84h36.75A23.527,23.527,0,0,0,84,60.375V23.625A23.527,23.527,0,0,0,60.375,0Z"
                    fill="#0097d3"
                  />
                  <path
                    id="Path_539"
                    data-name="Path 539"
                    d="M20.625,60.9c0,1.677-.975,2.795-2.437,2.795H8.438C6.975,63.69,6,62.572,6,60.9V27.358c0-1.677.975-2.795,2.438-2.795h9.75c1.463,0,2.438,1.118,2.438,2.795ZM13.313,21.769C9.169,21.769,6,18.135,6,13.384S9.169,5,13.313,5s7.313,3.633,7.313,8.384S17.456,21.769,13.313,21.769ZM54.75,60.9c0,1.677-.975,2.795-2.437,2.795H45c-1.463,0-2.437-1.118-2.437-2.795V42.729c0-2.236-1.706-4.192-3.656-4.192s-3.656,1.956-3.656,4.192V60.9c0,1.677-.975,2.795-2.438,2.795H25.5c-1.462,0-2.437-1.118-2.437-2.795V27.358c0-1.677.975-2.795,2.438-2.795h9.75a2.092,2.092,0,0,1,1.706.838,12.214,12.214,0,0,1,4.387-.838c7.313,0,13.406,6.987,13.406,15.371Z"
                    transform="translate(11.625 5.142)"
                    fill="#fff"
                  />
                </svg>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 co-sm-4 mb-3">
              <div className="btns d-flex justify-content-center align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="88.87"
                  height="65.59"
                  viewBox="0 0 98.87 77.59"
                >
                  <path
                    id="udemy"
                    d="M97.137,47.09a2.8,2.8,0,0,0-1.143-.555,55.4,55.4,0,0,1-8.24,6.63,8.248,8.248,0,0,1-3.911,1.17c-2.428,0-3.46-2.153-3.751-5.662q-.8-9.507-.708-19.028c0-8.89-2.141-14.967-7.739-15.428l-.742-.047c-3.426,0-5.116,1.692-7.288,5.983-1.9,3.706-4.829,9.061-10.217,19.3A137.068,137.068,0,0,1,38.978,61.423a17.625,17.625,0,0,1-3.219,3.154,3.42,3.42,0,0,1-1.82.555c-1.77,0-3.09-1.415-3.491-4.77a19.636,19.636,0,0,1-.161-2.723c0-6.89,2.719-18.1,7.4-34.563,3.426-12.014,1.98-20.213-5.518-20.213h-.111A7.2,7.2,0,0,0,27.6,4.527c-1.353.983-2.672,3.184-3.958,6.137-1.4,3.308-9.961,19.811-23.638,28.349a6.216,6.216,0,0,0,5.648,6.813c3.491.322,6-1.093,9.219-3.184l-.661,2.877c-.837,3.385-1.514,6.8-2.061,10.23-1.9,16.55,6.068,24.7,15.417,24.7a18.421,18.421,0,0,0,4.65-.6C42.516,77.377,52.4,66.042,64.143,39.97a73.443,73.443,0,0,0-.049,7.953c.788,14.967,6.921,19.412,15.658,19.412,6.6,0,12.729-3.26,15.865-7.369a14.1,14.1,0,0,0,3.25-8.615,5.547,5.547,0,0,0-1.739-4.262Z"
                    transform="translate(0.003 -2.864)"
                  />
                </svg>
              </div>
            </div>
          </div> */}
          <hr />
          <div className="row my-5 offer" id="offer">
            <h1 style={{ color: "#5151d3" }}>What we offer ?</h1>
            <h3>
              Learners interaction and collaboration on content like courses,
              presentations, podcasts and tests as well as content management
              for eLearning providers.
            </h3>
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div class="Audio w-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width=""
                    height="100"
                    viewBox="0 0 100 100"
                    style={{ margin: "auto" }}
                  >
                    <g
                      id="Group_1066"
                      data-name="Group 1066"
                      transform="translate(-300.44 -1337)"
                    >
                      <rect
                        id="Fill"
                        width="100"
                        height="100"
                        rx="50"
                        transform="translate(300.44 1337)"
                        fill="#8484ff"
                        opacity="0.1"
                      />
                      <g
                        id="video-library"
                        transform="translate(325.749 1362.309)"
                      >
                        <path
                          id="Path_516"
                          data-name="Path 516"
                          d="M38.507,10.125A4.8,4.8,0,0,0,33.782,4.5H9.2a4.8,4.8,0,0,0-4.725,5.625"
                          transform="translate(3.007 3.125)"
                          fill="none"
                          stroke="#5151d3"
                          stroke-width="3"
                        />
                        <path
                          id="Path_517"
                          data-name="Path 517"
                          d="M31.3,7.625c.064-.583.1-.874.1-1.115a4.5,4.5,0,0,0-4.02-4.484C27.141,2,26.847,2,26.261,2H11.6c-.586,0-.88,0-1.119.026A4.5,4.5,0,0,0,6.457,6.51c0,.241.032.532.1,1.115"
                          transform="translate(5.571 0)"
                          fill="none"
                          stroke="#5151d3"
                          stroke-width="3"
                        />
                        <path
                          id="Path_518"
                          data-name="Path 518"
                          d="M45.185,29.034c-.787,5.582-1.18,8.373-3.2,10.044s-5,1.671-10.951,1.671H17.965c-5.955,0-8.932,0-10.951-1.671S4.6,34.616,3.815,29.034l-.952-6.75c-1-7.118-1.505-10.677.627-12.981S9.42,7,17.013,7H31.987C39.58,7,43.377,7,45.51,9.3c1.685,1.82,1.725,4.423,1.173,8.946"
                          transform="translate(0 6.25)"
                          fill="none"
                          stroke="#5151d3"
                          stroke-linecap="round"
                          stroke-width="3"
                        />
                        <path
                          id="Path_519"
                          data-name="Path 519"
                          d="M20.308,16.373a2.166,2.166,0,0,1,0,3.574l-7.586,4.7A1.842,1.842,0,0,1,10,22.863V13.457a1.842,1.842,0,0,1,2.722-1.787Z"
                          transform="translate(10 11.763)"
                          fill="none"
                          stroke="#5151d3"
                          stroke-width="3"
                        />
                      </g>
                    </g>
                  </svg>
                  <h2 class="my-2 fw-bold">Audio & Video</h2>
                  <hr className="w-50" />
                  <h4>
                    Choose your preferable way of Learning for more
                    effectiveness and understanding.
                  </h4>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div class="Audio w-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width=""
                    height="100"
                    viewBox="0 0 100 100"
                    style={{ margin: "auto" }}
                  >
                    <g
                      id="Group_1067"
                      data-name="Group 1067"
                      transform="translate(-622.44 -1337)"
                    >
                      <rect
                        id="Fill"
                        width="100"
                        height="100"
                        rx="50"
                        transform="translate(622.44 1337)"
                        fill="#8484ff"
                        opacity="0.1"
                      />
                      <g
                        id="virtual-machine"
                        transform="translate(650 1364.111)"
                      >
                        <g id="Group_1073" data-name="Group 1073">
                          <path
                            id="Path_520"
                            data-name="Path 520"
                            d="M28.125,45H0V16.875H9.375V0H37.5V9.375H45V37.5H28.125ZM3.75,41.25H24.375V37.5h-7.5V28.125h-7.5v-7.5H3.75Zm24.375-7.5H41.25V13.125H37.5v15H28.125Zm-7.5,0h3.75V28.125h-3.75Zm7.5-9.375H33.75V13.125H20.625v3.75h7.5Zm-7.5,0h3.75v-3.75h-3.75Zm-7.5,0h3.75v-3.75h-3.75Zm0-7.5h3.75v-7.5H33.75V3.75H13.125Z"
                            fill="#5151d3"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <h2 class="my-2 fw-bold">Virtual Classroom</h2>
                  <hr className="w-50" />
                  <h4>
                    The key distinction of a virtual classroom is that it takes
                    place in a live environment.
                  </h4>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div class="Audio w-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width=""
                    height="100"
                    viewBox="0 0 100 100"
                    style={{ margin: "auto" }}
                  >
                    <g
                      id="Group_1068"
                      data-name="Group 1068"
                      transform="translate(-944.21 -1336.677)"
                    >
                      <rect
                        id="Fill"
                        width="100"
                        height="100"
                        rx="50"
                        transform="translate(944.21 1336.677)"
                        fill="#8484ff"
                        opacity="0.1"
                      />
                      <g id="group" transform="translate(963.867 1356.659)">
                        <path
                          id="Path_521"
                          data-name="Path 521"
                          d="M33.4,28.779c5.808,0,8.847-8.37,8.847-12.857,0-5.283-3.97-9.581-8.847-9.581s-8.85,4.3-8.85,9.581C24.546,20.408,27.585,28.779,33.4,28.779ZM33.4,9.7c2.98,0,5.4,2.787,5.4,6.227s-2.415,9.5-5.4,9.5S28,19.36,28,15.922,30.414,9.7,33.4,9.7Z"
                          transform="translate(-2.934 0)"
                          fill="#5151d3"
                        />
                        <path
                          id="Path_522"
                          data-name="Path 522"
                          d="M41.148,39.977a3.561,3.561,0,0,0-3.868-.066,9.43,9.43,0,0,1-10.041.009,3.545,3.545,0,0,0-3.868.108c-4.449,3.105-7.106,10.724-7.106,16.394a3.32,3.32,0,0,0,3.452,3.252H44.806a3.32,3.32,0,0,0,3.452-3.252C48.256,50.752,45.6,43.082,41.148,39.977ZM19.715,56.32c0-5.031,2.255-11.287,5.668-13.668a12.98,12.98,0,0,0,13.751,0c3.413,2.381,5.67,8.637,5.67,13.668Z"
                          transform="translate(-1.8 -5.333)"
                          fill="#5151d3"
                        />
                        <path
                          id="Path_523"
                          data-name="Path 523"
                          d="M29.916,47.218a9.471,9.471,0,0,1-1.528-.767.883.883,0,0,0-.967.026c-2.644,1.847-3.825,4.548-3.825,8.757a.863.863,0,0,0,1.726,0c0-3.405.8-5.555,2.663-7.063a11.269,11.269,0,0,0,1.286.6.872.872,0,0,0,1.124-.465A.83.83,0,0,0,29.916,47.218Z"
                          transform="translate(-2.804 -6.455)"
                          fill="#5151d3"
                        />
                        <path
                          id="Path_524"
                          data-name="Path 524"
                          d="M34.513,48.137c-.289,0-.575-.015-.858-.04a.855.855,0,0,0-.939.758.846.846,0,0,0,.78.912c.336.03.674.047,1.017.047a.839.839,0,1,0,0-1.677Z"
                          transform="translate(-4.054 -6.741)"
                          fill="#5151d3"
                        />
                        <path
                          id="Path_525"
                          data-name="Path 525"
                          d="M56.958,40.772a1.88,1.88,0,0,0-1.656-.045,15.876,15.876,0,0,1-1.529.428c-.576.146-1.074.262-1.423.392a1.649,1.649,0,0,0-1.007,2.147,1.732,1.732,0,0,0,2.223.954c.176-.065.671-.242,1.07-.34.465-.118.866-.324,1.21-.422,2.7,2.091,4.773,7.6,5.3,10.95H56.272a1.678,1.678,0,1,0,0,3.354H63a1.542,1.542,0,0,0,1.726-1.471C64.724,51.923,61.7,43.452,56.958,40.772Z"
                          transform="translate(-6.591 -5.524)"
                          fill="#5151d3"
                        />
                        <path
                          id="Path_526"
                          data-name="Path 526"
                          d="M14.854,43.693a1.67,1.67,0,0,0-1.01-2.165,1.569,1.569,0,0,1-.378-.256,5.6,5.6,0,0,0-.9-.609,1.767,1.767,0,0,0-1.663-.012C6.159,43.333,3.133,51.905,3.133,56.7a1.542,1.542,0,0,0,1.726,1.47h3.4a1.678,1.678,0,1,0,0-3.354H6.713c.51-3.354,2.481-8.56,5.07-10.766a4.232,4.232,0,0,0,.847.626A1.741,1.741,0,0,0,14.854,43.693Z"
                          transform="translate(0 -5.507)"
                          fill="#5151d3"
                        />
                        <path
                          id="Path_527"
                          data-name="Path 527"
                          d="M18.6,32.422a4.745,4.745,0,0,0,.57.033,6.4,6.4,0,0,0,5.268-2.886,1.647,1.647,0,0,0-.479-2.325,1.758,1.758,0,0,0-2.393.465,2.831,2.831,0,0,1-2.547,1.384,1.74,1.74,0,0,0-.28-.022c-1.328,0-3.669-4.524-3.669-7.825,0-2.509,1.646-4.55,3.669-4.55a1.678,1.678,0,1,0,0-3.354c-3.926,0-7.121,3.546-7.121,7.9C11.614,25.145,14.262,32.273,18.6,32.422Z"
                          transform="translate(-1.162 -1.13)"
                          fill="#5151d3"
                        />
                        <path
                          id="Path_528"
                          data-name="Path 528"
                          d="M43.384,27.242a1.647,1.647,0,0,0-.479,2.325,6.394,6.394,0,0,0,5.268,2.886,4.75,4.75,0,0,0,.571-.033c4.335-.149,6.983-7.278,6.983-11.177,0-4.358-3.195-7.9-7.121-7.9a1.678,1.678,0,1,0,0,3.354c2.023,0,3.669,2.041,3.669,4.55,0,3.3-2.341,7.825-3.669,7.825a1.852,1.852,0,0,0-.281.022,2.823,2.823,0,0,1-2.547-1.384A1.757,1.757,0,0,0,43.384,27.242Z"
                          transform="translate(-5.41 -1.13)"
                          fill="#5151d3"
                        />
                      </g>
                    </g>
                  </svg>
                  <h2 class="my-2 fw-bold">Group Learning</h2>
                  <hr className="w-50" />
                  <h4>
                    Be in collection of persons who are emotionally,
                    intellectually, and aesthetically.
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h1 className="text-center">Popular courses</h1>
          <h5 className="text-center">
            The most joined courses on our website.
          </h5>
          <div className="row my-5">
            <Carousel>
              {courses.map((course, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={course.image}
                    alt={course.title}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                  <Carousel.Caption>
                    <h3 className="fw-bold">{course.title}</h3>
                    <p className="">{course.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <hr />
          <div className="row">
            <h1>Choose your preferable subscription</h1>
            <h3 class="mb-5">We offer you different kind of packages.</h3>

            <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center mb-3">
              <div class="starter d-flex flex-column align-items-center">
                <h3 className="p-2">For Starter 59$</h3>

                <ul>
                  <li>
                    <p>Feedback Categorization</p>
                  </li>
                  <li>
                    <p>Features Prioritization</p>
                  </li>
                  <li>
                    <p>Real-Time Collaboration</p>
                  </li>
                  <li>
                    <p>Feedback Loop Notifications</p>
                  </li>
                  <li>
                    <p>Essential Dev Tools Integrations</p>
                  </li>
                </ul>
                <button class="btn_starter px-2">Purchase Package</button>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
              <div class="starter_2 d-flex flex-column align-items-center">
                <h3 className="p-2 text-white">For Teams 149$</h3>

                <ul>
                  <li>
                    <p>Feedback Categorization</p>
                  </li>
                  <li>
                    <p>Features Prioritization</p>
                  </li>
                  <li>
                    <p>Real-Time Collaboration</p>
                  </li>
                  <li>
                    <p>Feedback Loop Notifications</p>
                  </li>
                  <li>
                    <p>Essential Dev Tools Integrations</p>
                  </li>
                </ul>
                <button class="btn_starter_2 px-2">Purchase Package</button>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center mb-3">
              <div class="starter d-flex flex-column align-items-center">
                <h3 className="p-2">For Company 299$</h3>

                <ul>
                  <li>
                    <p>Feedback Categorization</p>
                  </li>
                  <li>
                    <p>Feedback Loop Notifications</p>
                  </li>
                  <li>
                    <p>Essential Dev Tools Integrations</p>
                  </li>
                </ul>
                <button class="btn_starter_3 px-2">Purchase Package</button>
              </div>
            </div>
          </div>
          <hr />
          <h1>What Our Students Say About Us?</h1>
          <h3 class="mb-5">
            The most commonly used method for evaluating and getting feedback
            onteaching.
          </h3>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="star text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="101.001"
                  height="17"
                  viewBox="0 0 101.001 17"
                >
                  <g id="Review" transform="translate(-669 -4496)">
                    <path
                      id="Star_1"
                      data-name="Star 1"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(669 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_2"
                      data-name="Star 2"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(689.659 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_3"
                      data-name="Star 3"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(710.32 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_4"
                      data-name="Star 4"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(730.977 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_5"
                      data-name="Star 5"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(751.637 4496)"
                      fill="#fbb040"
                    />
                  </g>
                </svg>
                <p class="py-3">
                  Certainty say suffering his him collected intention promotion.
                  Hill sold ham men made lose case. Views abode law heard jokes
                  too.
                </p>
                <h5>Andrew Chris</h5>
                <p>Client from Uganda</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="star text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="101.001"
                  height="17"
                  viewBox="0 0 101.001 17"
                >
                  <g id="Review" transform="translate(-669 -4496)">
                    <path
                      id="Star_1"
                      data-name="Star 1"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(669 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_2"
                      data-name="Star 2"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(689.659 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_3"
                      data-name="Star 3"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(710.32 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_4"
                      data-name="Star 4"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(730.977 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_5"
                      data-name="Star 5"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(751.637 4496)"
                      fill="#fbb040"
                    />
                  </g>
                </svg>
                <p class="py-3">
                  Certainty say suffering his him collected intention promotion.
                  Hill sold ham men made lose case. Views abode law heard jokes
                  too.
                </p>
                <h5>Andrew Chris</h5>
                <p>Client from Uganda</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="star text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="101.001"
                  height="17"
                  viewBox="0 0 101.001 17"
                >
                  <g id="Review" transform="translate(-669 -4496)">
                    <path
                      id="Star_1"
                      data-name="Star 1"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(669 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_2"
                      data-name="Star 2"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(689.659 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_3"
                      data-name="Star 3"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(710.32 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_4"
                      data-name="Star 4"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(730.977 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_5"
                      data-name="Star 5"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(751.637 4496)"
                      fill="#fbb040"
                    />
                  </g>
                </svg>
                <p class="py-3">
                  Certainty say suffering his him collected intention promotion.
                  Hill sold ham men made lose case. Views abode law heard jokes
                  too.
                </p>
                <h5>Andrew Chris</h5>
                <p>Client from Uganda</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="star text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="101.001"
                  height="17"
                  viewBox="0 0 101.001 17"
                >
                  <g id="Review" transform="translate(-669 -4496)">
                    <path
                      id="Star_1"
                      data-name="Star 1"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(669 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_2"
                      data-name="Star 2"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(689.659 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_3"
                      data-name="Star 3"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(710.32 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_4"
                      data-name="Star 4"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(730.977 4496)"
                      fill="#fbb040"
                    />
                    <path
                      id="Star_5"
                      data-name="Star 5"
                      d="M9.182,0l2.3,6.322,6.887.171L12.9,10.572,14.857,17,9.182,13.2,3.507,17l1.961-6.428L0,6.493l6.887-.171Z"
                      transform="translate(751.637 4496)"
                      fill="#fbb040"
                    />
                  </g>
                </svg>
                <p class="py-3">
                  Certainty say suffering his him collected intention promotion.
                  Hill sold ham men made lose case. Views abode law heard jokes
                  too.
                </p>
                <h5>Andrew Chris</h5>
                <p>Client from Uganda</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 contain mb-5">
              <div class="content px-5 pt-5">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12 text-center">
                    <h2>
                      25,356 <br />
                      <p>Students</p>
                    </h2>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 text-center">
                    <h2>
                      1M+ <br />
                      <p>Photo&Video</p>
                    </h2>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 text-center">
                    <h2>
                      95% <br />
                      <p>Got Certificates</p>
                    </h2>
                  </div>
                </div>
              </div>
              <div class="con_head text-center">
                <h2>Want to start your career With us?</h2>
                <div class="d-flex justify-content-center">
                  <button class="btn_getstart mb-5" onClick={handleGetStarted}>
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

import React, { useEffect, useState } from "react";
import style from "./AdminDashboard.module.css";
import LeftSidebar from "./LeftSidebar";
// import RightSidebar from "./RightSidebar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import baseURL from "../../BaseURL/BaseURL";
import { Link } from "react-router-dom";
import { getCookie } from "../../Helper/CookiesHelper";

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  const handleGetApplications = async () => {
    try {
      const res = await axios.get(`${baseURL}/admin/applications`, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "SHA_ADMIN " + getCookie("AccessTokenAdmin"),
        },
      });
      setApplications(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetApplications();
  }, []);

  return (
    <>
      <div className={`${style.padding} position-relative ${style.content}`}>
        <div className="row">
          <div className="col-lg-2 d-none d-lg-block p-0">
            <LeftSidebar />
          </div>

          <div className={`col-lg-10 col-md-12 p-0`}>
            <div className={`${style.scrollableContainer} py-5`}>
              <div className="row text-center">
                <button
                  className={`d-lg-none w-50 mx-auto mb-3 ${style.toggle_left_btn}`}
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#leftOffcanvas"
                  aria-controls="leftOffcanvas"
                >
                  Side Bar
                </button>
                <TableContainer
                  component={Paper}
                  sx={{
                    width: "70%",
                    margin: "auto",
                    borderRadius: "15px",
                    boxShadow: "0 0 10px 0 #5151D3",
                  }}
                >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="start"
                          sx={{
                            fontWeight: "bold",
                            color: "#5151D3",
                            width: "30%",
                            fontSize: "24px",
                          }}
                        >
                          Submits
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: "bold",
                            color: "#5151D3",
                            width: "20%",
                            fontSize: "24px",
                          }}
                        >
                          ID
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {applications.map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }} // Updated for vertical stacking
                          >
                            {" "}
                            {/* Encapsulating avatar and name */}
                            <Avatar sx={{ bgcolor: "#5151D3" }}>
                              {row.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <span
                              style={{
                                marginLeft: "24px",
                                fontSize: "20px",
                                color: "#5151D3",
                                fontWeight: "bold",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Link
                                to={`/instructor/${row._id}`}
                                style={{ color: "#5151D3" }}
                              >
                                {row.name}
                              </Link>{" "}
                              {!row.rejected ? (
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                  }}
                                >
                                  Rejected
                                </span>
                              ) : (
                                <>
                                  <span
                                    style={{
                                      color: "green",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Accepted
                                  </span>
                                </>
                              )}
                              {/* Date below name */}
                              <span style={{ color: "gray" }}>
                                {formatDate(row.createdAt)}
                              </span>
                            </span>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              color: "#5151D3",
                            }}
                          >
                            <h6
                              style={{
                                textAlign: "center",
                                border: "1px solid #5151D3",
                                borderRadius: "5px",
                                fontSize: "17px",
                                padding: "0 10px",
                              }}
                            >
                              {row._id}
                            </h6>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className={`d-lg-none ${style.toggle_left_btn}`}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#leftOffcanvas"
        aria-controls="leftOffcanvas"
      >
        <i class="fa-solid fa-right-long fs-4"></i>
      </button>

      <div
        className="offcanvas offcanvas-start"
        data-bs-backdrop="static"
        tabIndex="-1"
        id="leftOffcanvas"
        aria-labelledby="leftOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <LeftSidebar />
        </div>
      </div>
      {/* <button
        className={`d-lg-none ${style.toggle_right_btn}`}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#rightOffcanvas"
        aria-controls="rightOffcanvas"
      >
        <i class="fa-solid fa-left-long fs-4"></i>
      </button> */}
    </>
  );
}

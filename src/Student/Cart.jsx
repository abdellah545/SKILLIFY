import axios from "axios";
import React, { useEffect, useState } from "react";
import baseURL from "../BaseURL/BaseURL";
import Swal from "sweetalert2";
import "../Components/loading.css";
import { getCookie, setCookie } from "../Helper/CookiesHelper";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "SKILLIFY | Cart";
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/users/cart`, {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "SHA " + getCookie("AccessTokenStudent"),
          },
        });
        setCart(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, []);

  const removeCourseFromCart = async (courseId) => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${baseURL}/users/cart/${courseId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "SHA " + getCookie("AccessTokenStudent"),
        },
      });
      // Retrieve the existing cart from sessionStorage
      const currentCart = JSON.parse(getCookie("cart") || "[]");

      // Filter out the removed course ID
      const updatedCart = currentCart.filter((id) => id !== courseId);

      // Update the cart in sessionStorage
      setCookie("cart", JSON.stringify(updatedCart));

      // Update local state to re-render the component
      const updatedCartDetails = cart.cart.filter(
        (item) => item._id !== courseId
      );
      setCart({ ...cart, cart: updatedCartDetails });
      Swal.fire("Success", "Course removed from cart successfully", "success");
      setDeleteLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setError("Failed to remove the course");
      // Optionally refresh the cart details or show a more specific error
      console.error(err);
      setDeleteLoading(false);
    }
  };

  if (loading)
    return (
      <div className="redirect">
        <div class="loader"></div>
      </div>
    ); // Loading message
  if (error) return <div>Error: {error.message}</div>;
  if (!cart || cart.cart.length === 0)
    return (
      <div className="text-center fs-1 fw-bold d-flex justify-content-center">
        No course found!
      </div>
    );

  const handleCheckout = async () => {
    setSuccess(true);
    try {
      const response = await axios.get(`${baseURL}/users/cart/checkout`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "SHA " + getCookie("AccessTokenStudent"),
        },
      });
      // Assuming checkout is successful, add course IDs to 'courses' in sessionStorage
      const courseIds = cart.cart.map((item) => item._id); // Extract course IDs from cart
      const existingCourses = JSON.parse(
        getCookie("courses") || "[]"
      );
      const updatedCourses = [...new Set([...existingCourses, ...courseIds])]; // Combine and remove duplicates
      setCookie("courses", JSON.stringify(updatedCourses));
      // Set the cart in sessionStorage to an empty array after a successful checkout
      setCookie("cart", JSON.stringify([]));
      setSuccess(false);

      window.location.replace(response.data); // Redirect to Stripe Checkout = response.data;
    } catch (err) {
      console.error(err);
      setSuccess(false);
    }
  };

  return (
    <>
      <div className="container-fluid my-5">
        <h1 className="fw-bold" style={{ color: "#5151D3" }}>
          Shopping Cart
        </h1>
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12">
            <hr />
            {cart.cart.map((item) => (
              <div key={item._id} className="card mb-3">
                <div className="row g-0">
                  <div
                    className="col-md-4"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundPosition: "center",
                      objectFit: "cover",
                      backgroundSize: "cover",
                      boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      src={item.image}
                      className="img-fluid rounded"
                      alt={item.title}
                      style={{
                        objectFit: "cover",
                        height: "250px",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5
                        className="card-title fw-bold fs-1"
                        style={{ color: "#5151D3" }}
                      >
                        {item.title}
                      </h5>
                      <p className="card-text fs-4">{item.description}</p>
                      <p className="card-text fs-3">
                        Price:{" "}
                        <span style={{ color: "#5151D3" }}>${item.price}</span>
                      </p>
                      <div className="text-end">
                        <button
                          className="btn btn-danger"
                          onClick={() => removeCourseFromCart(item._id)}
                        >
                          {deleteloading ? "Removing..." : "Remove from cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <hr />
            <div
              className="card text-center p-5"
              style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" }}
            >
              <h3 className="fw-bold mb-5" style={{ color: "#5151D3" }}>
                Total: <span className="text-black">${cart.totalPrice}</span>
              </h3>
              <button
                className="btn btn-primary w-75 mx-auto fw-bold mb-3 py-3"
                onClick={handleCheckout}
              >
                {success ? "Processing..." : "Checkout"}
              </button>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
}

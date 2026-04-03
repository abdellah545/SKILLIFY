import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseURL from "../BaseURL/BaseURL";
import Swal from "sweetalert2";
import style from "./Cart.module.css";
import { getCookie, setCookie } from "../Helper/CookiesHelper";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [removingCourseId, setRemovingCourseId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "SKILLIFY | Cart";
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/users/cart`, {
          headers: {
            Authorization: "SHA " + getCookie("AccessTokenStudent"),
          },
        });
        setCart(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, []);

  const removeCourseFromCart = async (courseId) => {
    setRemovingCourseId(courseId);
    try {
      await axios.delete(`${baseURL}/users/cart/${courseId}`, {
        headers: {
          Authorization: "SHA " + getCookie("AccessTokenStudent"),
        },
      });

      const currentCart = JSON.parse(getCookie("cart") || "[]");
      const updatedCart = currentCart.filter((id) => id !== courseId);
      setCookie("cart", JSON.stringify(updatedCart));

      setCart(prev => ({
        ...prev,
        cart: prev.cart.filter((item) => item._id !== courseId),
        totalPrice: prev.totalPrice - (prev.cart.find(i => i._id === courseId)?.price || 0)
      }));

      Swal.fire({
        icon: "success",
        title: "Removed",
        text: "Course removed from cart smoothly.",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      setError("Failed to remove the course");
      Swal.fire("Error", "Failed to remove the course", "error");
    } finally {
      setRemovingCourseId(null);
    }
  };

  const handleCheckout = async () => {
    setSuccess(true);
    try {
      const response = await axios.get(`${baseURL}/users/cart/checkout`, {
        headers: {
          Authorization: "SHA " + getCookie("AccessTokenStudent"),
        },
      });
      
      const courseIds = cart.cart.map((item) => item._id);
      const existingCourses = JSON.parse(getCookie("courses") || "[]");
      const updatedCourses = [...new Set([...existingCourses, ...courseIds])];
      
      setCookie("courses", JSON.stringify(updatedCourses));
      setCookie("cart", JSON.stringify([]));
      
      window.location.replace(response.data); 
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to proceed to checkout", "error");
    } finally {
      setSuccess(false);
    }
  };

  if (loading) {
    return (
      <div className={style.pageContainer} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="spinner-border" style={{ width: "4rem", height: "4rem", color: "#5151D3" }} role="status"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.pageContainer}>
        <div className="alert alert-danger text-center fw-bold" style={{ borderRadius: 16 }}>Oops! {error.message || error}</div>
      </div>
    );
  }

  const isEmpty = !cart || cart.cart.length === 0;

  return (
    <div className={style.pageContainer}>
      <div className={style.pageHeader}>
        <h1 className={style.pageTitle}>Shopping Cart</h1>
        <p className={style.pageSubtitle}>{isEmpty ? "Your cart is empty." : "Review your courses and proceed to checkout."}</p>
      </div>

      <div className={style.cartLayout}>
        {/* ── Left side: Cart Items ── */}
        <div className={style.cartList}>
          {isEmpty ? (
            <div className={style.emptyState}>
              <div style={{ fontSize: "4rem", marginBottom: 16 }}>🛒</div>
              <h4 style={{ fontWeight: 800, color: "#1e293b", marginBottom: 8 }}>Your cart is empty</h4>
              <p style={{ color: "#64748b", marginBottom: 24 }}>Looks like you haven't added any courses yet.</p>
              <Link to="/categories" className="btn" style={{ background: "#5151D3", color: "white", padding: "12px 32px", borderRadius: 12, fontWeight: 700 }}>
                Browse Courses
              </Link>
            </div>
          ) : (
            cart.cart.map((item) => (
              <div key={item._id} className={style.cartItem}>
                <Link to={`/courseDetails/${item._id}`}>
                  <img src={item.image} alt={item.title} className={style.itemImage} />
                </Link>
                <div className={style.itemDetails}>
                  <Link to={`/courseDetails/${item._id}`} style={{ textDecoration: 'none' }}>
                    <h3 className={style.itemTitle}>{item.title}</h3>
                  </Link>
                  <p className={style.itemDesc}>{item.description}</p>
                  
                  <div className={style.itemFooter}>
                    <div className={style.itemPrice}>${item.price}</div>
                    <button
                      className={style.removeBtn}
                      onClick={() => removeCourseFromCart(item._id)}
                      disabled={removingCourseId === item._id}
                    >
                      {removingCourseId === item._id ? (
                        <><i className="fa-solid fa-spinner fa-spin"></i> Removing...</>
                      ) : (
                        <><i className="fa-solid fa-trash-can"></i> Remove</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Right side: Summary ── */}
        <div>
          <div className={style.summaryCard}>
            <h3 className={style.summaryTitle}>Order Summary</h3>
            <div className={style.summaryRow}>
              <span>Items</span>
              <span>{isEmpty ? 0 : cart.cart.length}</span>
            </div>
            <div className={style.summaryTotalRow}>
              <span className={style.summaryTotalLabel}>Total</span>
              <span className={style.summaryTotalValue}>${isEmpty ? "0.00" : parseFloat(cart.totalPrice).toFixed(2)}</span>
            </div>
            <button
              className={style.checkoutBtn}
              onClick={handleCheckout}
              disabled={isEmpty || success}
            >
              {success ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Processing...</>
              ) : (
                <>Checkout <i className="fa-solid fa-arrow-right"></i></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

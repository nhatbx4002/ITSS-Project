import React, { useState, useEffect } from "react";
import styles from "./updateMembership.module.css";
import { useRouter, usePathname } from "next/navigation";

interface Member {
  _id?: string;
  full_name?: string;
  subscription?: {
    user_id?: string;
    membership_id?: string;
    name?: string;
    type?: string;
    duration?: number;
    price?: number;
    status?: string;
  };
  // Các trường khác có thể được thêm vào khi cần
}

const validMemberships = [
  { type: "vip", duration: 30, price: 42 },
  { type: "vip", duration: 90, price: 113 },
  { type: "vip", duration: 180, price: 208 },
  { type: "vip", duration: 365, price: 375 },

  { type: "standard", duration: 30, price: 25 },
  { type: "standard", duration: 90, price: 63 },
  { type: "standard", duration: 180, price: 113 },
  { type: "standard", duration: 365, price: 208 },

  { type: "personal_training", duration: 30, price: 84 },
  { type: "personal_training", duration: 90, price: 229 },
  { type: "personal_training", duration: 180, price: 417 },
  { type: "personal_training", duration: 365, price: 750 },
];

const UpdateMembership = ({ 
  userSubscription, 
  userId: propUserId,
  member,
  onClose 
}: {
  userSubscription?: any;
  userId?: string;
  member?: Member;
  onClose?: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // Lấy userId từ member nếu có, nếu không thì lấy từ các nguồn khác
  const memberId = member?._id;
  
  // Ưu tiên lấy userId theo thứ tự: memberId, userSubscription, propUserId
  const userId = memberId || userSubscription?.user_id || propUserId;
  
  // Kiểm tra và log userId ngay từ đầu
  useEffect(() => {
    console.log("Current userId:", userId);
    console.log("From member:", memberId);
    console.log("From userSubscription:", userSubscription?.user_id);
    console.log("From props:", propUserId);
  }, [userId, memberId, userSubscription, propUserId]);

  const [formData, setFormData] = useState({
    name: "",
    type: "standard",
    duration: "30",
    price: "25",
    status: "active",
  });

  useEffect(() => {
    // Nếu có member object, sử dụng thông tin từ đó
    if (member && member._id) {
      console.log("Đang sử dụng thông tin từ member object:", member);
      
      // Lấy thông tin subscription từ member nếu có
      const subscription = member.subscription || {};
      const membership = member.membership || subscription.membership || {};
      
      setFormData({
        name: membership.name || "",
        type: membership.type || "standard",
        duration: membership.duration ? membership.duration.toString() : "30",
        price: membership.price ? membership.price.toString() : "25",
        status: subscription.status || "active",
      });
    } 
    // Nếu có userSubscription, sử dụng thông tin từ đó
    else if (userSubscription) {
      setFormData({
        name: userSubscription.name || "",
        type: userSubscription.type || "standard",
        duration: userSubscription.duration ? userSubscription.duration.toString() : "30",
        price: userSubscription.price ? userSubscription.price.toString() : "0",
        status: userSubscription.status || "active",
      });
    } 
    // Nếu có userId, fetching thông tin từ API
    else if (userId) {
      const fetchMembership = async () => {
        try {
          console.log("Fetching membership cho userId:", userId);
          const res = await fetch(`http://localhost:5000/api/staff/subscriptions/${userId}`);
          if (!res.ok) throw new Error("Failed to fetch membership data");

          const data = await res.json();
          console.log("Fetched membership data:", data);

          setFormData({
            name: data.name || "",
            type: data.type || "standard",
            duration: data.duration ? data.duration.toString() : "30",
            price: data.price ? data.price.toString() : "0",
            status: data.status || "active",
          });
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };

      fetchMembership();
    } else {
      console.error("Không có thông tin hợp lệ để lấy membership");
    }
  }, [userId, userSubscription, member]);

  useEffect(() => {
    const found = validMemberships.find(
      (item) =>
        item.type === formData.type && item.duration === Number(formData.duration)
    );
    if (found && formData.price !== found.price.toString()) {
      setFormData((prev) => ({
        ...prev,
        price: found.price.toString(),
      }));
    }
  }, [formData.type, formData.duration]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpdate = async () => {
    try {
      if (!userId) {
        throw new Error("Không tìm thấy ID người dùng để cập nhật membership");
      }
      
      console.log("Đang cập nhật membership cho userId:", userId);

      const res = await fetch(`http://localhost:5000/api/staff/subscriptions/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          duration: Number(formData.duration),
          price: Number(formData.price),
          status: formData.status,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Không thể cập nhật membership");
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      if (onClose) {
        onClose(); // Đóng modal nếu được cung cấp hàm onClose
      } else {
        router.back(); // Quay lại nếu không có hàm onClose
      }
    } catch (error: any) {
      alert("Lỗi khi cập nhật membership: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className={styles["form-container"]}>
      <button 
        className={styles["close-btn"]} 
        onClick={onClose || (() => router.back())}
      >
        ×
      </button>

      <h2 className={styles["form-title"]}>Membership Details</h2>
      
      {userId ? (
        <>
          <div className={styles["form-section"]}>
            <div className={styles["info-label"]}>Information:</div>

            <div className={styles["form-row"]}>
              <div className={styles["field-label"]}>Name</div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles["field-input"]}
              />
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["field-label"]}>Type</div>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={styles["field-input"]}
              >
                <option value="standard">Standard</option>
                <option value="vip">VIP</option>
                <option value="personal_training">Personal Training</option>
              </select>
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["field-label"]}>Duration</div>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={styles["field-input"]}
              >
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">365 days</option>
              </select>
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["field-label"]}>Price</div>
              <input
                type="text"
                name="price"
                value={formData.price}
                readOnly
                className={styles["field-input"]}
              />
            </div>
          </div>

          <div className={styles["form-section"]}>
            <div className={styles["form-row"]}>
              <div className={styles["field-label"]}>Status</div>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={styles["field-input"]}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className={styles["button-group"]}>
            <button className={styles["update-btn"]} onClick={handleUpdate}>
              Update
            </button>
          </div>

          {showSuccess && (
            <div className={styles.toastSuccess}>
              Cập nhật membership thành công!
            </div>
          )}
        </>
      ) : (
        <div className={styles["error-message"]}>
          Không tìm thấy ID người dùng. Vui lòng quay lại và thử lại.
        </div>
      )}
    </div>
  );
};

export default UpdateMembership;

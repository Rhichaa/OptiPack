import { useNavigate } from "react-router-dom";

export default function BackButton({ fallback = "/app" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1) || navigate(fallback)}
      style={{
        border: "none",
        background: "transparent",
        color: "#4f46e5",
        fontSize: "14px",
        cursor: "pointer",
        marginBottom: "10px"
      }}
    >
      ← Back
    </button>
  );
}

import { useState } from "react";

export default function StarRating({ value, onChange, readonly = false }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1,2,3,4,5].map(n => (
        <span key={n} className={`star ${n <= (hover || value) ? "filled" : "empty"}`}
          onClick={() => !readonly && onChange && onChange(n)}
          onMouseEnter={() => !readonly && setHover(n)}
          onMouseLeave={() => !readonly && setHover(0)}
          style={{ cursor: readonly ? "default" : "pointer" }}>★</span>
      ))}
    </div>
  );
}

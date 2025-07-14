import { useRef } from "react";

const useScrollX = () => {
  const ref = useRef(null);

  const scroll = (direction, amount = 300) => {
    if (ref.current) {
      // scrollBy : 수평 방향으로 부드럽게 스크롤
      ref.current.scrollBy({
        left: direction === "left" ? -amount : amount, // 왼쪽은 음수, 오른쪽은 양수
        behavior: "smooth", // 부드러운 애니메이션 효과
      });
    }
  };

  return { ref, scroll };
};

export default useScrollX;

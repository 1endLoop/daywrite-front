import { useRef, useState } from "react";
import useClickOutside from "./useClickOutside.js";

const useDropdown = () => {
  const [dropdownInfo, setDropdownInfo] = useState(null);
  const dropdownRef = useRef(null);

  const openDropdown = (e, item) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownInfo({
      x: rect.left,
      y: rect.bottom,
      item,
    });
  };

  const closeDropdown = () => setDropdownInfo(null);

  // 외부 클릭 시 닫히기
  useClickOutside(dropdownRef, closeDropdown);

  return {
    dropdownInfo,
    dropdownRef,
    openDropdown,
    closeDropdown,
  };
};

export default useDropdown;

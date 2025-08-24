import React from "react";
import './footer.css'
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <footer>
        {i18n.language === "en" && "Designed and developed by Housam Hegazy" }
        {i18n.language === "ar" && <p dir="rtl">تم التصميم بواسطة حسام حجازي </p> }
        <span>&#129505;</span>
      </footer>
    </>
  );
};

export default Footer;

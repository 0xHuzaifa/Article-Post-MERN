import React from "react";
import { useSelector } from "react-redux";

export default function authentication() {
  const { isLogin } = useSelector((state) => state.auth);
  
  return <div>auth</div>;
}

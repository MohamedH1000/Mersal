import React from "react";
interface EmptyState {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}
const EmptyState = () => {
  return <div>لا يوجد شاليهات للعرض الان</div>;
};

export default EmptyState;

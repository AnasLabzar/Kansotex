declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = "G-QCEK4WZ2HV";

// Track pageviews
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Generic event tracking
export const event = ({
  action,
  category,
  label,
  value,
  params,
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  params?: Record<string, any>;
}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...params,
    });
  }
};

// Advanced Pro & E-Commerce Event Helpers
export const trackAddToCart = (item: {
  id?: string;
  name: string;
  price: number;
  quantity?: number;
}) => {
  event({
    action: "add_to_cart",
    category: "ecommerce",
    label: item.name,
    value: item.price,
    params: {
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
        },
      ],
    },
  });
};

export const trackRequestQuote = (company?: string) => {
  event({
    action: "request_quote",
    category: "b2b_pro",
    label: company || "Pro Quote Request",
  });
};

export const trackProLogin = (email: string) => {
  event({
    action: "pro_login",
    category: "auth",
    label: email,
  });
};

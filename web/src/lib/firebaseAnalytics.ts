import { analytics } from "./firebase";
import {
  logEvent as firebaseLogEvent,
  setUserId,
  setUserProperties,
  setCurrentScreen,
  Analytics,
} from "firebase/analytics";

// Frontend Analytics Event Names
export const FRONTEND_EVENTS = {
  // Page Views
  PAGE_VIEW: "page_view",

  // User Interactions
  BUTTON_CLICK: "button_click",
  FORM_SUBMIT: "form_submit",
  SEARCH_PERFORMED: "search_performed",

  // Restaurant Interactions
  RESTAURANT_VIEW: "restaurant_view",
  RESTAURANT_SELECT: "restaurant_select",
  MENU_VIEW: "menu_view",

  // Item Interactions
  ITEM_VIEW: "item_view",
  ITEM_ADD_TO_CART: "item_add_to_cart",
  ITEM_REMOVE_FROM_CART: "item_remove_from_cart",
  ITEM_CUSTOMIZE: "item_customize",

  // Cart Interactions
  CART_VIEW: "cart_view",
  CART_UPDATE: "cart_update",
  CART_CLEAR: "cart_clear",

  // Checkout Process
  CHECKOUT_START: "checkout_start",
  CHECKOUT_STEP: "checkout_step",
  PAYMENT_METHOD_SELECT: "payment_method_select",

  // User Account
  PROFILE_VIEW: "profile_view",
  ADDRESS_ADD: "address_add",
  ADDRESS_EDIT: "address_edit",

  // Error Tracking
  ERROR_OCCURRED: "error_occurred",
  API_ERROR: "api_error",

  // Performance
  LOAD_TIME: "load_time",
  INTERACTION_TIME: "interaction_time",
} as const;

// Frontend Analytics Service
export class FrontendAnalytics {
  private static instance: FrontendAnalytics;
  private analyticsInstance: Analytics | null = null;

  private constructor() {
    // Initialize analytics instance
    this.initializeAnalytics();
  }

  private async initializeAnalytics() {
    if (typeof window !== 'undefined') {
      try {
        const { isSupported, getAnalytics } = await import('firebase/analytics');
        const { app } = await import('./firebase');
        
        const supported = await isSupported();
        if (supported) {
          this.analyticsInstance = getAnalytics(app);
        }
      } catch (error) {
        console.warn('Failed to initialize analytics:', error);
      }
    }
  }

  public static getInstance(): FrontendAnalytics {
    if (!FrontendAnalytics.instance) {
      FrontendAnalytics.instance = new FrontendAnalytics();
    }
    return FrontendAnalytics.instance;
  }

  // Get analytics instance
  private getAnalytics(): Analytics | null {
    return this.analyticsInstance || analytics;
  }

  // Set user ID for tracking
  setUserId(userId: string) {
    const analyticsInstance = this.getAnalytics();
    if (analyticsInstance && userId) {
      setUserId(analyticsInstance, userId);
    }
  }

  // Set user properties
  setUserProperties(properties: Record<string, string>) {
    const analyticsInstance = this.getAnalytics();
    if (analyticsInstance) {
      setUserProperties(analyticsInstance, properties);
    }
  }

  // Set current screen
  setScreen(screenName: string) {
    const analyticsInstance = this.getAnalytics();
    if (analyticsInstance) {
      setCurrentScreen(analyticsInstance, screenName);
    }
  }

  // Log custom events
  logEvent(eventName: string, parameters?: Record<string, unknown>) {
    const analyticsInstance = this.getAnalytics();
    if (analyticsInstance) {
      firebaseLogEvent(analyticsInstance, eventName, parameters);
    }
  }

  // Page View Tracking
  logPageView(pageName: string, pagePath: string) {
    this.logEvent(FRONTEND_EVENTS.PAGE_VIEW, {
      page_name: pageName,
      page_path: pagePath,
      timestamp: new Date().toISOString(),
    });
  }

  // User Interaction Tracking
  logButtonClick(buttonName: string, pageName: string, elementId?: string) {
    this.logEvent(FRONTEND_EVENTS.BUTTON_CLICK, {
      button_name: buttonName,
      page_name: pageName,
      element_id: elementId,
      timestamp: new Date().toISOString(),
    });
  }

  logFormSubmit(formName: string, pageName: string, success: boolean) {
    this.logEvent(FRONTEND_EVENTS.FORM_SUBMIT, {
      form_name: formName,
      page_name: pageName,
      success,
      timestamp: new Date().toISOString(),
    });
  }

  logSearchPerformed(query: string, category?: string, resultsCount?: number) {
    this.logEvent(FRONTEND_EVENTS.SEARCH_PERFORMED, {
      search_query: query,
      category,
      results_count: resultsCount,
      timestamp: new Date().toISOString(),
    });
  }

  // Restaurant Tracking
  logRestaurantView(restaurantId: string, restaurantName: string) {
    this.logEvent(FRONTEND_EVENTS.RESTAURANT_VIEW, {
      restaurant_id: restaurantId,
      restaurant_name: restaurantName,
      timestamp: new Date().toISOString(),
    });
  }

  logRestaurantSelect(restaurantId: string, restaurantName: string) {
    this.logEvent(FRONTEND_EVENTS.RESTAURANT_SELECT, {
      restaurant_id: restaurantId,
      restaurant_name: restaurantName,
      timestamp: new Date().toISOString(),
    });
  }

  logMenuView(menuId: string, menuName: string, restaurantId: string) {
    this.logEvent(FRONTEND_EVENTS.MENU_VIEW, {
      menu_id: menuId,
      menu_name: menuName,
      restaurant_id: restaurantId,
      timestamp: new Date().toISOString(),
    });
  }

  // Item Tracking
  logItemView(
    itemId: string,
    itemName: string,
    category: string,
    price: number
  ) {
    this.logEvent(FRONTEND_EVENTS.ITEM_VIEW, {
      item_id: itemId,
      item_name: itemName,
      category,
      price,
      currency: "USD",
      timestamp: new Date().toISOString(),
    });
  }

  logItemAddToCart(
    itemId: string,
    itemName: string,
    quantity: number,
    price: number,
    size?: string
  ) {
    this.logEvent(FRONTEND_EVENTS.ITEM_ADD_TO_CART, {
      item_id: itemId,
      item_name: itemName,
      quantity,
      price,
      size,
      currency: "USD",
      timestamp: new Date().toISOString(),
    });
  }

  logItemRemoveFromCart(itemId: string, itemName: string, quantity: number) {
    this.logEvent(FRONTEND_EVENTS.ITEM_REMOVE_FROM_CART, {
      item_id: itemId,
      item_name: itemName,
      quantity,
      timestamp: new Date().toISOString(),
    });
  }

  logItemCustomize(
    itemId: string,
    customizationType: string,
    customizationValue: string
  ) {
    this.logEvent(FRONTEND_EVENTS.ITEM_CUSTOMIZE, {
      item_id: itemId,
      customization_type: customizationType,
      customization_value: customizationValue,
      timestamp: new Date().toISOString(),
    });
  }

  // Cart Tracking
  logCartView(itemCount: number, totalAmount: number) {
    this.logEvent(FRONTEND_EVENTS.CART_VIEW, {
      item_count: itemCount,
      total_amount: totalAmount,
      currency: "USD",
      timestamp: new Date().toISOString(),
    });
  }

  logCartUpdate(itemCount: number, totalAmount: number, action: string) {
    this.logEvent(FRONTEND_EVENTS.CART_UPDATE, {
      item_count: itemCount,
      total_amount: totalAmount,
      action,
      currency: "USD",
      timestamp: new Date().toISOString(),
    });
  }

  logCartClear() {
    this.logEvent(FRONTEND_EVENTS.CART_CLEAR, {
      timestamp: new Date().toISOString(),
    });
  }

  // Checkout Tracking
  logCheckoutStart(totalAmount: number, itemCount: number) {
    this.logEvent(FRONTEND_EVENTS.CHECKOUT_START, {
      total_amount: totalAmount,
      item_count: itemCount,
      currency: "USD",
      timestamp: new Date().toISOString(),
    });
  }

  logCheckoutStep(stepName: string, stepNumber: number) {
    this.logEvent(FRONTEND_EVENTS.CHECKOUT_STEP, {
      step_name: stepName,
      step_number: stepNumber,
      timestamp: new Date().toISOString(),
    });
  }

  logPaymentMethodSelect(paymentMethod: string) {
    this.logEvent(FRONTEND_EVENTS.PAYMENT_METHOD_SELECT, {
      payment_method: paymentMethod,
      timestamp: new Date().toISOString(),
    });
  }

  // User Account Tracking
  logProfileView() {
    this.logEvent(FRONTEND_EVENTS.PROFILE_VIEW, {
      timestamp: new Date().toISOString(),
    });
  }

  logAddressAdd(addressType: string) {
    this.logEvent(FRONTEND_EVENTS.ADDRESS_ADD, {
      address_type: addressType,
      timestamp: new Date().toISOString(),
    });
  }

  logAddressEdit(addressId: string) {
    this.logEvent(FRONTEND_EVENTS.ADDRESS_EDIT, {
      address_id: addressId,
      timestamp: new Date().toISOString(),
    });
  }

  // Error Tracking
  logError(errorType: string, errorMessage: string, pageName?: string) {
    this.logEvent(FRONTEND_EVENTS.ERROR_OCCURRED, {
      error_type: errorType,
      error_message: errorMessage,
      page_name: pageName,
      timestamp: new Date().toISOString(),
    });
  }

  logApiError(endpoint: string, statusCode: number, errorMessage: string) {
    this.logEvent(FRONTEND_EVENTS.API_ERROR, {
      endpoint,
      status_code: statusCode,
      error_message: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }

  // Performance Tracking
  logLoadTime(pageName: string, loadTimeMs: number) {
    this.logEvent(FRONTEND_EVENTS.LOAD_TIME, {
      page_name: pageName,
      load_time_ms: loadTimeMs,
      timestamp: new Date().toISOString(),
    });
  }

  logInteractionTime(interactionType: string, durationMs: number) {
    this.logEvent(FRONTEND_EVENTS.INTERACTION_TIME, {
      interaction_type: interactionType,
      duration_ms: durationMs,
      timestamp: new Date().toISOString(),
    });
  }
}

// Export singleton instance
export const frontendAnalytics = FrontendAnalytics.getInstance();

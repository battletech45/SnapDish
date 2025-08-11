import admin from "../service/firebaseService";
import logger from "./logger";

// Backend Analytics Event Names
export const BACKEND_EVENTS = {
  // Authentication Events
  USER_REGISTERED: "user_registered",
  USER_LOGIN: "user_login",
  USER_LOGOUT: "user_logout",
  AUTH_FAILED: "auth_failed",

  // Order Events
  ORDER_CREATED: "order_created",
  ORDER_UPDATED: "order_updated",
  ORDER_CANCELLED: "order_cancelled",
  ORDER_DELIVERED: "order_delivered",
  ORDER_FAILED: "order_failed",

  // Payment Events
  PAYMENT_PROCESSED: "payment_processed",
  PAYMENT_FAILED: "payment_failed",
  PAYMENT_REFUNDED: "payment_refunded",

  // Restaurant Events
  RESTAURANT_CREATED: "restaurant_created",
  RESTAURANT_UPDATED: "restaurant_updated",
  MENU_CREATED: "menu_created",
  MENU_UPDATED: "menu_updated",

  // Item Events
  ITEM_CREATED: "item_created",
  ITEM_UPDATED: "item_updated",
  ITEM_DELETED: "item_deleted",

  // API Events
  API_REQUEST: "api_request",
  API_ERROR: "api_error",
  API_RATE_LIMIT: "api_rate_limit",

  // System Events
  SYSTEM_ERROR: "system_error",
  DATABASE_ERROR: "database_error",
  EXTERNAL_API_ERROR: "external_api_error",

  // Business Events
  REVENUE_GENERATED: "revenue_generated",
  CUSTOMER_ACQUIRED: "customer_acquired",
  RESTAURANT_ONBOARDED: "restaurant_onboarded",
} as const;

// Backend Analytics Service
export class BackendAnalytics {
  private static instance: BackendAnalytics;
  private firestore: FirebaseFirestore.Firestore;

  private constructor() {
    this.firestore = admin.firestore();
  }

  public static getInstance(): BackendAnalytics {
    if (!BackendAnalytics.instance) {
      BackendAnalytics.instance = new BackendAnalytics();
    }
    return BackendAnalytics.instance;
  }

  // Log event to Firestore for analytics
  private async logToFirestore(
    eventName: string,
    parameters: Record<string, any>
  ) {
    try {
      const analyticsCollection = this.firestore.collection("analytics_events");
      await analyticsCollection.add({
        event_name: eventName,
        parameters,
        timestamp: admin.firestore.Timestamp.now(),
        environment: process.env.NODE_ENV || "development",
      });
    } catch (error) {
      logger.error("Error logging analytics event to Firestore:", error);
    }
  }

  // Log event to console and Firestore
  async logEvent(eventName: string, parameters: Record<string, any>) {
    try {
      // Log to console for development
      if (process.env.NODE_ENV === "development") {
        console.log("Backend Analytics Event:", {
          eventName,
          parameters,
          timestamp: new Date().toISOString(),
        });
      }

      // Log to Firestore for production analytics
      await this.logToFirestore(eventName, parameters);

      // You can also send to external analytics services here
      // await this.sendToExternalAnalytics(eventName, parameters);
    } catch (error) {
      logger.error("Error logging analytics event:", error);
    }
  }

  // Authentication Analytics
  async logUserRegistered(userId: string, method: string, userData: any) {
    await this.logEvent(BACKEND_EVENTS.USER_REGISTERED, {
      user_id: userId,
      registration_method: method,
      user_data: userData,
      timestamp: new Date().toISOString(),
    });
  }

  async logUserLogin(userId: string, method: string, success: boolean) {
    await this.logEvent(BACKEND_EVENTS.USER_LOGIN, {
      user_id: userId,
      login_method: method,
      success,
      timestamp: new Date().toISOString(),
    });
  }

  async logUserLogout(userId: string) {
    await this.logEvent(BACKEND_EVENTS.USER_LOGOUT, {
      user_id: userId,
      timestamp: new Date().toISOString(),
    });
  }

  async logAuthFailed(method: string, reason: string, ipAddress?: string) {
    await this.logEvent(BACKEND_EVENTS.AUTH_FAILED, {
      auth_method: method,
      failure_reason: reason,
      ip_address: ipAddress,
      timestamp: new Date().toISOString(),
    });
  }

  // Order Analytics
  async logOrderCreated(
    orderId: string,
    userId: string,
    restaurantId: string,
    orderData: any
  ) {
    await this.logEvent(BACKEND_EVENTS.ORDER_CREATED, {
      order_id: orderId,
      user_id: userId,
      restaurant_id: restaurantId,
      order_data: orderData,
      timestamp: new Date().toISOString(),
    });
  }

  async logOrderUpdated(
    orderId: string,
    userId: string,
    restaurantId: string,
    status: string,
    changes: any
  ) {
    await this.logEvent(BACKEND_EVENTS.ORDER_UPDATED, {
      order_id: orderId,
      user_id: userId,
      restaurant_id: restaurantId,
      status,
      changes,
      timestamp: new Date().toISOString(),
    });
  }

  async logOrderCancelled(
    orderId: string,
    userId: string,
    restaurantId: string,
    reason: string
  ) {
    await this.logEvent(BACKEND_EVENTS.ORDER_CANCELLED, {
      order_id: orderId,
      user_id: userId,
      restaurant_id: restaurantId,
      cancellation_reason: reason,
      timestamp: new Date().toISOString(),
    });
  }

  async logOrderDelivered(
    orderId: string,
    userId: string,
    restaurantId: string,
    deliveryTime: number
  ) {
    await this.logEvent(BACKEND_EVENTS.ORDER_DELIVERED, {
      order_id: orderId,
      user_id: userId,
      restaurant_id: restaurantId,
      delivery_time_minutes: deliveryTime,
      timestamp: new Date().toISOString(),
    });
  }

  async logOrderFailed(
    orderId: string,
    userId: string,
    restaurantId: string,
    reason: string
  ) {
    await this.logEvent(BACKEND_EVENTS.ORDER_FAILED, {
      order_id: orderId,
      user_id: userId,
      restaurant_id: restaurantId,
      failure_reason: reason,
      timestamp: new Date().toISOString(),
    });
  }

  // Payment Analytics
  async logPaymentProcessed(
    orderId: string,
    userId: string,
    amount: number,
    paymentMethod: string,
    transactionId?: string
  ) {
    await this.logEvent(BACKEND_EVENTS.PAYMENT_PROCESSED, {
      order_id: orderId,
      user_id: userId,
      amount,
      payment_method: paymentMethod,
      transaction_id: transactionId,
      currency: "USD",
      timestamp: new Date().toISOString(),
    });
  }

  async logPaymentFailed(
    orderId: string,
    userId: string,
    amount: number,
    paymentMethod: string,
    errorCode: string
  ) {
    await this.logEvent(BACKEND_EVENTS.PAYMENT_FAILED, {
      order_id: orderId,
      user_id: userId,
      amount,
      payment_method: paymentMethod,
      error_code: errorCode,
      currency: "USD",
      timestamp: new Date().toISOString(),
    });
  }

  async logPaymentRefunded(
    orderId: string,
    userId: string,
    amount: number,
    reason: string
  ) {
    await this.logEvent(BACKEND_EVENTS.PAYMENT_REFUNDED, {
      order_id: orderId,
      user_id: userId,
      amount,
      refund_reason: reason,
      currency: "USD",
      timestamp: new Date().toISOString(),
    });
  }

  // Restaurant Analytics
  async logRestaurantCreated(restaurantId: string, restaurantData: any) {
    await this.logEvent(BACKEND_EVENTS.RESTAURANT_CREATED, {
      restaurant_id: restaurantId,
      restaurant_data: restaurantData,
      timestamp: new Date().toISOString(),
    });
  }

  async logRestaurantUpdated(restaurantId: string, changes: any) {
    await this.logEvent(BACKEND_EVENTS.RESTAURANT_UPDATED, {
      restaurant_id: restaurantId,
      changes,
      timestamp: new Date().toISOString(),
    });
  }

  async logMenuCreated(menuId: string, restaurantId: string, menuData: any) {
    await this.logEvent(BACKEND_EVENTS.MENU_CREATED, {
      menu_id: menuId,
      restaurant_id: restaurantId,
      menu_data: menuData,
      timestamp: new Date().toISOString(),
    });
  }

  async logMenuUpdated(menuId: string, restaurantId: string, changes: any) {
    await this.logEvent(BACKEND_EVENTS.MENU_UPDATED, {
      menu_id: menuId,
      restaurant_id: restaurantId,
      changes,
      timestamp: new Date().toISOString(),
    });
  }

  // Item Analytics
  async logItemCreated(itemId: string, restaurantId: string, itemData: any) {
    await this.logEvent(BACKEND_EVENTS.ITEM_CREATED, {
      item_id: itemId,
      restaurant_id: restaurantId,
      item_data: itemData,
      timestamp: new Date().toISOString(),
    });
  }

  async logItemUpdated(itemId: string, restaurantId: string, changes: any) {
    await this.logEvent(BACKEND_EVENTS.ITEM_UPDATED, {
      item_id: itemId,
      restaurant_id: restaurantId,
      changes,
      timestamp: new Date().toISOString(),
    });
  }

  async logItemDeleted(itemId: string, restaurantId: string) {
    await this.logEvent(BACKEND_EVENTS.ITEM_DELETED, {
      item_id: itemId,
      restaurant_id: restaurantId,
      timestamp: new Date().toISOString(),
    });
  }

  // API Analytics
  async logApiRequest(
    endpoint: string,
    method: string,
    userId?: string,
    responseTime?: number
  ) {
    await this.logEvent(BACKEND_EVENTS.API_REQUEST, {
      endpoint,
      method,
      user_id: userId,
      response_time_ms: responseTime,
      timestamp: new Date().toISOString(),
    });
  }

  async logApiError(
    endpoint: string,
    method: string,
    statusCode: number,
    errorMessage: string,
    userId?: string
  ) {
    await this.logEvent(BACKEND_EVENTS.API_ERROR, {
      endpoint,
      method,
      status_code: statusCode,
      error_message: errorMessage,
      user_id: userId,
      timestamp: new Date().toISOString(),
    });
  }

  async logApiRateLimit(endpoint: string, userId?: string, ipAddress?: string) {
    await this.logEvent(BACKEND_EVENTS.API_RATE_LIMIT, {
      endpoint,
      user_id: userId,
      ip_address: ipAddress,
      timestamp: new Date().toISOString(),
    });
  }

  // System Analytics
  async logSystemError(
    errorType: string,
    errorMessage: string,
    stackTrace?: string
  ) {
    await this.logEvent(BACKEND_EVENTS.SYSTEM_ERROR, {
      error_type: errorType,
      error_message: errorMessage,
      stack_trace: stackTrace,
      timestamp: new Date().toISOString(),
    });
  }

  async logDatabaseError(
    operation: string,
    errorMessage: string,
    collection?: string
  ) {
    await this.logEvent(BACKEND_EVENTS.DATABASE_ERROR, {
      operation,
      error_message: errorMessage,
      collection,
      timestamp: new Date().toISOString(),
    });
  }

  async logExternalApiError(
    service: string,
    endpoint: string,
    errorMessage: string
  ) {
    await this.logEvent(BACKEND_EVENTS.EXTERNAL_API_ERROR, {
      service,
      endpoint,
      error_message: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }

  // Business Analytics
  async logRevenueGenerated(amount: number, source: string, orderId?: string) {
    await this.logEvent(BACKEND_EVENTS.REVENUE_GENERATED, {
      amount,
      source,
      order_id: orderId,
      currency: "USD",
      timestamp: new Date().toISOString(),
    });
  }

  async logCustomerAcquired(userId: string, acquisitionMethod: string) {
    await this.logEvent(BACKEND_EVENTS.CUSTOMER_ACQUIRED, {
      user_id: userId,
      acquisition_method: acquisitionMethod,
      timestamp: new Date().toISOString(),
    });
  }

  async logRestaurantOnboarded(restaurantId: string, onboardingMethod: string) {
    await this.logEvent(BACKEND_EVENTS.RESTAURANT_ONBOARDED, {
      restaurant_id: restaurantId,
      onboarding_method: onboardingMethod,
      timestamp: new Date().toISOString(),
    });
  }
}

// Export singleton instance
export const backendAnalytics = BackendAnalytics.getInstance();

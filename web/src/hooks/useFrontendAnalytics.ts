import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { frontendAnalytics } from '../lib/firebaseAnalytics';

export const useFrontendAnalytics = () => {
  const router = useRouter();

  // Track page views
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const pageName = url.split('/').pop() || 'home';
      const pagePath = url;
      
      frontendAnalytics.setScreen(pageName);
      frontendAnalytics.logPageView(pageName, pagePath);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  // Return analytics methods
  return {
    // Page tracking
    logPageView: frontendAnalytics.logPageView.bind(frontendAnalytics),
    
    // User interactions
    logButtonClick: frontendAnalytics.logButtonClick.bind(frontendAnalytics),
    logFormSubmit: frontendAnalytics.logFormSubmit.bind(frontendAnalytics),
    logSearchPerformed: frontendAnalytics.logSearchPerformed.bind(frontendAnalytics),
    
    // Restaurant tracking
    logRestaurantView: frontendAnalytics.logRestaurantView.bind(frontendAnalytics),
    logRestaurantSelect: frontendAnalytics.logRestaurantSelect.bind(frontendAnalytics),
    logMenuView: frontendAnalytics.logMenuView.bind(frontendAnalytics),
    
    // Item tracking
    logItemView: frontendAnalytics.logItemView.bind(frontendAnalytics),
    logItemAddToCart: frontendAnalytics.logItemAddToCart.bind(frontendAnalytics),
    logItemRemoveFromCart: frontendAnalytics.logItemRemoveFromCart.bind(frontendAnalytics),
    logItemCustomize: frontendAnalytics.logItemCustomize.bind(frontendAnalytics),
    
    // Cart tracking
    logCartView: frontendAnalytics.logCartView.bind(frontendAnalytics),
    logCartUpdate: frontendAnalytics.logCartUpdate.bind(frontendAnalytics),
    logCartClear: frontendAnalytics.logCartClear.bind(frontendAnalytics),
    
    // Checkout tracking
    logCheckoutStart: frontendAnalytics.logCheckoutStart.bind(frontendAnalytics),
    logCheckoutStep: frontendAnalytics.logCheckoutStep.bind(frontendAnalytics),
    logPaymentMethodSelect: frontendAnalytics.logPaymentMethodSelect.bind(frontendAnalytics),
    
    // User account tracking
    logProfileView: frontendAnalytics.logProfileView.bind(frontendAnalytics),
    logAddressAdd: frontendAnalytics.logAddressAdd.bind(frontendAnalytics),
    logAddressEdit: frontendAnalytics.logAddressEdit.bind(frontendAnalytics),
    
    // Error tracking
    logError: frontendAnalytics.logError.bind(frontendAnalytics),
    logApiError: frontendAnalytics.logApiError.bind(frontendAnalytics),
    
    // Performance tracking
    logLoadTime: frontendAnalytics.logLoadTime.bind(frontendAnalytics),
    logInteractionTime: frontendAnalytics.logInteractionTime.bind(frontendAnalytics),
    
    // Utility methods
    setUserId: frontendAnalytics.setUserId.bind(frontendAnalytics),
    setUserProperties: frontendAnalytics.setUserProperties.bind(frontendAnalytics),
    setScreen: frontendAnalytics.setScreen.bind(frontendAnalytics),
    logEvent: frontendAnalytics.logEvent.bind(frontendAnalytics),
  };
};

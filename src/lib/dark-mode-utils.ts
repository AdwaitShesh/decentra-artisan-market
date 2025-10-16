/**
 * Dark Mode Utilities
 * Helpful functions for working with dark mode in your application
 */

/**
 * Determines if the user's system prefers dark mode
 * @returns {boolean} true if system prefers dark mode
 */
export const systemPrefersDark = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Returns appropriate classes based on dark mode state
 * @param {string} lightClasses - Classes to apply in light mode
 * @param {string} darkClasses - Classes to apply in dark mode
 * @returns {string} Combined classes for current theme
 */
export const themeClasses = (lightClasses: string, darkClasses: string): string => {
  return `${lightClasses} dark:${darkClasses}`;
};

/**
 * Applies color adjustments to improve contrast in dark mode for various elements
 * @param element The DOM element to adjust
 * @param isDarkMode Boolean indicating if dark mode is active
 */
export const applyDarkModeAdjustments = (element: HTMLElement, isDarkMode: boolean): void => {
  if (isDarkMode) {
    // Adjust images for better contrast in dark mode
    const images = element.querySelectorAll('img:not([data-no-dark-adjust])');
    images.forEach(img => {
      (img as HTMLElement).style.filter = 'brightness(0.9) contrast(1.1)';
    });
    
    // Adjust videos for better contrast in dark mode
    const videos = element.querySelectorAll('video:not([data-no-dark-adjust])');
    videos.forEach(video => {
      (video as HTMLElement).style.filter = 'brightness(0.9) contrast(1.1)';
    });
  } else {
    // Reset adjustments when switching back to light mode
    const adjustedElements = element.querySelectorAll('img:not([data-no-dark-adjust]), video:not([data-no-dark-adjust])');
    adjustedElements.forEach(el => {
      (el as HTMLElement).style.filter = '';
    });
  }
};

/**
 * Creates a color with appropriate contrast for dark/light modes
 * @param lightHex The hex color for light mode
 * @param darkHex The hex color for dark mode
 * @returns CSS variable value that changes with theme
 */
export const themeAwareColor = (lightHex: string, darkHex: string): string => {
  return `rgb(var(--theme-${lightHex.replace('#', '')}-${darkHex.replace('#', '')}))`;
}; 
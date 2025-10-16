// Complete image fix - paste this in browser console
console.log('🔧 Applying complete image fix...');

// 1. Clear all cache
localStorage.clear();
console.log('✅ Cleared all localStorage');

// 2. Force refresh NFT data
if (window.location.pathname.includes('marketplace')) {
    // If on marketplace, reload immediately
    window.location.reload();
} else {
    // Navigate to marketplace
    window.location.href = '/marketplace';
}

console.log('🔄 Refreshing marketplace...');

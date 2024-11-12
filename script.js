function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    navigator.clipboard.writeText(element.value)
        .then(() => {
            // Find the button that was clicked
            const button = document.querySelector(`button[onclick="copyToClipboard('${elementId}')"]`);
            const originalContent = button.innerHTML;
            
            // Change button text to show feedback
            button.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Copied!
            `;
            
            // Reset button after 2 seconds
            setTimeout(() => {
                button.innerHTML = originalContent;
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu-items');
    mobileMenu.classList.toggle('hidden');
}

// Optional: Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobile-menu-items');
    const mobileMenuButton = document.querySelector('button[onclick="toggleMobileMenu()"]');
    
    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Facility interaction handling
document.addEventListener('DOMContentLoaded', () => {
    const facilityItems = document.querySelectorAll('.facility-item');
    let activeDetail = null;

    facilityItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const facilityId = item.dataset.facility;
            const detailElement = document.getElementById(`${facilityId}-details`);

            // If there's an active detail and it's different from the clicked one, hide it
            if (activeDetail && activeDetail !== detailElement) {
                activeDetail.classList.add('hidden');
                activeDetail.classList.remove('active');
            }

            // Toggle the clicked detail
            if (detailElement.classList.contains('hidden')) {
                // Show the detail
                detailElement.classList.remove('hidden');
                // Use setTimeout to ensure the transition happens
                setTimeout(() => {
                    detailElement.classList.add('active');
                }, 10);
                activeDetail = detailElement;
            } else {
                // Hide the detail
                detailElement.classList.remove('active');
                setTimeout(() => {
                    detailElement.classList.add('hidden');
                }, 300);
                activeDetail = null;
            }
        });
    });

    // Close active detail when clicking outside
    document.addEventListener('click', () => {
        if (activeDetail) {
            activeDetail.classList.remove('active');
            setTimeout(() => {
                activeDetail.classList.add('hidden');
            }, 300);
            activeDetail = null;
        }
    });

    // Prevent clicks within the detail panel from closing it
    document.querySelectorAll('.facility-details').forEach(detail => {
        detail.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}); 
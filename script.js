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
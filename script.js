(function() {
    console.log('Starting job remover...');
    
    function findAndClickRemoveButtons() {
        const removeButtons = document.querySelectorAll('button[aria-label="Remove from search results"]');
        
        console.log(`Found ${removeButtons.length} remove buttons`);
        
        if (removeButtons.length === 0) {
            console.log('No more remove buttons found. Process complete!');
            return false;
        }
        
        removeButtons.forEach((button, index) => {
            setTimeout(() => {
                try {
                    button.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    button.click();
                    console.log(`Clicked remove button ${index + 1}/${removeButtons.length}`);
                    
                    setTimeout(() => {
                        const confirmButtons = document.querySelectorAll('button');
                        for (const btn of confirmButtons) {
                            const text = btn.textContent.toLowerCase().trim();
                            if (text.includes('yes') || text.includes('ok') ||
                                text.includes('confirm') || text.includes('remove')) {
                                if (btn.offsetParent !== null) {
                                    btn.click();
                                    console.log('Confirmed removal');
                                    break;
                                }
                            }
                        }
                    }, 200);
                    
                } catch (error) {
                    console.log(`Error clicking button ${index + 1}: ${error.message}`);
                }
            }, index * 300);
        });
        
        return true;
    }
    
    function runRemovalCycle() {
        console.log('Running removal cycle...');
        
        const foundButtons = findAndClickRemoveButtons();
        
        if (foundButtons) {
            setTimeout(() => {
                console.log('Waiting for page updates...');
                setTimeout(runRemovalCycle, 2000);
            }, 2000);
        }
    }
    
    const originalConfirm = window.confirm;
    window.confirm = () => true;
    
    console.log('Starting in 2 seconds...');
    setTimeout(runRemovalCycle, 2000);
    
    setTimeout(() => {
        window.confirm = originalConfirm;
    }, 600000);
    
})();
(function() {
    let isScriptComplete = false;
    
    function findAndClickRemoveButtons() {
        if (isScriptComplete) return false;
        
        const removeButtons = document.querySelectorAll('button[aria-label="Remove from search results"]');
        
        if (removeButtons.length === 0) {
            isScriptComplete = true;
            alert('Job removal complete! Script has stopped.');
            return false;
        }
        
        removeButtons.forEach((button, index) => {
            if (isScriptComplete) return;
            
            setTimeout(() => {
                if (isScriptComplete) return;
                
                try {
                    button.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    button.click();
                    
                    setTimeout(() => {
                        if (isScriptComplete) return;
                        
                        const confirmButtons = document.querySelectorAll('button');
                        for (const btn of confirmButtons) {
                            const text = btn.textContent.toLowerCase().trim();
                            if (text.includes('remove from search')) {
                                if (btn.offsetParent !== null) {
                                    btn.click();
                                    break;
                                }
                            }
                        }
                    }, 200);
                    
                } catch (error) {
                    // Silent error handling
                }
            }, index * 300);
        });
        
        return true;
    }
    
    function runRemovalCycle() {
        if (isScriptComplete) return;
        
        const foundButtons = findAndClickRemoveButtons();
        
        if (foundButtons && !isScriptComplete) {
            setTimeout(() => {
                if (!isScriptComplete) {
                    setTimeout(runRemovalCycle, 2000);
                }
            }, 2000);
        }
    }
    
    const originalConfirm = window.confirm;
    window.confirm = () => isScriptComplete ? false : true;
    
    setTimeout(runRemovalCycle, 2000);
    
    setTimeout(() => {
        window.confirm = originalConfirm;
    }, 600000);
    
})();

async function copyToClipboard(event, text) {
    try {
        await navigator.clipboard.writeText(text);

        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = 'var(--primary-color)';
        btn.style.color = 'white';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'transparent';
            btn.style.color = 'var(--primary-color)';
        }, 1500);
    } catch (err) {
        console.error('Failed to copy text: ', err);
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

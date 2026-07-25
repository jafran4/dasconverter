export const copyPromptToClipboard = async (prompt: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(prompt);
    } else {
      // Fallback for non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = prompt;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    
    // Dispatch custom event so CopiedPromptModal triggers globally
    window.dispatchEvent(new CustomEvent('prompt-copied', { detail: { prompt } }));
    return true;
  } catch (err) {
    console.error('Failed to copy prompt to clipboard:', err);
    return false;
  }
};

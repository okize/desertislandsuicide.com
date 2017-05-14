// various helper functions
export function getCsrfToken() {
  return document.getElementById('csrf-token').getAttribute('content');
}

export default getCsrfToken;

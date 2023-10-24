export function isAccessTokenAlive(token) {
    const payload = getPayloadFromToken(token)
    if (!payload || typeof payload.exp !== 'number') {
      return true;
    }
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    if (payload.exp < currentTimeInSeconds) {
      return false;
    }
    return true;
  }

  function getPayloadFromToken(token) {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return null;
    }
  
    const encodedPayload = tokenParts[1];
    const decodedPayload = atob(encodedPayload);
  
    try {
      const payload = JSON.parse(decodedPayload);
      return payload;
    } catch (error) {
      console.error('Lỗi khi giải mã và lấy payload: ', error);
      return null;
    }
  }
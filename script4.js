// Add this to the SocialMediaLinker class
validateUrl(url); {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
}

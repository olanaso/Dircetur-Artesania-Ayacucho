export const googleTranslateElementInit = () => {
  new google.translate.TranslateElement(
    {
      pageLanguage: "es",
      includedLanguages: "es,en,fr,de,it,pt,ja,ko,zh-CN",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
      getTrack: false,
    },
    "google_translate_element"
  );
};

export const googleTranslateElementInit = () => {

  if (navigator.onLine) {
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
  } else {
    document.getElementById("google_translate_element").innerText =
      "La función de traducción no está disponible sin conexión a Internet.";
  }



};

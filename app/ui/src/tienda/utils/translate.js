export const googleTranslateElementInit = async () => {
  await waitForGoogleTranslateElementInit();
  const anchor = await waitForAnchor();

  if (anchor) {
    anchor.addEventListener("click", function (event) {
      event.preventDefault();
    });

    anchor.href = "";
  }
};

const waitForGoogleTranslateElementInit = () => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      let translate = null;

      try {
        translate = new google.translate.TranslateElement(
          {
            pageLanguage: "es",
            includedLanguages: "es,en,fr,de,it,pt,ja,ko,zh-CN",
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            getTrack: false,
          },
          "google_translate_element"
        );
      } catch (error) {
        console.error(error);
      }

      if (translate) {
        clearInterval(interval);
        resolve(translate);
      }
    }, 30);
  });
};

const waitForAnchor = () => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      let anchor = null;
      try {
        anchor = document.querySelector(
          "#google_translate_element .VIpgJd-ZVi9od-xl07Ob-lTBxed"
        );
      } catch (error) {
        console.error(error);
      }

      if (anchor) {
        clearInterval(interval);
        resolve(anchor);
      }
    }, 100);
  });
};

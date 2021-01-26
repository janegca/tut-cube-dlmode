document.documentElement.classList.remove("no-js");

const STORAGE_KEY = "user-color-scheme"; // user preference, keep i local storage
const COLOR_MODE_KEY = "--color-mode";

const modeToggleButton = document.querySelector(".js-mode-toggle");
const modeToggleText = document.querySelector(".js-mode-toggle-text");
const modeStatusElement = document.querySelector(".js-mode-status");

// return the value of the given property
const getCSSCustomProp = (propKey) => {
  let response = getComputedStyle(document.documentElement).getPropertyValue(
    propKey
  );

  if (response.length) {
    response = response.replace(/\"/g, "").trim();
  }

  return response;
};

// load and apply the given scheme
const applySetting = (passedSetting) => {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

  if (currentSetting) {
    document.documentElement.setAttribute(
      "data-user-color-scheme",
      currentSetting
    );
    setButtonLabelAndStatus(currentSetting);
  } else {
    setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));
  }
};

// update the toggle button label
const setButtonLabelAndStatus = (currentSetting) => {
  modeToggleText.innerText = `Enable ${
    currentSetting === "dark" ? "light" : "dark"
  } mode`;
  modeStatusElement.innerText = `Color mode is now "${currentSetting}"`;
};

// toggle the mode
const toggleSetting = () => {
  let currentSetting = localStorage.getItem(STORAGE_KEY);

  switch (currentSetting) {
    case null:
      currentSetting =
        getCSSCustomProp(COLOR_MODE_KEY) === "dark" ? "light" : "dark";
      break;
    case "light":
      currentSetting = "dark";
      break;
    case "dark":
      currentSetting = "light";
      break;
  }

  localStorage.setItem(STORAGE_KEY, currentSetting);

  return currentSetting;
};

// add a listener and apply the default mode
modeToggleButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  applySetting(toggleSetting());
});

// runs by default to load user preference if available
applySetting();

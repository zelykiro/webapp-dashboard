let count = 0;
const settings = document.querySelector(".settings");
const bell = document.querySelector(".svg-container");
const alertMessage = document.querySelector(".alert");
const unreadNotifs = document.querySelector(".new-notifications");
const notifications = document.querySelector(".header__notifications");
const checkBoxes = document.querySelectorAll(`[type="checkbox"]`);
const profileVis = document.querySelector(`input[name="profile-visibility"]`);
const emailNotif = document.querySelector(`input[name="email-notification"]`);
const noNotifs = document.querySelector(
	".header__notifications li:first-child"
);

function loadSavedSettings() {
	const savedSettings = checkSavedSettings();
	if (savedSettings.length) {
		emailNotif.checked = savedSettings[0]["emailNotification"];
		profileVis.checked = savedSettings[0]["profileVisibility"];
		if (savedSettings[0]["timezone"])
			document
				.querySelector(`[value="${savedSettings[0]["timezone"]}"]`)
				.setAttribute("selected", true);
	}
	checkedLabel();
}

function checkSavedSettings() {
	if (localStorage.getItem("settings")) {
		const array = JSON.parse(localStorage.getItem("settings"));
		return array;
	} else {
		return [{}];
	}
}

function checkedLabel() {
	for (let box of checkBoxes) {
		if (box.checked) {
			box.nextElementSibling.textContent = "ON";
		} else box.nextElementSibling.textContent = "OFF";
	}
}

function hyphenToCamel(name) {
	const indexOfHyphen = name.indexOf("-");
	const nameOne = name.replace("-", "");
	const nameTwo = nameOne.replace(
		nameOne.charAt(indexOfHyphen),
		nameOne.charAt(indexOfHyphen).toUpperCase()
	);

	return nameTwo;
}

bell.addEventListener("click", () => {
	count++;
	if (count % 2) {
		notifications.style.animation = "fade-in 1s ease-out forwards";
		notifications.classList.toggle("display");
	} else {
		notifications.style.animation = "fade-out 1s ease-out forwards";
		setTimeout(() => {
			notifications.classList.toggle("display");
		}, 1000);
	}
});

alertMessage.addEventListener("click", (event) => {
	const element = event.target;
	if (element.className.includes("close-alert")) {
		element.parentNode.style.animation = "fade-out 0.5s ease-out forwards";
		setTimeout(() => {
			element.parentNode.style.display = "none";
		}, 500);
	}
});

notifications.addEventListener("click", (event) => {
	const element = event.target;
	if (element.className.includes("close-notification")) {
		element.parentNode.remove();
		if (notifications.children.length === 1) {
			unreadNotifs.classList.remove("display");
			alertMessage.style.display = "none";
			noNotifs.style.display = "flex";
		}
	}
});

settings.addEventListener("click", (event) => {
	const element = event.target;
	const savedSettings = checkSavedSettings();
	if (element.tagName === "INPUT") {
		checkedLabel();
		const checked = element.checked;
		const obj = hyphenToCamel(element.name);
		savedSettings[0][obj] = checked;
	}
	if (element.tagName === "SELECT") {
		const val = element.value;
		savedSettings[0]["timezone"] = val;
	}
	localStorage.setItem("settings", JSON.stringify(savedSettings));

	if (element.className.includes("cancelbtn")) {
		localStorage.removeItem("settings");
		profileVis.checked = false;
		emailNotif.checked = false;
		checkedLabel();
		document.querySelector("select").selectedIndex = 0;
	}
});

loadSavedSettings();

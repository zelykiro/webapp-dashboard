let count = 0;
const form = document.querySelector("form");
const formBtn = form.querySelector("button");
const settings = document.querySelector(".settings");
const bell = document.querySelector(".svg-container");
const alertMessage = document.querySelector(".alert");
const webGraphButtons = document.querySelector(".graph__web ul");
const checkBoxes = document.querySelectorAll(`[type="checkbox"]`);
const notifications = document.querySelector(".header__notifications");
const unreadNotifications = document.querySelector(".new-notifications");
const profileVis = document.querySelector(`input[name="profile-visibility"]`);
const emailNotif = document.querySelector(`input[name="email-notification"]`);
const noNotifications = document.querySelector(
	".header__notifications li:first-child"
);

const users = ["Victoria Chambers", "Dale Byrd", "Dawn Wood", "Dan Oliver"];

function loadSavedSettings() {
	const savedSettings = checkSavedSettings();
	if (savedSettings.length) {
		emailNotif.checked = savedSettings[0]["emailNotification"];
		profileVis.checked = savedSettings[0]["profileVisibility"];
		if (savedSettings[0]["timezone"]) {
			document
				.querySelector(`[value="${savedSettings[0]["timezone"]}"]`)
				.setAttribute("selected", true);
		}
	}
	checkBoxLabel();
}

function checkSavedSettings() {
	if (localStorage.getItem("settings")) {
		const array = JSON.parse(localStorage.getItem("settings"));
		return array;
	} else {
		return [{}];
	}
}

function checkBoxLabel() {
	for (let box of checkBoxes) {
		if (box.checked) {
			box.nextElementSibling.textContent = "ON";
		} else box.nextElementSibling.textContent = "OFF";
	}
}

function newNotifications() {
	window.setTimeout(() => {
		renderNotification("You have unread messages");
		renderNotification("You have 1 new follower");
		renderNotification("Password expires in 4 days");
		alertMessage.style.display = "flex";
		alertMessage.style.animation = "fade-in 0.5s ease-out forwards";
		unreadNotifications.classList.add("display");
	}, 2000);
}

function renderNotification(text) {
	noNotifications.style.display = "none";
	const li = document.createElement("li");
	li.innerHTML = `<span class="notification-text">${text}</span
	><span class="close-notification"></span>`;
	notifications.append(li);
}

function submitForm(event) {
	event.preventDefault();
	const span = form.querySelector("span");
	span.removeAttribute("class");
	const userName = document.getElementById("username").value;
	const userMessage = document.getElementById("message").value;
	if (users.includes(userName) && userMessage.trim()) {
		span.classList.add("success");
		span.textContent = "Message Successfully Sent!";
		document.getElementById("username").value = "";
		document.getElementById("message").value = "";
	} else {
		span.classList.add("error");
		if (!userName) {
			span.textContent = "Please Enter The Username";
		} else if (!users.includes(userName)) {
			span.textContent = "User Not Found";
			document.getElementById("username").value = "";
		} else span.textContent = "Please Enter The Message";
	}
	span.parentNode.style.transform = "translateY(0%)";
	setTimeout(() => {
		span.parentNode.removeAttribute("style");
	}, 2000);
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
		alertMessage.style.animation = "fade-out 0.5s ease-out forwards";
		setTimeout(() => {
			alertMessage.style.display = "none";
		}, 500);
	}
});

notifications.addEventListener("click", (event) => {
	const element = event.target;
	if (element.className.includes("close-notification")) {
		element.parentNode.remove();
		if (notifications.children.length === 1) {
			unreadNotifications.classList.remove("display");
			alertMessage.style.animation = "fade-out 0.5s ease-out forwards";
			setTimeout(() => {
				alertMessage.style.display = "none";
			}, 500);
			noNotifications.style.display = "flex";
			setTimeout(() => {
				notifications.style.animation = "fade-out 1s ease-out forwards";
				setTimeout(() => {
					notifications.classList.remove("display");
				}, 1000);
			}, 2000);
			count++;
		}
	}
});

webGraphButtons.addEventListener("click", (event) => {
	const element = event.target;
	if (element.tagName === "LI" && !element.className.includes("active")) {
		document.querySelector(".active").removeAttribute("class");
		element.classList.add("active");
		const obj = `data${element.textContent}`;
		webChart["data"]["labels"] = formats[obj].labels;
		webChart["data"]["datasets"][0]["data"] = formats[obj].data;
		webChart["options"]["scales"]["y"]["max"] = formats[obj].max;
		webChart.update();
	}
});

formBtn.addEventListener("click", (event) => {
	submitForm(event);
});

settings.addEventListener("click", (event) => {
	const element = event.target;
	const savedSettings = checkSavedSettings();
	if (element.tagName === "INPUT") {
		checkBoxLabel();
		const checked = element.checked;
		const obj = hyphenToCamel(element.name);
		savedSettings[0][obj] = checked;
	}
	if (element.tagName === "OPTION") {
		const val = element.value;
		savedSettings[0]["timezone"] = val;
	}
	localStorage.setItem("settings", JSON.stringify(savedSettings));

	if (element.className.includes("cancelbtn")) {
		localStorage.removeItem("settings");
		profileVis.checked = false;
		emailNotif.checked = false;
		checkBoxLabel();
		document.querySelector("select").selectedIndex = 0;
	}
});

loadSavedSettings();
newNotifications();

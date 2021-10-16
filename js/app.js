const bell = document.querySelector(".svg-container");
const notifications = document.querySelector(".header__notifications");
let count = 0;

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
